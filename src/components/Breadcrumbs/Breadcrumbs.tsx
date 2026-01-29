import React from "react";
import { View, Text, Flex } from "@aws-amplify/ui-react";

interface BreadcrumbItem {
  label: string;
  url: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
  onNavigate?: (url: string) => void;
}

export const Breadcrumbs: React.FC<BreadcrumbsProps> = ({
  items,
  onNavigate,
}) => {
  // Handle navigation
  const handleClick = (url: string) => {
    if (url === "#") return; // Do nothing for current page

    if (onNavigate) {
      onNavigate(url);
    } else if (typeof window !== "undefined") {
      window.location.href = url;
    }
  };

  return (
    <View
      maxWidth={{ base: "100%", medium: "800px", large: "800px" }}
      margin={{ base: "15px", medium: "30px auto 0", large: "30px auto 0" }}
      padding={{ base: "0", medium: "0 20px", large: "0 30px" }}
    >
      <Flex gap="8px" alignItems="center" wrap="wrap">
        {items.map((item, index) => {
          const isLast = index === items.length - 1;

          return (
            <React.Fragment key={index}>
              <Text
                fontSize="14px"
                color={isLast ? "#000000" : "#666666"}
                style={{
                  cursor: isLast ? "default" : "pointer",
                }}
                onClick={() => !isLast && handleClick(item.url)}
                fontWeight={isLast ? "500" : "400"}
              >
                {item.label}
              </Text>

              {!isLast && (
                <Text
                  fontSize="14px"
                  color="#666666"
                  style={{
                    userSelect: "none",
                  }}
                >
                  /
                </Text>
              )}
            </React.Fragment>
          );
        })}
      </Flex>
    </View>
  );
};
