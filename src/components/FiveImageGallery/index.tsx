import { View, Grid, Image, Text } from "@aws-amplify/ui-react";
import "./five.css";

interface ImageItem {
  url: string;
  altText: string;
}

interface FiveImageGalleryProps {
  title: string;
  subtitle: string;
  images: ImageItem[];
}

export function FiveImageGallery({
  title,
  subtitle,
  images,
}: FiveImageGalleryProps) {
  const displayImages = images.slice(0, 5);

  return (
    <View
      backgroundColor="#29363A"
      padding="53px 0 135px 0"
      className="main-wrapper"
    >
      <View
        maxWidth="1220px"
        margin="0 auto"
        padding="0 20px"
        className="main-container"
      >
        {/* ✅ Title and Subtitle at the top */}
        <View textAlign="center" marginBottom="52px">
          <Text
            fontSize={{ base: "18px" }}
            fontWeight="400"
            color="#FFFFFF"
            lineHeight="1.3em"
          >
            {title}
          </Text>
          <Text
            color="#FFFFFF"
            fontSize={{ base: "26px", large: "56px" }}
            fontWeight="400"
            lineHeight="1.5em"
            maxWidth="800px"
            margin="0 auto"
          >
            {subtitle}
          </Text>
        </View>

        {/* ✅ Image Grid Below */}
        <Grid
          columnGap="20px"
          rowGap="20px"
          templateColumns={{
            base: "1fr 1fr",
            large: "445px 290px 445px",
          }}
          justifyContent="center"
        >
          {/* Left Column */}
          <View display="flex" style={{ flexDirection: "column", gap: "20px" }}>
            <Image
              src={displayImages[0]?.url}
              alt={displayImages[0]?.altText}
              width="445px"
              height="279px"
              objectFit="cover"
            />
            <Image
              src={displayImages[1]?.url}
              alt={displayImages[1]?.altText}
              width="445px"
              height="187px"
              objectFit="cover"
            />
          </View>

          {/* Middle Column */}
          <View display="flex">
            <Image
              src={displayImages[2]?.url}
              alt={displayImages[2]?.altText}
              width="100%"
              height="480px"
              minHeight={{ base: "100%", large: "unset" }}
              objectFit="cover"
            />
          </View>

          {/* Right Column */}
          <Grid
            templateColumns={{ base: "1fr 1fr", large: "1fr" }}
            templateRows={{ large: "1fr 1fr" }}
            gap={"20px"}
            columnSpan={{ base: "2", large: "1" }}
          >
            <Image
              src={displayImages[3]?.url}
              alt={displayImages[3]?.altText}
              width="445px"
              height="279px"
              objectFit="cover"
            />
            <Image
              src={displayImages[4]?.url}
              alt={displayImages[4]?.altText}
              width="445px"
              height="187px"
              minHeight={{ base: "100%", large: "unset" }}
              objectFit="cover"
            />
          </Grid>
        </Grid>
      </View>
    </View>
  );
}
