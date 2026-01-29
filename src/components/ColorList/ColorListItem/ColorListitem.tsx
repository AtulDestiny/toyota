import { Flex, Image, View } from "@aws-amplify/ui-react";

interface ColorListItemProps {
  item: {
    id: string;
    img: string;
    title: string;
  };
  onSelect: (item: { id: string; img: string; title: string }) => void;
  isSelected: boolean;
}

export function ColorListItem({
  item,
  isSelected,
  onSelect,
}: ColorListItemProps) {
  return (
    <Flex direction="column">
      <Flex
        position="relative"
        onClick={() => onSelect(item)}
        width={{ base: "56px", xl: "70px" }}
        height={{ base: "48px", xl: "70px" }}
        justifyContent="center"
        alignItems="center"
        style={{
          cursor: "pointer",
        }}
      >
        {/* The color circle */}
        <Image
          textAlign="center"
          src={item.img}
          alt={item.title}
          loading="lazy"
          objectFit="fill"
          width={{ base: "45px", xl: "59.2px" }}
          height="auto"
          position="absolute"
          top="50%"
          transform="translateY(-50%)"
        />

        {/* Selection indicator with check mark */}
        {isSelected && (
          <>
            {/* Outer circle */}
            <View
              position="absolute"
              width={{ base: "60px", xl: "70px" }}
              height={{ base: "60px", xl: "70px" }}
              style={{
                borderRadius: "50%",
                border: "2px solid #000",
                pointerEvents: "none",
              }}
            />

            {/* Check mark as SVG */}
            <View
              position="absolute"
              width={{ base: "20px", xl: "24px" }}
              height={{ base: "20px", xl: "24px" }}
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                pointerEvents: "none",
                zIndex: 2,
              }}
            >
              <svg
                viewBox="0 0 24 24"
                width="100%"
                height="100%"
                fill="none"
                stroke="#000000"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="20 6 9 17 4 12" />
              </svg>
            </View>
          </>
        )}
      </Flex>
    </Flex>
  );
}
