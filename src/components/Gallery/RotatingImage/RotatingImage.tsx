import React, { useState, useRef, useEffect } from "react";
import { motion, useMotionValue, useTransform } from "framer-motion";
import styles from "./RotatingImage.module.scss";
import { Image } from "@aws-amplify/ui-react";

// Define a proper type for the responsive height property
type ResponsiveProperty = {
  base?: string;
  sm?: string;
  md?: string;
  lg?: string;
  xl?: string;
  [key: string]: string | undefined;
};

interface RotatingImageProps {
  images: string[];
  imageHeight?: ResponsiveProperty;
  imageWidth?: ResponsiveProperty;
  customWidth?: string;
  customHeight?: string;
}

const RotatingImage = ({
  images,
  imageHeight = { base: "auto" },
  imageWidth,
  customWidth,
  customHeight,
}: RotatingImageProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const dragX = useMotionValue(0);
  const containerRef = useRef(null);
  const [isMobile, setIsMobile] = useState(false);

  const imageIndex = useTransform(dragX, [-100, 100], [0, images.length - 1], {
    clamp: true,
  });

  const handleDrag = () => {
    const index = Math.round(imageIndex.get());
    setCurrentIndex(index);
  };

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 767px)");
  
    const handleChange = (e: MediaQueryListEvent | MediaQueryList) => {
      setIsMobile(e.matches);
    };
  
    // Initial check
    handleChange(mediaQuery);
  
    // Add event listener
    mediaQuery.addEventListener("change", handleChange);
  
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, [isMobile]);
  
  useEffect(() => {
    console.log("Updated isMobile:", isMobile);
  }, [isMobile]);

  // Determine the image styles based on props
  const getImageStyles = () => {
    const baseStyles: React.CSSProperties = {
      maxWidth: "min(100%, 1024px)",
      maxHeight: "100%",
      pointerEvents: "none",
    };

    // If custom dimensions are provided, use them
    if (customWidth && customHeight) {
      return {
        ...baseStyles,
        width: customWidth,
        height: customHeight,
        maxWidth: "none",
        maxHeight: "none",
      };
    }

    return baseStyles;
  };

  // Determine the container styles
  const getContainerStyles = () => {
    const baseStyles: React.CSSProperties = {
      position: "relative",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      overflow: "hidden",
    };

    // If custom dimensions are provided, set container size
    if (customWidth && customHeight) {
      return {
        ...baseStyles,
        width: customWidth,
        height: customHeight,
      };
    }

    return baseStyles;
  };

  return (
    <div
      ref={containerRef}
      className={styles.container}
      style={getContainerStyles()}
    >
      <motion.div
        style={{
          x: dragX,
          cursor: "grab",
          display: "flex",
          justifyContent: "center",
          // position: isMobile ? "fixed" : "relative", // TODO: This should be adjusted properly
          position: "relative",
          zIndex: isMobile ?"999" : "",
        }}
        drag="x"
        dragConstraints={{ left: -100, right: 100 }}
        dragElastic={0}
        onDrag={handleDrag}
        whileTap={{ cursor: "grabbing" }}
      >
        <Image
          src={images[currentIndex]}
          alt={`Car Image ${currentIndex + 1}`}
          height={customHeight ? undefined : imageHeight}
          width={customWidth ? undefined : imageWidth}
          objectFit={"cover"}
          style={getImageStyles()}
        />
      </motion.div>
    </div>
  );
};

export default RotatingImage;
