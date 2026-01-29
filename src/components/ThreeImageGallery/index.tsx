import { View, Image, Grid } from "@aws-amplify/ui-react";
import "./three.css";
interface ImageItem {
  url: string;
  altText: string;
}

interface ThreeImageGalleryProps {
  images: ImageItem[];
}

export function ThreeImageGallery({ images }: ThreeImageGalleryProps) {
  // Ensure we have at least 3 images
  const displayImages = images.slice(0, 3);

  return (
    <View
      padding="10px"
      paddingRight="20px"
      height={"fit-content"}
      overflow={"hidden"}
      className="main-container"
    >
      <Grid
        columnGap={{ base: "10px", xl: "22px" }}
        rowGap={{ base: "10px", xl: "22px" }}
        templateColumns={{ base: "1fr 1fr", xl: "495px 495px 495px" }}
        templateRows={{ base: "1fr 1fr", xl: "auto" }}
        height={{ base: "auto", xl: "auto" }}
        className="main-grid"
      >
        {/* First image - full height */}
        <View className="firstImage" height={{ base: "100%", xl: "290px" }}>
          <Image
            src={displayImages[0].url}
            alt={displayImages[0].altText}
            width="100%"
            height="100%"
            objectFit="cover"
          />
        </View>

        {/* Second and third images - half height each */}
        <View height={{ base: "100%", xl: "290px" }} className="secondImage">
          <Image
            src={displayImages[1].url}
            alt={displayImages[1].altText}
            width="100%"
            height="100%"
            objectFit="cover"
          />
        </View>

        <View height={{ base: "100%", xl: "290px" }} className="thirdImage">
          <Image
            src={displayImages[2].url}
            alt={displayImages[2].altText}
            width="100%"
            height="100%"
            objectFit="cover"
          />
        </View>
      </Grid>
    </View>
  );
}
