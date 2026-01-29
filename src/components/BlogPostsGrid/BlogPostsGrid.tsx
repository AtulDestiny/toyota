"use client";

import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Flex,
  Image,
  Grid,
  Button,
  Divider,
} from "@aws-amplify/ui-react";
import "@aws-amplify/ui-react/styles.css";
import { useRouter } from "next/navigation";

// Define style property types to replace 'any'
type StyleValue = string | number | boolean;
type ResponsiveStyle = StyleValue | Record<string, StyleValue>;
type StyleProps = Record<string, ResponsiveStyle>;

interface BlogPost {
  id: string;
  title: string;
  category: string;
  date: string;
  imageUrl: string;
  slug: string;
}

interface BlogPostsGridProps {
  posts: BlogPost[];
  onPostClick?: (slug: string) => void;
  onLoadMore?: () => void;
  showLoadMore?: boolean;
  containerStyle?: StyleProps;
  titleStyle?: StyleProps;
  dateStyle?: StyleProps;
  tagStyle?: StyleProps;
}

export const BlogPostsGrid: React.FC<BlogPostsGridProps> = (props) => {
  const {
    posts = [],
    onPostClick,
    onLoadMore,
    showLoadMore = true,
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
    padding: { base: "26px 1rem 1rem", medium: "1.5rem 1rem", xl: "2rem 0" },
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
      fontWeight: "600",
      color: "#000",
      lineHeight: "1.2",
      marginTop: "0.75rem",
      marginBottom: "0.5rem",
      fontFamily: "var(--font-ToyotaType-Regular)",
    },
    date: {
      fontSize: "14px",
      fontWeight: "400",
      color: "#666",
      marginBottom: "0.5rem",
      fontFamily: "var(--font-ToyotaType-Regular)",
    },
    tag: {
      fontSize: "12px",
      fontWeight: "500",
      padding: "0.25rem 0.75rem",
      backgroundColor: "rgba(0, 0, 0, 0.7)",
      color: "white",
      borderRadius: "999px",
      display: "inline-block",
      position: "absolute",
      top: "0.75rem",
      left: "0.75rem",
      zIndex: 1,
      fontFamily: "var(--font-ToyotaType-Regular)",
    },
    readMore: {
      fontWeight: "500",
      fontSize: "14px",
      color: "#000",
      padding: "0",
      textDecoration: "none",
      fontFamily: "var(--font-ToyotaType-Regular)",
    },
  };

  const desktopStyles = {
    title: {
      fontSize: { base: "18px", medium: "20px" },
      fontWeight: "600",
      color: "#000",
      lineHeight: "1.2",
      marginBottom: "0.5rem",
      fontFamily: "var(--font-ToyotaType-Regular)",
    },
    date: {
      fontSize: "14px",
      fontWeight: "400",
      color: "#666",
      marginBottom: "0.75rem",
      fontFamily: "var(--font-ToyotaType-Regular)",
    },
    tag: {
      fontSize: "12px",
      fontWeight: "500",
      padding: "0.25rem 0.75rem",
      backgroundColor: "rgba(0, 0, 0, 0.7)",
      color: "white",
      borderRadius: "999px",
      display: "inline-block",
      position: "absolute",
      top: "0.75rem",
      left: "0.75rem",
      zIndex: 1,
      fontFamily: "var(--font-ToyotaType-Regular)",
    },
    readMore: {
      fontWeight: "500",
      fontSize: "14px",
      color: "#000",
      padding: "0",
      textDecoration: "none",
      fontFamily: "var(--font-ToyotaType-Regular)",
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
  // Mobile list layout render function
  const renderMobileList = () => {
    return (
      <>
        <Divider marginBottom={"20px"} />
        {posts.map((post, index) => (
          <React.Fragment key={post.id}>
            <Flex direction="column" gap="2rem">
              <Flex direction="row" paddingBottom="1rem">
                {/* Image with category tag */}
                <View
                  position="relative"
                  borderRadius="8px"
                  overflow="hidden"
                  style={{ cursor: "pointer" }}
                  width={{ base: "50%", xl: "100%" }}
                  onClick={() => handlePostClick(post.slug)}
                >
                  <Image
                    src={post.imageUrl}
                    alt={post.title}
                    objectFit="cover"
                    width={{ base: "100%", xl: "100%" }}
                    height="200px"
                  />
                  <Text {...mobileStyles.tag} {...tagStyle}>
                    {post.category}
                  </Text>
                </View>

                {/* Content below image */}
                <Flex
                  direction="column"
                  width={{ base: "50%", xl: "100%" }}
                  justifyContent="space-between"
                  alignItems="flex-start"
                >
                  <View>
                    <Text
                      {...mobileStyles.title}
                      {...titleStyle}
                      onClick={() => handlePostClick(post.slug)}
                      style={{ cursor: "pointer" }}
                    >
                      {post.title}
                    </Text>

                    <Text {...mobileStyles.date} {...dateStyle}>
                      {post.date}
                    </Text>
                  </View>

                  <Button
                    variation="link"
                    onClick={() => handlePostClick(post.slug)}
                    {...mobileStyles.readMore}
                  >
                    Leer más
                  </Button>
                </Flex>
              </Flex>
            </Flex>
            <Divider marginBottom={"20px"} />
          </React.Fragment>
        ))}
      </>
    );
  };

  // Desktop grid layout render function
  const renderDesktopGrid = () => {
    return (
      <Grid
        templateColumns={{ base: "1fr", medium: "1fr",large:"1fr 1fr", xl: "1fr 1fr" }}
        gap={{ base: "2rem", medium: "1.5rem" }}
      >
        {posts.map((post) => (
          <Flex
            key={post.id}
            direction={{ base: "column", medium: "row" }}
            gap="1rem"
            paddingBottom={{ base: "1rem", medium: "0" }}
          >
            {/* Image */}
            <View
              width="290px"
              height="268px"
              position="relative"
              borderRadius="4px"
              overflow="hidden"
              style={{ cursor: "pointer" }}
              onClick={() => handlePostClick(post.slug)}
            >
              <Image
                src={post.imageUrl}
                alt={post.title}
                objectFit="cover"
                width="100%"
                height="100%"
              />
              <Text {...desktopStyles.tag} {...tagStyle}>
                {post.category}
              </Text>
            </View>

            {/* Content */}
            <Flex
              direction="column"
              width="calc(100% - 290px - 1rem)"
              height="268px"
              justifyContent="space-between"
              alignItems="flex-start"
            >
              <View>
                <Text
                  {...desktopStyles.title}
                  {...titleStyle}
                  onClick={() => handlePostClick(post.slug)}
                  style={{ cursor: "pointer" }}
                >
                  {post.title}
                </Text>
                <Text {...desktopStyles.date} {...dateStyle}>
                  {post.date}
                </Text>
              </View>

              <Button
                variation="link"
                onClick={() => handlePostClick(post.slug)}
                {...desktopStyles.readMore}
              >
                Leer más
              </Button>
            </Flex>
          </Flex>
        ))}
      </Grid>
    );
  };

  // Always return the mobile layout for mobile-sized screens during initial render
  if (typeof window !== "undefined" && window.innerWidth < 768) {
    return (
      <View {...defaultContainerStyle} {...containerStyle}>
        {renderMobileList()}

        {showLoadMore && (
          <Flex justifyContent="center" marginTop="3rem">
            <Button
              variation="link"
              onClick={onLoadMore}
              borderRadius="999px"
              paddingLeft="2rem"
              paddingRight="2rem"
              paddingTop="0.75rem"
              paddingBottom="0.75rem"
              fontSize="16px"
              fontWeight="500"
              color="#000"
              borderColor="#CCCCCC"
              fontFamily="var(--font-ToyotaType-Regular)"
            >
              Cargar más Noticias
            </Button>
          </Flex>
        )}
      </View>
    );
  }

  return (
    <View {...defaultContainerStyle} {...containerStyle}>
      {isMobile ? renderMobileList() : renderDesktopGrid()}
      {posts.length > 1 && (
        <Divider margin={!showLoadMore ? "70px 0 45px" : ""} />
      )}
      {showLoadMore && (
        <Flex justifyContent="center" marginTop="3rem">
          <Button
            variation="link"
            onClick={onLoadMore}
            borderRadius="999px"
            paddingLeft="2rem"
            paddingRight="2rem"
            paddingTop="0.75rem"
            paddingBottom="0.75rem"
            fontSize="16px"
            fontWeight="500"
            color="#000"
            borderColor="#CCCCCC"
            fontFamily="var(--font-ToyotaType-Regular)"
          >
            Cargar más Noticias
          </Button>
        </Flex>
      )}
    </View>
  );
};
