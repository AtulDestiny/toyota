// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck

"use client";

import React, { useState } from "react";
import {
  View,
  Text,
  Flex,
  Image,
  Divider,
  Button,
  Heading,
} from "@aws-amplify/ui-react";
import "@aws-amplify/ui-react/styles.css";
import {
  getBlogContent,
  BlogContent,
} from "../../app/noticias/data/blogContent";

interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  imageUrl: string;
}

interface Quote {
  text: string;
  author: string;
  position: string;
  image: string;
}

interface Feature {
  icon: string;
  title: string;
  description: string;
}

interface MultimediaContent {
  type: string;
  url: string;
  thumbnail?: string;
  alt: string;
}

// Router interface to avoid using 'any'
interface RouterInterface {
  push: (path: string) => void;
}

// Main component props interface
interface BlogDetailComponentProps {
  slug: string;
  title: string;
  meta: string;
  mainImage: string;
  intro?: string;
  content?: {
    sections?: {
      title?: string;
      text?: string;
    }[];
    features?: Feature[];
    quotes?: Quote[];
    multimedia?: MultimediaContent[];
    relatedPosts?: BlogPost[];
  };
  handleShare?: (network: string) => void;
  handleRelatedPostClick?: (postSlug: string) => void;
  router?: RouterInterface;
}

