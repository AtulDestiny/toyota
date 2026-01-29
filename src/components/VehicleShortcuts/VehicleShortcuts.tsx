"use client";

import Button from "@/components/Layout/Button/Button";
import { colors as globalsColors } from "@/theme/colors";
import { Flex, Grid, useBreakpointValue } from "@aws-amplify/ui-react";
import "@aws-amplify/ui-react/styles.css";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";

export default function VehicleShortcuts({
  technicalSpecs,
  customSlug,
  cotizarLink,
}: {
  technicalSpecs?: string;
  customSlug?: string;
  cotizarLink?: string;
}) {
  const pathname = usePathname();
  const segments = pathname.split("/");
  const slug = segments[3];

  const isMobile = useBreakpointValue({ base: true, xl: false });

  const router = useRouter();

  return (
    <Flex
      className="shortcuts"
      width="100%"
      style={{ zIndex: 10 }}
      backgroundColor={globalsColors.theme.black}
      justifyContent={"space-between"}
      position={"sticky"}
      top={{ base: "54.83px", xl: "60px" }}
      left="0px"
    >
      <Grid
        width={{ base: "100%", xl: "max-content" }}
        fontSize={"sm"}
        templateColumns={{ base: "1fr 1fr", xl: "188px 188px 188px" }}
      >
        <Button
          color="deepred"
          padding=".75rem 4.375rem"
          style={{
            width: isMobile ? "100%" : "188px",
            borderRadius: "0",
            lineHeight: "1.225rem",
            border: "none",
            height: "45px",
            fontFamily: "var(--font-toyotaDisplay)",
          }}
          onClick={() => {
            if (cotizarLink) {
              router.push(cotizarLink);
              return;
            }

            router.push(
              customSlug ? `/cotizador/${customSlug}` : `/cotizador/${slug}`
            );
          }}
        >
          Cotizar
        </Button>

        {isMobile ? (
          <></>
        ) : (
          <Link
            href={
              pathname.endsWith("/galeria") ? pathname : pathname + "/galeria"
            }
          >
            <Button
              color="black"
              padding=".75rem 2.75rem"
              style={{
                width: isMobile ? "100%" : "188px",
                borderRadius: "0",
                lineHeight: "1.225rem",
                border: "none",
                fontFamily: "var(--font-ToyotaType-Regular)",
              }}
            >
              Galería
            </Button>
          </Link>
        )}
        <Link href={"/cotiza-tu-toyota/test-drive"}>
          <Button
            color="white"
            padding=".75rem 2.75rem"
            style={{
              width: isMobile ? "100%" : "188px",
              borderRadius: "0",
              lineHeight: "1.225rem",
              border: "none",
              fontFamily: "var(--font-ToyotaType-Regular)",
            }}
          >
            Test Drive
          </Button>
        </Link>
      </Grid>
      {!isMobile && technicalSpecs && (
        <Link style={{ display: "flex" }} href={technicalSpecs} target="_blank">
          <Button
            color="black"
            padding={"0 2.5rem"}
            style={{
              borderRadius: "0",
              fontSize: "1.125rem",
              lineHeight: "1.225rem",
              border: "none",
            }}
          >
            Información Ficha Técnica
          </Button>
        </Link>
      )}
    </Flex>
  );
}
