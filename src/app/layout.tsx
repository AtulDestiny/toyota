import type { Metadata } from "next";
import { fonts } from "@/theme/fonts";
import Providers from "@/app/providers";
import "@/app/app.css";
import MainLayout from "@/components/Layout/MainLayout/MainLayout";
import Script from "next/script";
import { GoogleAnalytics, GoogleTagManager } from "@next/third-parties/google";

export const metadata: Metadata = {
  title: "TOYOTA - Automotores Toyota Colombia",
  description:
    "En Automotores Automotores Toyota Colombia encuentras los mejores vehículos y accesorios al mejor precio del mercado. 👉¡Visítanos ahora!",
  icons: {
    icon: "/images/favicon.png", // Path to your favicon.ico file
  },
  openGraph: {
    locale: "es_ES",
    type: "website",
    title: "TOYOTA - Automotores Toyota Colombia",
    description:
      "En Automotores Automotores Toyota Colombia encuentras los mejores vehículos y accesorios al mejor precio del mercado. 👉¡Visítanos ahora!",
    url: "https://www.toyota.com.co/",
    siteName: "Automotores Toyota Colombia",
    // Note: 'modifiedTime' might be 'updatedTime' or similar depending on the framework's exact type definition
    // For Next.js, it's usually handled by the 'article' object if type is 'article'
    // For general 'website' type, you might not have a direct 'modifiedTime' property under 'openGraph' itself.
    // If you need it, you might have to add it as a custom meta tag if the framework allows, or it might be automatically generated.
    // For now, let's omit it if 'website' type doesn't support it directly.
    images: [
      {
        url: "https://www.toyota.com.co/wp-content/uploads/2023/03/Toyota_Negro.png",
        width: 4071,
        height: 1021,
        alt: "Toyota Logo", // It's good practice to add alt text for images
        type: "image/png",
      },
    ],
  },

  // --- Twitter tags ---
  twitter: {
    card: "summary_large_image",
    title: "TOYOTA - Automotores Toyota Colombia", // Often the same as og:title
    description:
      "En Automotores Automotores Toyota Colombia encuentras los mejores vehículos y accesorios al mejor precio del mercado. 👉¡Visítanos ahora!", // Often the same as og:description
    // Next.js doesn't have direct 'label1' and 'data1' properties for twitter object.
    // These are specific to some Twitter Cards and might need custom meta tags if not directly supported.
    // For standard summary_large_image, the image, title, and description are typically enough.
    // If you absolutely need them, you might need to use a more generic `other` or `meta` property if the framework provides one, or a custom component.
    images: {
      url: "https://www.toyota.com.co/wp-content/uploads/2023/03/Toyota_Negro.png",
      alt: "Toyota Logo",
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const SCRIPT_URL =
    "https://widget-cloud-crossnet.s3.us-east-1.amazonaws.com/ToyotaColombia/Messaging/ContactCenter/PROD/assets/js/form_config.js";
  return (
    <html
      lang="en"
      className={`${fonts.toyotaDisplay.variable} ${fonts.toyotaType.variable} ${fonts.toyotaText.variable}  ${fonts.roboto.variable}`}
    >
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </head>
      <body>
        <cn-digital-form id="cn-digital-form-app"></cn-digital-form>

        <Providers>
          <MainLayout>{children}</MainLayout>
        </Providers>
        <Script
          src={SCRIPT_URL}
          strategy="afterInteractive" // Or "lazyOnload", "beforeInteractive", "worker"
          // You can also add other attributes like 'async', 'defer', 'id'
          // onLoad={() => {
          //   console.log('Script loaded successfully!');
          // }}
          // onError={() => {
          //   console.error('Error loading script!');
          // }}
        />
        {/* Facebook Pixel Script */}
        <Script id="facebook-pixel" strategy="afterInteractive">
          {`
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', '805906601323550');
            fbq('track', 'PageView');
          `}
        </Script>
        <noscript>
          <img
            height="1"
            width="1"
            style={{ display: "none" }}
            src="https://www.facebook.com/tr?id=805906601323550&ev=PageView&noscript=1"
          />
        </noscript>
      </body>
      <GoogleAnalytics gaId="G-LFNS399NLT" />
      <GoogleTagManager gtmId="GTM-T99HJHG" />
    </html>
  );
}