export const BlogDetailComponent: React.FC<BlogDetailComponentProps> = (
  props
) => {
  const {
    slug,
    title,
    meta,
    mainImage,
    intro,
    content,
    handleShare,
    handleRelatedPostClick,
    router,
  } = props;

  // Get dynamic content based on slug
  const dynamicContent: BlogContent = getBlogContent(slug);

  // Use dynamic content or fallback to props
  const displayTitle = dynamicContent.title || title;
  const displayHeroImage = dynamicContent.heroImage || mainImage;

  const [currentSlide, setCurrentSlide] = useState(1);
  const totalSlides = dynamicContent.galleryImages?.length || 9;

  // Navigation for slides
  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === totalSlides ? 1 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 1 ? totalSlides : prev - 1));
  };

  // Social share handler - use provided handler or default
  const onShare = (network: string) => {
    if (handleShare) {
      handleShare(network);
    } else {
      let shareUrl = "";
      const url = typeof window !== "undefined" ? window.location.href : "";
      const encodedTitle = encodeURIComponent(displayTitle);

      switch (network) {
        case "facebook":
          shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;
          break;
        case "twitter":
          shareUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodedTitle}`;
          break;
        case "linkedin":
          shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`;
          break;
        case "whatsapp":
          shareUrl = `https://api.whatsapp.com/send?text=${encodedTitle}%20${encodeURIComponent(url)}`;
          break;
        default:
          return;
      }

      if (typeof window !== "undefined") {
        window.open(shareUrl, "_blank");
      }
    }
  };

  // Handle related post click - use provided handler or default
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const onRelatedPostClick = (postSlug: string) => {
    if (handleRelatedPostClick) {
      handleRelatedPostClick(postSlug);
    } else if (router) {
      router.push(`/noticias/${postSlug}`);
    }
  };

  // Use dynamic content or fallback to props content
  const features = dynamicContent.features || content?.features || [];
  const quotes = dynamicContent.quotes || content?.quotes || [];
  const multimedia = dynamicContent.multimedia || content?.multimedia || [];
  const sections = dynamicContent.sections || content?.sections || [];
  const showQuotes = dynamicContent.showQuotes !== false; // Default to true unless explicitly false

  return (
    <View width="100%">
      {/* Header with main image, title and sharing */}
      <View
        width="100%"
        position="relative"
        height={{ base: "300px", medium: "400px", large: "500px" }}
      >
        <Image
          src={displayHeroImage}
          alt={displayTitle}
          width="100%"
          height="100%"
          objectFit="cover"
        />

        {/* Share overlay */}
      </View>
      {/* Title and Publication Date */}
      <View
        maxWidth={{ base: "", xl: "1200px", xxl: "1200px" }}
        margin="0 auto"
        padding={{
          base: "30px 0px 20px 20px",
          medium: "10px 30px 30px",
          large: "70px 10px 60px 40px",
        }}
      >
        <Text
          fontSize={{ base: "14px", medium: "16px" }}
          color="#666666"
          lineHeight="1.5"
          paddingBlockEnd={"7px"}
        >
          Fecha de Publicación: {meta.split("|")[0]}
        </Text>
        <Heading
          level={1}
          fontSize={{ base: "26px", medium: "56px", large: "56px" }}
          fontFamily="var(--font-ToyotaType-Regular)"
          fontWeight="400"
          lineHeight={"110.00000000000001%"}
          style={{ whiteSpace: "pre-line" }}
        >
          {displayTitle}
        </Heading>
      </View>

      <View
        position={{ base: "relative", xl: "relative" }}
        top="105%"
        left="20px"
        className="social-icons-blogs"
        display={{ base: "block", medium: "flex" }}
        style={{ flexDirection: "column" }}
        padding={{
          base: "10px 10px 38px 10px",
          medium: "0px 0px 38px 15px",
          xl: "10px 10px 38px 40px",
          xxl: "10px 10px 38px 80px",
        }}
        backgroundColor="rgba(255, 255, 255, 0.8)"
        borderRadius="4px"
      >
        <Text fontSize="14px" fontWeight="500" marginBottom="5px">
          Compartir Artículo
        </Text>
        <Flex gap="8px">
          <View
            as="button"
            onClick={() => onShare("facebook")}
            backgroundColor="#3b5998"
            width="30px"
            height="30px"
            borderRadius="50%"
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            <Text color="white" fontSize="14px">
              f
            </Text>
          </View>
          <View
            as="button"
            onClick={() => onShare("twitter")}
            backgroundColor="#1da1f2"
            width="30px"
            height="30px"
            borderRadius="50%"
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            <Text color="white" fontSize="14px">
              t
            </Text>
          </View>
          <View
            as="button"
            onClick={() => onShare("linkedin")}
            backgroundColor="#0077b5"
            width="30px"
            height="30px"
            borderRadius="50%"
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            <Text color="white" fontSize="14px">
              in
            </Text>
          </View>
          <View
            as="button"
            onClick={() => onShare("whatsapp")}
            backgroundColor="#25d366"
            width="30px"
            height="30px"
            borderRadius="50%"
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            <Text color="white" fontSize="14px">
              w
            </Text>
          </View>
        </Flex>
      </View>

      <Divider
        borderColor="#D42224"
        marginTop="1.5rem"
        marginBottom="1.5rem"
        maxWidth={{ base: "71px", xl: "71px" }}
        minHeight="2px"
        margin={{
          base: "0px 0px 10px 15px",
          medium: "10px 0px 0px 45px",
          xl: "0px 0px 0px 61px",
          xxl: "10px 10px 38px 99px",
        }}
        border={{ base: "solid #D42224 2px" }}
      />

      {/* Main content */}
      <View
        maxWidth="1200px"
        margin="0 auto"
        padding={{
          base: "0px 20px 20px",
          medium: "10px 30px 30px",
          large: "0 40px 90px",
        }}
      >
        {/* Intro text */}
        {intro && (
          <Text
            fontSize={{ base: "16px", medium: "22px" }}
            padding={{ base: "20px 0" }}
            lineHeight="1.5"
          >
            {intro}
          </Text>
        )}

        {/* Content sections */}
        {sections.map((section, index) => (
          <React.Fragment key={index}>
            {section.title && (
              <Text
                fontSize={
                  section.title === "¿Por qué un híbrido enchufable?"
                    ? "22px"
                    : section.title === "Híbridos enchufables Toyota"
                      ? "32px"
                      : { base: "26px", medium: "32px" }
                }
                fontFamily={
                  section.title === "Híbridos enchufables Toyota"
                    ? "var(--font-toyotaDisplay)"
                    : "inherit"
                }
                fontWeight={
                  section.title === "¿Por qué un híbrido enchufable?"
                    ? "700"
                    : section.title === "Híbridos enchufables Toyota"
                      ? "400"
                      : "400"
                }
                lineHeight={
                  section.title === "¿Por qué un híbrido enchufable?"
                    ? "100%"
                    : section.title === "Híbridos enchufables Toyota"
                      ? "130%"
                      : "1.5"
                }
                letterSpacing={
                  section.title === "¿Por qué un híbrido enchufable?" ||
                    section.title === "Híbridos enchufables Toyota"
                    ? "0%"
                    : "normal"
                }
                marginTop={index > 0 ? "30px" : "0"}
              >
                {section.title}
              </Text>
            )}
            {section.text && (
              <Text
                fontSize={{ base: "16px", xl: "22px" }}
                fontFamily="var(--font-ToyotaType-Regular)"
                fontWeight="400"
                letterSpacing="0%"
                padding={{ base: "20px 0" }}
                style={{ whiteSpace: "pre-line" }}
              >
                {section.text}
              </Text>
            )}
          </React.Fragment>
        ))}

        {/* Toyota Hybrid Images */}
        {dynamicContent.detailImages &&
          dynamicContent.detailImages.length > 0 && (
            <Flex
              maxWidth="1200px"
              margin="20px auto 40px"
              padding={{
                base: "0px 20px",
                medium: "10px 30px",
                large: "10px 40px",
              }}
              direction={{ base: "row", medium: "row" }}
              gap="0px"
              justifyContent="center"
              alignItems="center"
            >
              {dynamicContent.detailImages.map((image, index) => (
                <View key={index} height={{ base: "164px", medium: "auto", xl: "446px" }} minWidth={{ base: index === 0 ? "164px" : "212px", xl: index === 0 ? "465px" : "620px" }} width={{ base: "100%", medium: "48%", xl: index === 0 ? "465px" : "620px" }}>
                  <Image
                    borderRadius={index === 0 ? { base: "50%" } : undefined}
                    src={image.src}
                    alt={image.alt}
                    width={{ base: index === 0 ? "164px" : "212px", xl: index === 0 ? "465px" : "620px" }}
                    height={{ base: "164px", medium: "auto", xl: "446px" }}
                    objectFit="cover"
                  />
                </View>
              ))}
            </Flex>
          )}
      </View>

      {/* Toyota Hybrid Features */}
      {features.length > 0 && (
        <View
          maxWidth="1200px"
          margin="20px auto 40px"
          padding={{
            base: "0px 20px",
            medium: "10px 30px",
            large: "10px 40px",
          }}
        >
          {features.map((feature, index) => (
            <React.Fragment key={index}>
              <View margin="20px 0 40px">
                <Flex
                  direction="column"
                  alignItems="center"
                  textAlign="center"
                  gap="15px"
                >
                  <View width="60px" height="60px">
                    {typeof feature.icon === "object" && feature.icon.src ? (
                      <Image
                        src={feature.icon.src}
                        alt={feature.title}
                        width={`${feature.icon.width}px`}
                        height={`${feature.icon.height}px`}
                        objectFit="contain"
                      />
                    ) : typeof feature.icon === "string" &&
                      feature.icon.startsWith("/") ? (
                      <Image
                        src={feature.icon}
                        alt={feature.title}
                        width="100%"
                        height="100%"
                        objectFit="contain"
                      />
                    ) : (
                      <div dangerouslySetInnerHTML={{ __html: feature.icon }} />
                    )}
                  </View>

                  <Heading
                    level={3}
                    fontSize="26px"
                    fontWeight="700"
                    lineHeight="100%"
                    letterSpacing="0%"
                    textAlign="center"
                    fontFamily="var(--font-ToyotaType-Regular)"
                    paddingTop={
                      feature.title === "Enchufable" ? "23.82px" : "0px"
                    }
                    style={{ whiteSpace: "pre-line" }}
                  >
                    {feature.title}
                  </Heading>

                  <Text
                    fontSize="16px"
                    fontFamily="var(--font-toyotaDisplay)"
                    fontWeight="400"
                    lineHeight="190%"
                    letterSpacing="0%"
                    textAlign="center"
                    color="#333333"
                    maxWidth="700px"
                    style={{ whiteSpace: "pre-line" }}
                  >
                    {feature.description}
                  </Text>
                </Flex>
              </View>

              {index < features.length - 1 && (
                <Divider
                  marginTop="20px"
                  marginBottom="40px"
                  borderColor="#e5e5e5"
                />
              )}
            </React.Fragment>
          ))}
        </View>
      )}

      {/* Quotes section */}
      {showQuotes &&
        quotes.length > 0 &&
        quotes.map((quote, index) => (
          <View
            key={index}
            maxWidth="1200px"
            margin={{ base: "0 auto", xl: "120px auto 30px" }}
            marginTop={index === 1 ? "0px" : "0px"}
            padding={
              index === 1
                ? { base: "20px", medium: "30px", large: "0px" }
                : { base: "20px", medium: "30px", large: "0px" }
            }
            paddingBottom={index === 1 ? "20px" : "42px"}
          >
            <View maxWidth="800px" margin="0 auto">
              {/* Quote */}
              <Text
                fontSize={{ base: "24px", medium: "32px" }}
                fontWeight="300"
                lineHeight="1.3"
                marginBottom="30px"
                textAlign="left"
              >
                <Text
                  as="span"
                  fontSize="32px"
                  fontWeight="bold"
                  marginRight="10px"
                >
                  &ldquo;
                </Text>
                <Text
                  as="span"
                  backgroundColor="black"
                  color="white"
                  padding="5px 10px"
                  lineHeight={1.7}
                >
                  {quote.text}
                </Text>
                <Text
                  as="span"
                  fontSize="32px"
                  fontWeight="bold"
                  marginLeft="10px"
                >
                  &rdquo;
                </Text>
              </Text>

              {/* Additional paragraph if needed */}
              {/* <Text
                fontSize={{ base: "14px", medium: "16px" }}
                lineHeight="1.6"
                color="#333333"
              >
                Toyota asumió el compromiso con alcanzar la neutralidad de
                carbono antes de 2050. Pero ya comenzó esa transición. Desde
                1997, cuando lanzamos al mercado Toyota Prius, el primer híbrido
                de la historia, llevamos vendidos más de 20 millones de
                vehículos electrificados.
              </Text> */}
            </View>
          </View>
        ))}

      {/* Multimedia Content */}
      {multimedia.length > 0 && (
        <View
          maxWidth="1200px"
          margin="0 auto"
          padding={{ base: "20px", medium: "30px", large: "40px" }}
        >
          {/* Red line above heading */}
          <View
            width="60px"
            height="2px"
            backgroundColor="#D42224"
            margin="0 auto 30px"
          />

          <Heading
            level={2}
            fontSize="32px"
            fontFamily="var(--font-toyotaDisplay)"
            fontWeight="400"
            lineHeight="130%"
            letterSpacing="0%"
            marginBottom="50px"
            textAlign="center"
          >
            Contenido Multimedia
          </Heading>

          <Flex direction="column" gap="20px">
            {multimedia.map((content, index) => (
              <View key={index}>
                {content.type === "image" ? (
                  <View
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                  >
                    <Image
                      src={content.url}
                      alt={content.alt}
                      width={{ base: "100%", medium: "910px" }}
                      height={{ base: "211px", medium: "470px" }}
                      objectFit="cover"
                      borderRadius="8px"
                    />
                  </View>
                ) : (
                  <View
                    position="relative"
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                    width={{ base: "100%", medium: "910px" }}
                    height={{ base: "211px", medium: "470px" }}
                    borderRadius="8px"
                    margin="0 auto"
                  >
                    <Image
                      src={content.thumbnail || ""}
                      alt={content.alt}
                      width={{ base: "100%", medium: "910px" }}
                      height={{ base: "211px", medium: "470px" }}
                      objectFit="cover"
                      borderRadius="8px"
                    />
                    <View
                      position="absolute"
                      top="50%"
                      left="50%"
                      style={{ transform: "translate(-50%, -50%)" }}
                      width="60px"
                      height="60px"
                      backgroundColor="rgba(0,0,0,0.7)"
                      borderRadius="50%"
                      display="flex"
                      alignItems="center"
                      justifyContent="center"
                      cursor="pointer"
                    >
                      <Text color="white" fontSize="24px"></Text>
                    </View>
                  </View>
                )}
              </View>
            ))}
          </Flex>
        </View>
      )}

      {dynamicContent.galleryImages &&
        dynamicContent.galleryImages.length > 0 && (
          <View
            maxWidth="1200px"
            margin="0 auto"
            padding={{
              base: "0px 20px",
              medium: "10px 30px",
              large: "10px 40px",
            }}
          >
            <Flex
              direction={{ base: "column", medium: "column" }}
              flexWrap="wrap"
              gap="20px"
              justifyContent="center"
              style={{ alignItems: "center" }}
            >
              {dynamicContent.galleryImages.map((image, index) => (
                <View
                  key={index}
                  width={{
                    base: "100%",
                    medium: "auto",
                    large: "auto",
                    xl: "auto",
                    xxl: "auto",
                  }}
                  height={{
                    base: "auto",
                    medium: "auto",
                    large: "auto",
                    xl: "auto",
                  }}
                  borderRadius="8px"
                  overflow="hidden"
                >
                  <Image
                    src={image?.src || "/images/silver.svg"}
                    alt={image?.alt || `Toyota image ${index + 1}`}
                    width="100%"
                    height="100%"
                    minWidth={{
                      base: "auto",
                      medium: "750px",
                      xl: "700px",
                      xxl: "910px",
                    }}
                    minHeight={{
                      base: "auto",
                      medium: "470px",
                      large: "470px",
                      xl: "470px",
                      xxl: "470px",
                    }}
                    maxWidth="910px"
                    maxHeight="470px"
                    objectFit="cover"
                  />
                </View>
              ))}
            </Flex>
          </View>
        )}
      {/* Newsletter Subscription */}
      <View
        maxWidth="1200px"
        margin="40px auto"
        padding={{ base: "20px", medium: "30px", large: "40px" }}
        textAlign="center"
        style={{ display: "none" }}
      >
        <Text
          fontSize={{ base: "12px", xl: "18px" }}
          fontFamily="var(--font-ToyotaType-Regular)"
          fontWeight="400"
          lineHeight="100%"
          letterSpacing="0%"
          textAlign="center"
          color="#666"
          marginBottom="10px"
          style={{ display: "none" }}
        >
          NEWSLETTER
        </Text>
        <Heading
          level={2}
          fontSize={{ base: "26px", xl: "56px" }}
          fontFamily="var(--font-ToyotaType-Regular)"
          fontWeight={{ base: "700", xl: "400" }}
          lineHeight={{ base: "100%", xl: "110%" }}
          letterSpacing={{ base: "0%", xl: "-2%" }}
          textAlign="center"
          marginBottom="15px"
          style={{ whiteSpace: "pre-line", display: "none" }}
        >
          <Text display={{ base: "block", xl: "none" }}>
            Suscríbete a nuestro newsletter y recibe toda la información que
            Toyota tiene para ti
          </Text>
          <Text display={{ base: "none", xl: "block" }}>
            Suscríbete a nuestro newsletter y {"\n"}
            recibe toda la información que{"\n"}
            Toyota tiene para ti
          </Text>
        </Heading>

        <Flex
          direction={{ base: "column", medium: "column" }}
          justifyContent="center"
          alignItems="center"
          gap="17px"
          maxWidth={{ base: "311px", medium: "600px" }}
          margin="0 auto"
          marginTop="30px"
          style={{ display: "none" }}
        >
          <input
            type="email"
            placeholder="Correo electrónico"
            style={{
              width: "100%",
              height: "40px",
              padding: "11px 23px",
              borderRadius: "80px",
              border: "1px solid #ddd",
              borderWidth: "1px",
              fontSize: "12px",
              fontFamily: "var(--font-ToyotaType-Regular)",
              fontWeight: "400",
              lineHeight: "100%",
              letterSpacing: "0%",
              verticalAlign: "middle",
              color: "#58595B",
              gap: "10px",
            }}
          />
          <Button
            backgroundColor="#D42224"
            color="white"
            padding={{ base: "15px", medium: "15px 30px" }}
            borderRadius="100px"
            width="162px"
            height="40px"
            fontFamily="var(--font-ToyotaType-Regular)"
            fontWeight="700"
            fontSize="14px"
            lineHeight="110%"
            letterSpacing="0%"
            textAlign="center"
          >
            Enviar
          </Button>
        </Flex>
      </View>
    </View>
  );
};

export default BlogDetailComponent;
