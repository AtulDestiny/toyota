import { getUrl } from "aws-amplify/storage";
const GRAPHQL_API_URL = process.env.NEXT_PUBLIC_GRAPHQL_API_URL;
const GRAPHQL_API_KEY = process.env.NEXT_PUBLIC_GRAPHQL_API_KEY;
// ---------------------------
//  Fetch All Non-Deleted Used Vehicles
// ---------------------------
// ---------------------------------------------
//  Check if a presigned S3 URL is expired
// ---------------------------------------------

async function getExistingAsset(vehicleId: string) {
  const query = `
    query GetAsset($vehicleId: ID!) {
      listUsedVehiclePresignedAssets(filter: { vehicleId: { eq: $vehicleId } }) {
        items {
          id
          UsedVehiclePresignedImages
        }
      }
    }
  `;

  const res = await fetch(GRAPHQL_API_URL!, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": GRAPHQL_API_KEY!,
    },
    body: JSON.stringify({ query, variables: { vehicleId } }),
  });

  const { data } = await res.json();
  return data?.listUsedVehiclePresignedAssets?.items?.[0] || null;
}

export function isPresignedUrlExpired(url: any) {
  const u = new URL(url);

  const amzDate = u.searchParams.get("X-Amz-Date");   // e.g. 20251125T113259Z
  const expires = Number(u.searchParams.get("X-Amz-Expires"));

  if (!amzDate || !expires) return true; // invalid url

  const year = amzDate.slice(0, 4);
  const month = amzDate.slice(4, 6);
  const day = amzDate.slice(6, 8);
  const hour = amzDate.slice(9, 11);
  const minute = amzDate.slice(11, 13);
  const second = amzDate.slice(13, 15);

  const startDate = new Date(
    Date.UTC(
      Number(year),
      Number(month) - 1,
      Number(day),
      Number(hour),
      Number(minute),
      Number(second)
    )
  );
  const expiryDate = new Date(startDate.getTime() + expires * 1000);

  return new Date() > expiryDate;
}


async function savePresignedAsset(vehicleId: string, images: any[], existingAssetId?: string) {
  const mutation = existingAssetId
    ? `
      mutation UpdateAsset($input: UpdateUsedVehiclePresignedAssetInput!) {
        updateUsedVehiclePresignedAsset(input: $input) { id }
      }
    `
    : `
      mutation CreateAsset($input: CreateUsedVehiclePresignedAssetInput!) {
        createUsedVehiclePresignedAsset(input: $input) { id }
      }
    `;

  const input = {
    id: existingAssetId || undefined,
    vehicleId,
    UsedVehiclePresignedImages: JSON.stringify(images),
    UsedVehiclePresignedImagesName: `asset-${vehicleId}`,
  };

  const res = await fetch(GRAPHQL_API_URL!, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": GRAPHQL_API_KEY!,
    },
    body: JSON.stringify({ query: mutation, variables: { input } }),
  });

  return res.json();
}


export async function validateUsedVehicleImages(UsedVehiclePresignedImages: any) {
  const updatedImages = [];

  for (const img of UsedVehiclePresignedImages) {
    const expired = await isPresignedUrlExpired(img.presignedUrl);

    updatedImages.push({
      ...img,
      expired,
    });
  }

  return updatedImages;
}
// -------------------------------------------------------
//  Generate presigned URLs **for only one specific vehicle**
// -------------------------------------------------------
export async function generatePresignedAssetForVehicle(vehicle: any) {
  const vehicleId = vehicle.id;

  // 1. Read current asset in DB
  const existingAsset = await getExistingAsset(vehicleId);

  let storedImages = [];
  if (existingAsset?.UsedVehiclePresignedImages) {
    try {
      storedImages = JSON.parse(existingAsset.UsedVehiclePresignedImages);
    } catch {
      storedImages = [];
    }
  }

  // Parse gallery JSON
  const gallery = Array.isArray(vehicle.galleryJson)
    ? vehicle.galleryJson
    : JSON.parse(vehicle.galleryJson || "[]");

  const updatedImages = [];

  for (const img of gallery) {
    const existing = storedImages.find((x: any) => x.key === img.key);

    if (existing) {
      const expired = isPresignedUrlExpired(existing.presignedUrl);

      if (!expired) {
        updatedImages.push(existing);
        continue;
      }
    }

    // Generate new signed URL
    const { url } = await getUrl({
      path: img.key,
      options: { expiresIn: 604800 },
    });

    updatedImages.push({
      fileName: img.fileName,
      key: img.key,
      type: img.type,
      presignedUrl: url.toString(),
    });
  }


  // Save (create or update)
  await savePresignedAsset(
    vehicleId,
    updatedImages,
    existingAsset?.id
  );

  return updatedImages;
}

