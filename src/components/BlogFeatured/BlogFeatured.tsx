"use client";

import React, { useState, useEffect } from "react";
import { View, Text, Flex, Image, Grid, Divider } from "@aws-amplify/ui-react";
import "@aws-amplify/ui-react/styles.css";
import { useRouter } from "next/navigation";

// Define style property types to replace 'any'
type StyleValue = string | number | boolean;
type ResponsiveStyle = StyleValue | Record<string, StyleValue>;
type StyleProps = Record<string, ResponsiveStyle>;

interface FeaturedPost {
  id: string;
  title: string;
  category: string;
  date: string;
  imageUrl: string;
  slug: string;
}

interface BlogFeaturedProps {
  posts: FeaturedPost[];
  onPostClick?: (slug: string) => void;
  containerStyle?: StyleProps;
  titleStyle?: StyleProps;
  dateStyle?: StyleProps;
  tagStyle?: StyleProps;
}

export const BlogFeatured: React.FC<BlogFeaturedProps> = (props) => {
  const {
    posts = [],
    onPostClick,
    containerStyle,
    titleStyle,
    dateStyle,
    tagStyle,
  } = props;

  const router = useRouter();

  // Use useState and useEffect to detect mobile screen size
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Function to check if screen is mobile size
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    // Check on initial load
    checkIfMobile();

    // Add event listener for window resize
    window.addEventListener("resize", checkIfMobile);

    // Clean up
    return () => window.removeEventListener("resize", checkIfMobile);
  }, []);

  const defaultContainerStyle = {
    padding: {
      base: "1.063rem 15px 15px",
      medium: "1.5rem 1rem",
      xl: "45px 0",
    },
    margin: "0 auto",
    maxWidth: {
      base: "100%",
      medium: "1200px",
      large: "1200px",
      xl: "1200px",
      xxl: "1530px",
    },
  };

  // Separate styles for mobile and desktop
  const mobileStyles = {
    title: {
      fontSize: "18px",
      fontWeight: "400",
      color: "#fff",
      justifyContent: "end",
      lineHeight: "1.2",
      fontFamily: "var(--font-ToyotaType-Regular)",
    },
    date: {
      fontSize: "12px",
      fontWeight: "400",
      color: "#fff",
      marginTop: "0.5rem",
      fontFamily: "var(--font-ToyotaType-Regular)",
    },
    tag: {
      fontSize: { base: "9px", xl: "12px" },
      fontWeight: "500",
      padding: "0 0 0.25rem",
      backgroundColor: "rgba(0, 0, 0, 0.7)",
      color: "white",
      borderRadius: "40px",
      marginBottom: "0",
      textAlign: "center",
      display: "inline-block",
      width: { base: "88px", xl: "fit-content" },
      fontFamily: "var(--font-ToyotaType-Regular)",
      position: "absolute",
      top: "20px",
      height: { base: "12px", xl: "auto" },
      left: "25px",
      zIndex: 10,
    },
    readMore: {
      fontSize: "14px",
      fontWeight: "500",
      color: "#333",
      marginTop: "0.5rem",
      fontFamily: "var(--font-ToyotaType-Regular)",
    },
  };

  const desktopStyles = {
    title: {
      fontSize: "32px",
      fontWeight: "400",
      fontFamily: "var(--font-toyotaDisplay)",
      lineHeight: "130%",
      letterSpacing: "0%",
      color: "white",
    },
    date: {
      fontSize: "26.26px",
      fontWeight: "400",
      fontFamily: "var(--font-ToyotaType-Regular)",
      lineHeight: "100%",
      letterSpacing: "0%",
      color: "white",
      marginTop: "21.7px",
    },
    tag: {
      fontSize: "19.7px",
      fontWeight: "400",
      fontFamily: "var(--font-toyotaDisplay)",
      lineHeight: "17.51px",
      letterSpacing: "0%",
      padding: "4.38px 21.88px",
      backgroundColor: "rgba(0, 0, 0, 0.7)",
      color: "white",
      borderRadius: "87.54px",
      marginBottom: "0.75rem",
      display: "inline-block",
      width: "191.89px",
      height: "27.44px",
    },
  };

  const handlePostClick = (slug: string) => {
    if (onPostClick) {
      onPostClick(slug);
    } else {
      router.push(`/noticias/${slug}`);
    }
  };

  // Mobile list layout render function
  const renderMobileList = () => {
    return (
      <Flex direction="column" gap="20px">
        {posts.slice(0, 2).map((post) => (
          <View
            key={post.id}
            onClick={() => handlePostClick(post.slug)}
            position="relative"
            maxHeight={{ base: "200px", xl: "none" }}
            minHeight={{ base: "200px", xl: "none" }}
            overflow="hidden"
            style={{ transition: "transform 0.3s", cursor: "pointer" }}
          >
            <Image
              src={post.imageUrl}
              alt={post.title}
              objectFit="cover"
              minHeight={{ base: "200px", xl: "none" }}
              width="100%"
              height="100%"
            />

            <View
              position="absolute"
              top="0"
              left="0"
              right="0"
              bottom="0"
              style={{
                background: "#00000080",
              }}
            />
            <Text {...mobileStyles.tag} {...tagStyle}>
              {post.category}
            </Text>
            <Flex
              position="absolute"
              bottom="0"
              left="0"
              right="0"
              direction="column"
              padding="1.3rem 1.563rem "
              style={{ height: "100%", justifyContent: "end" }}
            >
              <div>
                <Text {...mobileStyles.title} {...titleStyle}>
                  {post.title}
                </Text>

                <Text {...mobileStyles.date} {...dateStyle}>
                  {post.date}
                </Text>
              </div>
            </Flex>
          </View>
        ))}
      </Flex>
    );
  };

  // Desktop card layout render function
  const renderDesktopCards = () => {
    return (
      <Grid templateColumns={{ base: "1fr", medium: "1fr 1fr" }} gap="1rem">
        {posts.slice(0, 2).map((post) => (
          <View
            key={post.id}
            onClick={() => handlePostClick(post.slug)}
            position="relative"
            height={{ base: "200px", xl: "437.68px" }}
            borderRadius="8px"
            overflow="hidden"
            style={{ transition: "transform 0.3s", cursor: "pointer" }}
          >
            {/* Background Image */}
            <Image
              src={post.imageUrl}
              alt={post.title}
              objectFit="cover"
              width="100%"
              height="100%"
            />

            {/* Dark Gradient Overlay */}
            <View
              position="absolute"
              top="0"
              left="0"
              right="0"
              bottom="0"
              style={{
                background:
                  "linear-gradient(to top, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0.1) 50%, rgba(0,0,0,0.1) 100%)",
              }}
            />

            {/* Content */}
            <Flex
              position="absolute"
              bottom="0"
              left="0"
              right="0"
              direction="column"
              padding="1.5rem"
              style={{ height: "100%", justifyContent: "space-between" }}
            >
              <Text {...desktopStyles.tag} {...tagStyle}>
                {post.category}
              </Text>
              <div>
                <Text {...desktopStyles.title} {...titleStyle}>
                  {post.title}
                </Text>

                <Text {...desktopStyles.date} {...dateStyle}>
                  {post.date}
                </Text>
              </div>
            </Flex>
          </View>
        ))}
      </Grid>
    );
  };

  // Always return the mobile layout for mobile-sized screens
  if (typeof window !== "undefined" && window.innerWidth < 768) {
    return (
      <View {...defaultContainerStyle} {...containerStyle}>
        <Text
          fontSize={"14px"}
          fontWeight={400}
          fontFamily={"var(--font-toyotaDisplay)"}
          marginBottom={"17px"}
        >
          {posts.length} Resultados
        </Text>
        {renderMobileList()}
      </View>
    );
  }

  return (
    <View {...defaultContainerStyle} {...containerStyle}>
      {isMobile ? renderMobileList() : renderDesktopCards()}
      {posts.length > 1 && (
        <Divider color={"#E0E0E0"} marginTop={!isMobile ? "58px" : "41px"} />
      )}{" "}
    </View>
  );
};
