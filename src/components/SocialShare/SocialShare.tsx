// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import React from "react";
import { View, Text, Flex, Divider } from "@aws-amplify/ui-react";

interface SocialShareProps {
  title?: string;
  networks: string[];
  url: string;
  showDivider?: boolean;
}

export const SocialShare: React.FC<SocialShareProps> = ({
  title = "Compartir en redes sociales",
  networks = ["facebook", "twitter", "linkedin", "whatsapp"],
  url,
  showDivider = false,
}) => {
  //   const isMobile = useBreakpointValue({ base: true, medium: false });

  // Handle share click
  const handleShare = (network: string) => {
    let shareUrl = "";
    const encodedUrl = encodeURIComponent(url);
    const pageTitle = encodeURIComponent(document.title);

    switch (network) {
      case "facebook":
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`;
        break;
      case "twitter":
        shareUrl = `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${pageTitle}`;
        break;
      case "linkedin":
        shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`;
        break;
      case "whatsapp":
        shareUrl = `https://api.whatsapp.com/send?text=${pageTitle}%20${encodedUrl}`;
        break;
      default:
        return;
    }

    window.open(shareUrl, "_blank", "width=600,height=400");
  };

  // Network configuration (colors, icons, labels)
  const networkConfig: {
    [key: string]: { color: string; icon: string; label: string };
  } = {
    facebook: { color: "#3b5998", icon: "f", label: "Facebook" },
    twitter: { color: "#1da1f2", icon: "t", label: "Twitter" },
    linkedin: { color: "#0077b5", icon: "in", label: "LinkedIn" },
    whatsapp: { color: "#25d366", icon: "w", label: "WhatsApp" },
  };

  return (
    <View
      maxWidth={{ base: "100%", medium: "800px", large: "800px" }}
      margin={{
        base: "0 auto 40px",
        medium: "0 auto 40px",
        large: "0 auto 50px",
      }}
    >
      {showDivider && (
        <Divider
          margin={{ base: "0 0 30px", medium: "0 0 30px", large: "0 0 40px" }}
        />
      )}

      <Text
        fontSize="16px"
        fontWeight="600"
        margin={{ base: "0 0 15px", medium: "0 0 15px", large: "0 0 15px" }}
      >
        {title}
      </Text>

      <Flex gap="10px" alignItems="center">
        {networks.map((network) => (
          <View
            key={network}
            as="button"
            onClick={() => handleShare(network)}
            backgroundColor={networkConfig[network]?.color || "#999"}
            width="40px"
            height="40px"
            borderRadius="50%"
            display="flex"
            alignItems="center"
            justifyContent="center"
            transition="transform 0.2s ease"
            _hover={{
              transform: "scale(1.1)",
            }}
            aria-label={`Compartir en ${networkConfig[network]?.label || network}`}
          >
            <Text color="white" fontSize="18px">
              {networkConfig[network]?.icon || network.charAt(0)}
            </Text>
          </View>
        ))}
      </Flex>
    </View>
  );
};