/* -------------------------------------------------------------------------- */
/*  MEMORY CACHE */
/* -------------------------------------------------------------------------- */
const usedVehicleCache: any[] = [];
let usedVehiclesLoaded = false;

async function fetchUsedVehiclesFromAPI() {
  const query = `
    query ListUsedVehicles($filter: ModelUsedVehicleFilterInput) {
      listUsedVehicles(filter: $filter) {
        items {
          id
          plate
          slug
          price
          mileage
          certified
          color
          engine
          combustible
          transmission
          toyotaWarranty
          galleryJson
          description
          additionalInfo
          isDeleted
          advisorName
          advisorIdCard
          advisorPhone
          usedModel { id modelName }
          modelVersion { id versionName year }
          dealership {
            id
            name
            idVitrina
            city { name id }
          }
        }
      }
    }
  `;

  const variables = { filter: { isDeleted: { ne: true } } };

  const res = await fetch(GRAPHQL_API_URL!, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": GRAPHQL_API_KEY!,
    },
    body: JSON.stringify({ query, variables }),
    next: { revalidate: 3600 },
  });

  const { data } = await res.json();
  return data?.listUsedVehicles?.items || [];
}


async function getMainPresignedUrl(vehicle: any) {
  const gallery = Array.isArray(vehicle.galleryJson)
    ? vehicle.galleryJson
    : JSON.parse(vehicle.galleryJson || "[]");

  if (gallery.length === 0) return null;
  const main = gallery.find((i: any) => i.type === "main") || gallery[0];


  const { url } = await getUrl({
    path: main.key,
    options: { expiresIn: 86400 }, // 24 hours = fast + efficient
  });

  return url.toString();
}

async function backgroundPresignedRefresh(vehicles: any[]) {
  try {
    const updates = await Promise.all(
      vehicles.map(async (vehicle) => {
        const presigned = await generatePresignedAssetForVehicle(vehicle);
        const main = presigned.find((i) => i.type === "main") || presigned[0];

        return {
          ...vehicle,
          presignedImages: presigned,
          displayImage: main?.presignedUrl || null,
        };
      })
    );

    usedVehicleCache.splice(0, usedVehicleCache.length, ...updates);
    usedVehiclesLoaded = true;

  } catch (err) {
    console.error(" Background Presigned Refresh Error:", err);
  }
}

async function backgroundMainImageRefresh(vehicles: any[]) {
  try {
    const updates = await Promise.all(
      vehicles.map(async (vehicle) => {
        let mainUrl = null;

        const gallery = JSON.parse(vehicle.galleryJson || "[]");
        const main = gallery.find((i: any) => i.type === "main") || gallery[0];


        if (main) {
          const { url } = await getUrl({
            path: main.key,
            options: { expiresIn: 86400 }
          });
          mainUrl = url.toString();
        }
        return {
          ...vehicle,
          displayImage: mainUrl,
          loadingImages: false,
          cacheVersion: Date.now()   //  Forces UI refresh
        };

      })
    );

    usedVehicleCache.splice(0, usedVehicleCache.length, ...updates);

  } catch (error) {
    console.error("Background error:", error);
  }
}


export async function fetchUsedVehicles() {

  if (usedVehicleCache.length > 0) {
    return usedVehicleCache;
  }

  const list = await fetchUsedVehiclesFromAPI();

  // MAIN IMAGES LOADED IMMEDIATELY
  const instantVehicles = await Promise.all(
    list.map(async (v: any) => {
      const gallery = JSON.parse(v.galleryJson || "[]");
      const main = gallery.find((i: any) => i.type === "main") || gallery[0];

      let mainUrl = "/placeholder-car.png";

      if (main) {
        const { url } = await getUrl({
          path: main.key,
          options: { expiresIn: 86400 }
        });
        mainUrl = url.toString();
      }

      return {
        ...v,
        displayImage: mainUrl,
        loadingImages: false,
        presignedImages: []
      };
    })
  );

  usedVehicleCache.push(...instantVehicles);

  // Background gallery refresh (DO NOT BLOCK)
  backgroundPresignedRefresh(list);

  return usedVehicleCache;
}

