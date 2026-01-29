// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import React from "react";
import { View, Text, Flex, Image } from "@aws-amplify/ui-react";

interface Post {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  imageUrl: string;
}

interface RelatedPostsProps {
  title: string;
  posts: Post[];
  onPostClick: (slug: string) => void;
}

export const RelatedPosts: React.FC<RelatedPostsProps> = ({
  title,
  posts,
  onPostClick,
}) => {
  //   const isMobile = useBreakpointValue({ base: true, medium: false });

  return (
    <View
      backgroundColor="#f5f5f5"
      width="100%"
      padding={{ base: "40px 15px", medium: "60px 20px", large: "80px 30px" }}
    >
      <View
        maxWidth={{ base: "100%", medium: "800px", large: "800px" }}
        margin="0 auto"
      >
        <Text
          fontSize={{ base: "24px", medium: "28px", large: "32px" }}
          fontFamily="var(--font-ToyotaType-Regular)"
          fontWeight="400"
          margin={{ base: "0 0 20px", medium: "0 0 30px", large: "0 0 40px" }}
          textAlign="center"
        >
          {title}
        </Text>

        <Flex
          direction={{ base: "column", medium: "row", large: "row" }}
          gap={{ base: "30px", medium: "20px", large: "30px" }}
          justifyContent="center"
          wrap="wrap"
        >
          {posts.map((post) => (
            <View
              key={post.id}
              width={{
                base: "100%",
                medium: "calc(33.33% - 14px)",
                large: "calc(33.33% - 20px)",
              }}
              backgroundColor="white"
              borderRadius="8px"
              overflow="hidden"
              boxShadow="0px 4px 8px rgba(0, 0, 0, 0.05)"
              style={{ cursor: "pointer" }}
              onClick={() => onPostClick(post.slug)}
              transition="transform 0.2s ease, box-shadow 0.2s ease"
              _hover={{
                transform: "translateY(-5px)",
                boxShadow: "0px 8px 16px rgba(0, 0, 0, 0.1)",
              }}
            >
              <Image
                src={post.imageUrl}
                alt={post.title}
                width="100%"
                height={{ base: "200px", medium: "160px", large: "180px" }}
                objectFit="cover"
              />
              <View padding="20px">
                <Text
                  fontSize={{ base: "18px", medium: "16px", large: "18px" }}
                  fontWeight="500"
                  lineHeight="1.4"
                  marginBottom="10px"
                >
                  {post.title}
                </Text>
                <Text
                  fontSize={{ base: "14px", medium: "13px", large: "14px" }}
                  color="#666"
                  lineHeight="1.5"
                  marginBottom="15px"
                >
                  {post.excerpt}
                </Text>
                <Text fontSize="12px" color="#999">
                  {post.date}
                </Text>
              </View>
            </View>
          ))}
        </Flex>
      </View>
    </View>
  );
};
