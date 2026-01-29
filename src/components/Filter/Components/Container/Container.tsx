import { useEffect, useState } from "react";
import { colors } from "@/theme/colors";
import {
  Accordion,
  Button,
  Flex,
  Grid,
  Heading,
  Image,
  ScrollView,
  View,
} from "@aws-amplify/ui-react";
import "@aws-amplify/ui-react/styles.css";
import "./Container.css";
import "nouislider/distribute/nouislider.css";
export interface ContainerProps {
  onApply: () => void;
  onClear: () => void;
  children: React.ReactNode;
  showFilters?: boolean;
  toggleShowFilters?: () => void;
  expandedFilters?: string[];
}

export const Container: React.FC<ContainerProps> = ({
  onApply,
  onClear,
  children,
  showFilters,
  toggleShowFilters,
  expandedFilters,
}) => {
  const [isMobile, setIsMobile] = useState<boolean | undefined>(undefined);
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window?.innerWidth < 1250);
    };

    handleResize();

    window?.addEventListener("resize", handleResize);
    return () => window?.removeEventListener("resize", handleResize);
  }, []);

  return (
    <>
      <View
        className={`filter-panel ${
          showFilters || !isMobile ? "open" : "closed"
        }`}
        backgroundColor={{ base: colors.theme.white, xl: "transparent" }}
        padding={{ base: "0px 0px 11px 15px", xl: "2rem" }}
        paddingRight={{ xl: "0px" }}
        width={{ base: "", xl: "378px" }}
      >
        <Flex
          justifyContent={"space-between"}
          width={{ base: "95%", xl: "100%" }}
        >
          <Heading
            level={4}
            lineHeight={{ base: "24px", xl: "24px" }}
            fontFamily="var(--font-ToyotaType-Regular)"
            fontSize={{ base: "22px", xl: "22px" }}
            letterSpacing={{ base: "0px", xl: "0px" }}
            fontWeight={700}
            style={{ verticalAlign: "middle" }}
            marginTop={{ base: "17px" }}
            color={"#000000"}
          >
            Filtros
          </Heading>
          <Image
            display={{ xl: "none" }}
            src="/images/icons/close.svg"
            alt="close hhh"
            onClick={toggleShowFilters}
            style={{ cursor: "pointer" }}
            marginTop={{ base: "17px" }}
            marginRight={{ base: "7.22px" }}
            maxHeight={{ base: "13.1385px" }}
            maxWidth={{ base: "13.1385px" }}
          />
        </Flex>
        <ScrollView
          autoScroll="smooth"
          height={{ base: "80vh", xl: "" }}
          marginTop={{ base: "21px", xl: "1.3125rem" }}
          minWidth={{ base: "", xl: "", xxl: "378px" }}
        >
          <Accordion.Container
            className="my-accordion"
            defaultValue={expandedFilters}
            allowMultiple
            preventCollapse
          >
            {children}

            <Flex
              justifyContent={"space-around"}
              marginTop={"4px"}
              position={{ base: "absolute", xl: "relative" }}
              bottom={0}
              backgroundColor={{ base: colors.theme.lightGray }}
              width={"100%"}
            >
              <Button
                onClick={onClear}
                fontSize={{ base: "sm", xl: "13px" }}
                fontWeight={"500"}
                backgroundColor={{ base: colors.theme.lightGray }}
                borderRadius={{ base: "0" }}
                border={"none"}
                textDecoration={{ xl: "underline" }}
                padding={{ base: "15px .5rem", xxl: "0" }}
                marginRight={{ base: "0", xl: "auto" }}
                fontFamily="var(--font-toyotaDisplay)"
                style={{ color: "black" }}
              >
                Limpiar filtros
              </Button>
            </Flex>
          </Accordion.Container>
        </ScrollView>
      </View>
    </>
  );
};
