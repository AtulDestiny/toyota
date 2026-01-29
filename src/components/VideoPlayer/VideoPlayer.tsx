"use client";
import React, { useState } from "react";
import {
  View,
  Image,
  useTheme,
  useBreakpointValue,
  Flex,
  ViewProps,
  ImageProps,
} from "@aws-amplify/ui-react";

interface ImageConfig {
  src?: string;
  alt?: string;
  style?: Partial<ImageProps>;
}

interface ResponsiveValue<T = string | number> {
  base?: T;
  md?: T;
  lg?: T;
  xl?: T;
}
interface VideoPlayerProps {
  image?: ImageConfig;
  containerStyle?: Partial<ViewProps>;
  PlayiconStyle?: Partial<ViewProps>;
  videoSrc: string; // MP4 or YouTube URL
  isYoutube?: boolean;
  containerResponsiveStyle?: {
    paddingTop?: ResponsiveValue;
    marginBottom?: ResponsiveValue;
    marginTop?: ResponsiveValue;
    minHeight?: ResponsiveValue;
  };
}

export const VideoPlayer: React.FC<VideoPlayerProps> = ({
  image,
  containerStyle,
  videoSrc,
  isYoutube = false,
  PlayiconStyle,
  containerResponsiveStyle,
}) => {
  const { tokens } = useTheme();
  const isDesktop = useBreakpointValue({ base: false, large: true });
  const [showVideo, setShowVideo] = useState(!image?.src); // Show video directly if no thumbnail
  const buttonPosition = "50%";

  const resolveResponsiveValue = <T,>(
    value?: ResponsiveValue<T>
  ): T | undefined => {
    if (typeof value !== "object" || value === null) return value as T;
    if (isDesktop) return value.xl ?? value.lg ?? value.md ?? value.base;
    return value.base;
  };
  return (
    <View
      position="relative"
      width="100%"
      maxWidth={containerStyle?.maxWidth || "800px"}
      margin={containerStyle?.margin || "0 auto"}
      maxHeight={containerStyle?.maxHeight || ""}
      borderRadius={tokens.radii.medium}
      overflow="hidden"
      padding={containerStyle?.padding || "0"}
      {...containerStyle}
    >
      {!showVideo && image?.src && (
        <>
          <Image
            src={image?.src || "https://placehold.co/600x400"}
            alt={image?.alt || "Video background"}
            width="100%"
            height={image?.style?.height || "auto"}
            objectFit="cover"
            minWidth={containerStyle?.minWidth || ""}
            {...image?.style}
          />

          {/* Play Icon Overlay */}
          <Flex
            position="absolute"
            top={buttonPosition}
            left="50%"
            transform="translate(-50%, -50%)"
            borderRadius="50%"
            padding={tokens.space.small}
            display="flex"
            alignItems="center"
            justifyContent="center"
            width="auto"
            height="83.02px"
            as="button"
            // background="transparent"
            border="none"
            // cursor="pointer"
            onClick={() => setShowVideo(true)}
          >
            <Image
              maxHeight={PlayiconStyle?.maxHeight || ""}
              maxWidth={PlayiconStyle?.maxWidth || ""}
              width="84.28px"
              height="83.02px"
              src="/images/icons/player-icon.png"
              alt="player icon"
            />
          </Flex>
        </>
      )}

      {showVideo && (
        <View
          as="div"
          position="relative"
          paddingTop={
            resolveResponsiveValue(containerResponsiveStyle?.paddingTop) ||
            "56.25%"
          }
          marginBottom={
            resolveResponsiveValue(containerResponsiveStyle?.marginBottom) ||
            "14.25%"
          }
          marginTop={
            resolveResponsiveValue(containerResponsiveStyle?.marginTop) ||
            "50px"
          }
          minHeight={resolveResponsiveValue(containerResponsiveStyle?.minHeight) ||
          ""}
        >
          {isYoutube ? (
            <iframe
              src={`${videoSrc}?autoplay=1`}
              frameBorder="0"
              allow="autoplay; encrypted-media"
              allowFullScreen
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
              }}
            />
          ) : (
            <video
              src={videoSrc}
              controls
              autoPlay
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
              }}
            />
          )}
        </View>
      )}
    </View>
  );
};
