/* eslint-disable @typescript-eslint/no-unused-vars */
import { View, Image, useBreakpointValue } from "@aws-amplify/ui-react";

interface ImageItem {
  url: string;
  altText: string;
}

interface ResponsiveImageGalleryProps {
  images: ImageItem[];
  mobileHeight?: string;
  desktopHeight?: string;
  gap?: string;
  padding?: string;
}

export function ResponsiveImageGallery({
  images,
  mobileHeight = "300px",
  desktopHeight = "600px",
  gap = "10px",
  padding = "10px 20px 10px 10px",
}: ResponsiveImageGalleryProps) {
  const isMobile = useBreakpointValue({ base: true, medium: false });

  // Ensure we have at least 3 images
  const displayImages = images.slice(0, 3);

  // Get responsive height
  const responsiveHeight = isMobile ? mobileHeight : desktopHeight;

  // Same layout for both mobile and desktop
  return (
    <View
      padding={padding}
      height={responsiveHeight}
      overflow="hidden"
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
      }}
    >
      <View
        display="flex"
        style={{ flexDirection: "row", gap: "10px" }}
        height="100%"
        maxWidth="700px"
      >
        {/* Left image - full height, 50% width */}
        <View width="65%" height="100%">
          <Image
            src={displayImages[0].url}
            alt={displayImages[0].altText}
            width="100%"
            height="100%"
            objectFit="cover"
          />
        </View>

        {/* Right column with two images */}
        <View
          display="flex"
          style={{ flexDirection: "column", gap: "0px" }}
          height="100%"
          width="35%"
        >
          {/* Top image - 50% height */}
          <View flex="1" height="50%">
            <Image
              src={displayImages[1].url}
              alt={displayImages[1].altText}
              width="100%"
              height="100%"
              objectFit="cover"
            />
          </View>

          {/* Bottom image - 50% height */}
          <View flex="1" height="50%">
            <Image
              src={displayImages[2].url}
              alt={displayImages[2].altText}
              width="100%"
              height="100%"
              objectFit="cover"
            />
          </View>
        </View>
      </View>
    </View>
  );
}
