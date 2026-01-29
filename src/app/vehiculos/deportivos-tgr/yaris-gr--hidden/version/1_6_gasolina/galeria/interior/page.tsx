"use client";

import "@aws-amplify/ui-react/styles.css";
import RotatingImage from "@/components/Gallery/RotatingImage/RotatingImage";
import styles from "./Interior.module.scss";
import { Flex, Image, Text, View } from "@aws-amplify/ui-react";
import Button from "@/components/Layout/Button/Button";
import { useState } from "react";
import { useRouter, usePathname } from "next/navigation";

export default function Galeria() {
  const [showLightbox, setShowLightbox] = useState(true);
  const carImages = ["/images/interior.png"];
  const router = useRouter();
  const pathname = usePathname();

  const handleNavigation = () => {
    const newPath = pathname.split("/").slice(0, -1).join("/");
    router.push(newPath);
  };

  return (
    <>
      {showLightbox && (
        <div className={styles.lightbox}>
          <Image
            src="/images/icons/close.svg"
            alt="close"
            style={{ cursor: "pointer" }}
            className={styles.close}
            top={{ base: "20px", xl: "102px" }}
            right={{ base: "20px", xl: "130px" }}
            width={{ base: "20px", xl: "45px" }}
            onClick={() => setShowLightbox(false)}
          />
          <Flex
            direction={"column"}
            className={styles.info}
            justifyContent="center"
            alignItems="center"
          >
            <Image
              height={{ base: "83px", xl: "70px" }}
              alt={"left"}
              src={"/images/icons/drag.svg"}
              marginBottom={{ base: "20px", xl: "23px" }}
            />
            <Text
              fontSize={{ base: "14px", xl: "ml" }}
              fontWeight="400"
              lineHeight="normal"
              color="white"
              fontFamily={{
                base: "var(--font-ToyotaDisplay)",
                xl: "var(--font-ToyotaType-Regular)",
              }}
              textAlign="center"
              marginBottom={{ base: "40px", xl: "84px" }}
            >
              Para navegar el interior, <br />
              arrastra para rotar la imagen
            </Text>
            <Button
              type="button"
              color="deepred"
              style={{ fontFamily: "var(--font-roboto)" }}
              onClick={() => setShowLightbox(false)}
            >
              Comenzar
            </Button>
          </Flex>
        </div>
      )}
      <View position="relative">
        <RotatingImage
          images={carImages}
          imageHeight={{ base: "711px", xl: "100%" }}
        />
        {!showLightbox && (
          <Image
            src="/images/icons/close.svg"
            alt="close"
            style={{ cursor: "pointer" }}
            className={styles.close}
            top={{ base: "20px", xl: "62px" }}
            right={{ base: "20px", xl: "40px" }}
            width={{ base: "20px", xl: "45px" }}
            onClick={handleNavigation}
          />
        )}
      </View>
    </>
  );
}
