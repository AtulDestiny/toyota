import { View, Image } from "@aws-amplify/ui-react";

export default function ChildDrawingBanner() {
  return (
    <View
      position="relative"
      width="100%"
      backgroundColor="#F6F6F6"
      // overflow="hidden"
      paddingTop="2rem"
      paddingBottom="0"
    >
      {/* Red Car with Path */}
      <Image
        src="/images/red-car-with-path-route.png"
        alt="red-car-path"
        width={{ base: "100%", medium: "auto" }}
        maxWidth={{ base: "400px", medium: "600px", xl: "600px" }}
        position="relative"
        style={{ zIndex: 1 }}
        padding={{ base: "0 1rem" }}
        display="flex"
        margin="0 auto"
      />

      {/* Child image rotated */}
      <Image
        src="/images/child-write-with-pencil.png"
        alt="child-writing"
        position="absolute"
        bottom={{ base: "-86px", medium: "-172px" }}
        right={{ base: "43px", medium: "173px" }}
        width={{ base: "160px", medium: "160px", xl: "320px" }}
        height={{ base: "170px", medium: "160px", xl: "340px" }}
        transform="rotate(6.8deg)"
        borderRadius="8px"
        boxShadow="0 4px 12px rgba(0, 0, 0, 0.1)"
        style={{ zIndex: 2 }}
        border={{ base: "solid 10px #fff", xl: "solid 20px #fff" }}
        objectFit="cover"
      />
    </View>
  );
}
