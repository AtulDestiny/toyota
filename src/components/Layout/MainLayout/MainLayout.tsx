"use client";

import "@aws-amplify/ui-react/styles.css";
import Footer from "@/components/Layout/Footer/Footer";
import { View } from "@aws-amplify/ui-react";
import { useEffect, useState } from "react";
import Header from "../Header/Header";
import { CookiesModal } from "@/components/CookiesModal/CookiesModal";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isMobile, setIsMobile] = useState<boolean | undefined>(undefined);
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window?.innerWidth < 768);
    };

    handleResize();

    window?.addEventListener("resize", handleResize);
    return () => window?.removeEventListener("resize", handleResize);
  }, []);
  return (
    <View position="relative">
      <Header />
      {isMobile !== undefined && (
        <>
          {children}
          <Footer />
        </>
      )}
      <CookiesModal />
    </View>
  );
}
