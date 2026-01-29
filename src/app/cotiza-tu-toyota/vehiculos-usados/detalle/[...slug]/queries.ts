import { getUrl } from "aws-amplify/storage";

const GRAPHQL_API_URL = process.env.NEXT_PUBLIC_GRAPHQL_API_URL!;
const GRAPHQL_API_KEY = process.env.NEXT_PUBLIC_GRAPHQL_API_KEY!;

// ------------------------------------------------------
// 🔍 Read existing presigned asset from DB
// ------------------------------------------------------
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

  const res = await fetch(GRAPHQL_API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": GRAPHQL_API_KEY,
    },
    body: JSON.stringify({ query, variables: { vehicleId } }),
  });

  const { data } = await res.json();
  return data?.listUsedVehiclePresignedAssets?.items?.[0] || null;
}

// ------------------------------------------------------
// 🔍 Check if Presigned URL is expired
// ------------------------------------------------------
export function isPresignedUrlExpired(url: string) {
  if (!url) return true;

  const u = new URL(url);

  const amzDate = u.searchParams.get("X-Amz-Date");
  const expires = Number(u.searchParams.get("X-Amz-Expires"));

  if (!amzDate || !expires) return true;

  const year = amzDate.slice(0, 4);
  const month = amzDate.slice(4, 6);
  const day = amzDate.slice(6, 8);
  const hour = amzDate.slice(9, 11);
  const minute = amzDate.slice(11, 13);
  const second = amzDate.slice(13, 15);

  const startDate = new Date(
    Date.UTC(Number(year), Number(month) - 1, Number(day), Number(hour), Number(minute), Number(second))
  );

  const expiryDate = new Date(startDate.getTime() + expires * 1000);

  return new Date() > expiryDate;
}

// ------------------------------------------------------
// 💾 Save/Create Asset in DB
// ------------------------------------------------------
async function savePresignedAsset(vehicleId: string, images: any[], existingId?: string) {
  const mutation = existingId
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
    id: existingId || undefined,
    vehicleId,
    UsedVehiclePresignedImages: JSON.stringify(images),
    UsedVehiclePresignedImagesName: `asset-${vehicleId}`,
  };

  await fetch(GRAPHQL_API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": GRAPHQL_API_KEY,
    },
    body: JSON.stringify({ query: mutation, variables: { input } }),
  });
}

// ------------------------------------------------------
// 🔥 MAIN LOGIC FOR EACH VEHICLE
// ------------------------------------------------------
export async function generatePresignedAssetForVehicle(vehicle: any) {
  const vehicleId = vehicle.id;

  // Read existing stored images
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

  const updatedImages: any[] = [];

  for (const img of gallery) {
    const existing = storedImages.find((x: any) => x.key === img.key);

    if (existing && !isPresignedUrlExpired(existing.presignedUrl)) {
      // Reuse existing valid URL
      updatedImages.push(existing);
      continue;
    }

    // ❗ If no existing OR expired → Generate new signed URL
    const { url } = await getUrl({
      path: img.key,
      options: { expiresIn: 604800 }, // 7 days
    });

    updatedImages.push({
      fileName: img.fileName,
      key: img.key,
      type: img.type,
      presignedUrl: url.toString(),
    });
  }

  // Save back to DB
  await savePresignedAsset(vehicleId, updatedImages, existingAsset?.id);

  return updatedImages;
}

// ------------------------------------------------------
// 🚗 FETCH ALL USED VEHICLES + APPLY IMAGE LOGIC
// ------------------------------------------------------
export async function fetchUsedVehicles() {
  const query = `
    query ListUsedVehicles($filter: ModelUsedVehicleFilterInput) {
      listUsedVehicles(filter: $filter) {
        items {
          id
          plate
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
          modelYear
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

  const res = await fetch(GRAPHQL_API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": GRAPHQL_API_KEY,
    },
    body: JSON.stringify({
      query,
      variables: { filter: { isDeleted: { ne: true } } },
    }),
  });

  const { data, errors } = await res.json();
  if (errors) throw new Error(errors[0].message);

  const vehicles = data.listUsedVehicles.items || [];

  // 💥 Apply signed URL logic for ALL vehicles
  return Promise.all(
    vehicles.map(async (vehicle: any) => {
      const presignedImages = await generatePresignedAssetForVehicle(vehicle);

      const main = presignedImages.find((i) => i.type === "main") || presignedImages[0];

      return {
        ...vehicle,
        presignedImages,
        displayImage: main?.presignedUrl || null,
      };
    })
  );
}

export async function fetchUsedVehicleBySlug(slug: string) {
  const query = `
    query GetVehicleBySlug($slug: String!) {
      listUsedVehicles(filter: { slug: { eq: $slug } }) {
        items {
          id
          slug
          plate
          price
          mileage
          certified
          color
          engine
          combustible
          transmission
          toyotaWarranty
          galleryJson
          modelYear
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
            city { 
            name
             id
             externalId
             }
          }
        }
      }
    }
  `;

  const res = await fetch(GRAPHQL_API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": GRAPHQL_API_KEY,
    },
    body: JSON.stringify({ query, variables: { slug } }),
  });

  const { data, errors } = await res.json();
  if (errors) throw new Error(errors[0].message);

  const vehicle = data?.listUsedVehicles?.items?.[0] || null;
  if (!vehicle) return null;

  const presignedImages = await generatePresignedAssetForVehicle(vehicle);

  const main = presignedImages.find(i => i.type === "main") || presignedImages[0];

  return {
    ...vehicle,
    presignedImages,
    displayImage: main?.presignedUrl || null,
  };
}

export async function fetchSimilarUsedVehiclesByCity(cityId: string) {
  console.log(" received cityId", cityId);

  const query = `
    query ListSimilarVehiclesByCity($cityId: ID!) {
      listUsedVehicles(
        filter: {
          isDeleted: { ne: true }
          cityId: { eq: $cityId }
        }
      ) {
        items {
          id
          price
          slug
          mileage
          usedModel { modelName }
          modelVersion { versionName year }
          dealership {
            id
            name
            city { id name }
          }
          galleryJson
          description
        }
      }
    }
  `;

  const response = await fetch(GRAPHQL_API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": GRAPHQL_API_KEY,
    },
    body: JSON.stringify({
      query,
      variables: { cityId },
    }),
  });

  const result = await response.json();
  const vehicles = result.data?.listUsedVehicles?.items || [];

  // 🔥 Apply same presigned URL logic
  return Promise.all(
    vehicles.map(async (vehicle: any) => {
      const presignedImages = await generatePresignedAssetForVehicle(vehicle);

      const main = presignedImages.find(i => i.type === "main") || presignedImages[0];

      return {
        ...vehicle,
        presignedImages,
        displayImage: main?.presignedUrl || null
      };
    })
  );
}

