"use client";
import React from "react";
import { FeaturedHybridComponent } from "@/components/FeaturedHybridComponent";
import { Quotes } from "@/components/Quotes";
import { FeaturedInfoBlock } from "@/components/FeaturedInfoBlock";
import { ThreeImageGallery } from "@/components/ThreeImageGallery";
import MaterialCards from "@/components/MaterialCards/MaterialCards";
// import { ModalStepperCopy } from "@/components/ModalStepper";
import Banner from "@/components/Banner/Banner";
import CatalogoPostventa from "@/components/CatalogoPostventa/CatalogoPostventa";
import { SliderInfo } from "@/components/SliderInfo/SliderInfo";
import MainSlider from "@/components/MainSlider/MainSlider";
import { News } from "@/components/News/News";
import { ToyotaWorld } from "@/components/ToyotaWorld/ToyotaWorld";
import { Guarantees } from "@/components/Guarantees/Guarantees";
import CanWeHelpYou from "@/components/CanWeHelpYou/CanIWeHelpYou";
import { PreventiveCampaignsServicesBanner } from "@/components/preventiveCampaignsServicesBanner/PreventiveCampaignsServicesBanner";
import MarketplaceUsedDialog from "@/components/MarketplaceUsedDialog/MarketplaceUsedDialog";
import PreventiveCampaignsServicesSlider from "@/components/PreventiveCampaignsServicesSlider/PreventiveCampaignsServicesSlider";
import { SliderGallery } from "@/components/SliderGallery/SliderGallery";
import { HTMLSlider } from "@/components/HTMLSlider/HTMLSlider";
import { MantenimientoOficialBanner } from "@/components/MantenimientoOficialBanner/MantenimientoOficialBanner";
import { CustomizableSlider } from "@/components/CustomizableSlider/CustomizableSlider";
import CampanaTapetesSlider from "@/components/CampanaTapetesSlider/CampanaTapetesSlider";
import { BannerSlider } from "@/components/BannerSlider/BannerSlider";
import { CampanaTapetesBanner } from "@/components/CampanaTapetesBanner/CampanaTapetesBanner";
import { ColorList } from "@/components/ColorList/ColorList";
import { SpecList } from "@/components/SpecList/SpecList";
import ModelToolbar from "@/components/ModelToolbar/ModelToolbar";
import { DealershipSelector } from "@/components/DealershipSelector/DealershipSelector";
import { VehicleNavigation } from "@/components/VehicleNavigation/VehicleNavigation";
import { GeneralEspecs } from "@/components/GeneralEspecs/GeneralEspecs";
import { ConcessionaireSearch } from "@/components/ConcessionaireSearch/ConcessionaireSearch";
import { SliderSection } from "@/components/SliderSection/SliderSection";
import Tools from "@/components/Tools/tools";
// import renderComponent from "@/utils/renderComponent";
// import { RedCardInfo } from "@/components/RedCardInfo/RedCardInfo";
import { HybridMythsCarousel } from "@/components/HybridMythsCarousel/HybridMythsCarousel";
import { SafetyFeaturesGrid } from "@/components/SafetyFeaturesGrid/SafetyFeaturesGrid";
import { EnvironmentalChallengeGrid } from "@/components/EnvironmentalChallengeGrid/EnvironmentalChallengeGrid";
import { SafetyBanner } from "@/components/SafetyBanner/SafetyBanner";
import { EnvironmentalInitiatives } from "@/components/EnvironmentalInitiatives/EnvironmentalInitiatives";
import { VideoPlayer } from "@/components/VideoPlayer/VideoPlayer";
import { QuoteBlock } from "@/components/QuoteBlock/QuoteBlock";
import TestimonalCard from "@/components/TestimonalCard/TestimonalCard";
import BoutiqueTGRComponent from "@/components/BoutiqueTGRCard/BoutiqueTGRCard";
import TgrFooterComponent from "@/components/TgrFooterComponent/TgrFooterComponent";
import AmplifyAccordion from "@/components/Accordion/Accordion";
import FeatureComparisonTable from "@/components/Tabel/Tabel";
import TwoCard from "@/components/TwoCard/TwoCard";
import { HeroCarrodeTussuenos } from "@/components/HeroCarrodeTussuenos/HeroCarrodeTussuenos";
import { InformacionDestacada } from "@/components/InformacionDestacada/InformacionDestacada";
import ToyotaImageCollage from "@/components/TgrImageGrid/ImageGrid";
import TextCard from "@/components/Cards/TextCard/TextCard";
import VehiclesSwiper from "@/components/CarCardSlider/CarSlider";
import { WinnersCarousel } from "@/components/WinnersCarousel/WinnersCarousel";
import { WinnersTabs } from "@/components/WinnersTabs/WinnersTabs";
import { QuienesPuedenParticipar } from "@/components/ParticipantCategory/ParticipantCategory";
import { PremiosSection } from "@/components/PremiosSection/PremiosSection";
import { ComoParticipar } from "@/components/ComoParticipar/ComoParticipar";
import ThankYouPage from "@/components/GetInTouch/GetInTocuh";

// Create a type for our custom global object
declare global {
  // eslint-disable-next-line no-var
  var fetchImageUrl: (path: string | undefined) => string;
}

// Mock function for fetchImageUrl used in ColorList
const mockFetchImageUrl = (path: string | undefined): string => {
  return path
    ? `/images/colors/${path.split("/").pop()}`
    : "/images/placeholder.jpg";
};

// Define a more flexible component type
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type ComponentType = React.ComponentType<any>;

// Define mock props for each component
const getComponentProps = (Component: ComponentType) => {
  const componentName = Component.displayName || Component.name;

  // Default mock data for common props
  const defaultProps = {
    title: "Sample Title",
    description: "Sample Description",
    image: "/images/placeholder.jpg",
  };

  // Component-specific mock props
  switch (componentName) {
    case "MaterialCards":
      return {
        items: [
          {
            id: "1",
            title: "Card 1",
            description: "Description 1",
            image: "/images/placeholder.jpg",
          },
          {
            id: "2",
            title: "Card 2",
            description: "Description 2",
            image: "/images/placeholder.jpg",
          },
        ],
      };
    case "SliderSection":
      return {
        items: [
          {
            title: "Slide 1",
            description: "Description 1",
            image: {},
          },
          {
            title: "Slide 2",
            description: "Description 2",
            image: {},
          },
        ],
        theme: "light",
        showButton: false,
      };
    case "MainSlider":
      return {
        slides: [
          {
            imageMobile: "/images/placeholder.jpg",
            imageDesktop: "/images/placeholder.jpg",
            title: "Slide Title 1",
          },
          {
            imageMobile: "/images/placeholder.jpg",
            imageDesktop: "/images/placeholder.jpg",
            title: "Slide Title 2",
          },
        ],
        sliderConfig: {
          slidesPerView: 1,
          spaceBetween: 10,
          loop: true,
          isButton: false,
          autoplay: {
            delay: 3000,
            disableOnInteraction: false,
          },
          pagination: {
            clickable: true,
          },
          navigation: true,
        },
      };
    case "FeaturedHybridComponent":
      return {
        title: "Hybrid Features",
        description: "Explore the hybrid features of our vehicles",
        list: [
          {
            icon: "/images/icons/placeholder.svg",
            title: "Feature 1",
            description: "Description of feature 1",
          },
          {
            icon: "/images/icons/placeholder.svg",
            title: "Feature 2",
            description: "Description of feature 2",
          },
          {
            icon: "/images/icons/placeholder.svg",
            title: "Feature 3",
            description: "Description of feature 3",
          },
        ],
      };
    case "ThreeImageGallery":
      return {
        title: "Featured Gallery",
        images: [
          {
            src: "/images/placeholder.jpg",
            alt: "Image 1",
            title: "Feature 1",
          },
          {
            src: "/images/placeholder.jpg",
            alt: "Image 2",
            title: "Feature 2",
          },
          {
            src: "/images/placeholder.jpg",
            alt: "Image 3",
            title: "Feature 3",
          },
        ],
      };
    case "HTMLSlider":
      return {
        backgroundColor: "#f8f8f8",
        color: "#333333",
        head: "<h2 style='text-align: center; margin-bottom: 30px;'>Toyota Features</h2><p style='text-align: center; max-width: 800px; margin: 0 auto 40px auto;'>Explore the innovative features that make Toyota vehicles stand out.</p>",
        slides: [
          {
            id: "slide1",
            data: "<div style='padding: 20px; max-width: 900px; margin: 0 auto;'><h3 style='color: #E50000; text-align: center; margin-bottom: 20px;'>Toyota Safety Sense</h3><div style='display: flex; flex-wrap: wrap; justify-content: center; gap: 20px;'><div style='flex: 1; min-width: 200px; text-align: center; padding: 15px;'><div style='width: 70px; height: 70px; border-radius: 50%; background-color: #E50000; margin: 0 auto 15px auto; display: flex; align-items: center; justify-content: center; color: white; font-size: 24px;'>1</div><h4>Pre-Collision System</h4><p>Helps prevent or mitigate frontal collisions</p></div><div style='flex: 1; min-width: 200px; text-align: center; padding: 15px;'><div style='width: 70px; height: 70px; border-radius: 50%; background-color: #E50000; margin: 0 auto 15px auto; display: flex; align-items: center; justify-content: center; color: white; font-size: 24px;'>2</div><h4>Lane Departure Alert</h4><p>Helps you stay in your lane</p></div><div style='flex: 1; min-width: 200px; text-align: center; padding: 15px;'><div style='width: 70px; height: 70px; border-radius: 50%; background-color: #E50000; margin: 0 auto 15px auto; display: flex; align-items: center; justify-content: center; color: white; font-size: 24px;'>3</div><h4>Automatic High Beams</h4><p>Optimizes visibility during nighttime driving</p></div></div></div>",
          },
          {
            id: "slide2",
            data: "<div style='padding: 20px; max-width: 900px; margin: 0 auto;'><h3 style='color: #E50000; text-align: center; margin-bottom: 20px;'>Hybrid Technology</h3><div style='background-color: #f0f0f0; border-radius: 10px; padding: 30px; text-align: center;'><p style='margin-bottom: 30px;'>Toyota's hybrid technology combines a gasoline engine with electric motors to optimize fuel efficiency and reduce emissions.</p><div style='display: flex; flex-wrap: wrap; justify-content: space-around; gap: 15px;'><div style='flex: 1; min-width: 150px; background-color: white; padding: 20px; border-radius: 8px;'><h4 style='color: #E50000;'>Fuel Efficiency</h4><p>Up to 50% better fuel economy</p></div><div style='flex: 1; min-width: 150px; background-color: white; padding: 20px; border-radius: 8px;'><h4 style='color: #E50000;'>Lower Emissions</h4><p>Reduced CO2 output</p></div><div style='flex: 1; min-width: 150px; background-color: white; padding: 20px; border-radius: 8px;'><h4 style='color: #E50000;'>Reliability</h4><p>Proven technology since 1997</p></div></div></div></div>",
          },
        ],
      };
    case "ColorList":
      return {
        colorLists: [
          {
            id: "color1",
            name: "Blanco Perlado",
            iconPath: "color-white.png",
          },
          {
            id: "color2",
            name: "Rojo",
            iconPath: "color-red.png",
          },
          {
            id: "color3",
            name: "Azul",
            iconPath: "color-blue.png",
          },
        ],
        onSelect: () => console.log("Color selected"),
      };
    case "SpecList":
      return {
        details: {
          engine: "2.0L 4 cilindros",
          gears: "Automática 6 velocidades",
          doors: 4,
          passengers: 5,
          warranty: "3 años o 100,000 km",
          fuelType: "Gasolina",
        },
      };
    case "TestimonalCard":
      return {
        backgroundColor: "#000",
        title: "Sample Testimonial",
        description: "This is a sample testimonial from a satisfied customer.",
        imageSrc: "/images/placeholder.jpg",
        descriptionFontSize: { base: "16px", xl: "22px" },
      };
    case "RedCardInfo":
      return {
        title: "Sample Red Card Info",
        leftIcon: "/images/icons/placeholder.svg",
        rightIcon: "/images/icons/placeholder.svg",
        iconAltLeft: "Left Icon",
        iconAltRight: "Right Icon",
        titleFontSize: "22px",
      };
    case "QuoteBlock":
      return {
        quote: "This is a sample quote that demonstrates the component.",
        author: "John Doe",
        position: "CEO, Sample Company",
      };
    case "VideoPlayer":
      return {
        videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
        title: "Sample Video",
        description: "This is a sample video description.",
      };
    case "HybridMythsCarousel":
      return {
        title: "Hybrid Myths",
        description: "Common myths about hybrid vehicles debunked",
        myths: [
          {
            title: "Myth 1",
            description: "Hybrid vehicles are too expensive",
            truth:
              "While hybrid vehicles may have a higher initial cost, they often save money in the long run through fuel efficiency",
          },
          {
            title: "Myth 2",
            description: "Hybrid batteries need frequent replacement",
            truth:
              "Modern hybrid batteries are designed to last the lifetime of the vehicle with minimal maintenance",
          },
        ],
      };
    // Add more component-specific props as needed
    default:
      return defaultProps;
  }
};

// Component wrapper to add props
const ComponentWithProps = ({ Component }: { Component: ComponentType }) => {
  const props = getComponentProps(Component);

  try {
    // Special handling for ColorList due to fetchImageUrl dependency
    if (Component.name === "ColorList") {
      global.fetchImageUrl = mockFetchImageUrl;
    }

    return <Component {...props} />;
  } catch (error) {
    console.error(`Error rendering ${Component.name}:`, error);
    return <div>Error rendering {Component.name || "component"}</div>;
  }
};

// List of components to display, starting with the more stable ones
const components = [
  Banner,
  MainSlider,
  SliderInfo,
  // RedCardInfo,
  TestimonalCard,
  MaterialCards,
  SliderSection,
  ThreeImageGallery,
  FeaturedHybridComponent,
  SpecList,
  // More complex components
  HTMLSlider,
  // Remaining components - uncomment as you fix them
  ColorList, // Needs special handling for fetchImageUrl
  CatalogoPostventa,
  News,
  ToyotaWorld,
  Guarantees,
  CanWeHelpYou,
  HybridMythsCarousel,
  PreventiveCampaignsServicesBanner,
  MarketplaceUsedDialog,
  PreventiveCampaignsServicesSlider,
  SliderGallery,
  MantenimientoOficialBanner,
  CustomizableSlider,
  CampanaTapetesSlider,
  BannerSlider,
  CampanaTapetesBanner,
  ModelToolbar,
  DealershipSelector,
  VehicleNavigation,
  GeneralEspecs,
  ConcessionaireSearch,
  Tools,
  SafetyFeaturesGrid,
  EnvironmentalChallengeGrid,
  SafetyBanner,
  EnvironmentalInitiatives,
  VideoPlayer,
  QuoteBlock,
  BoutiqueTGRComponent,
  TgrFooterComponent,
  Quotes,
  FeaturedInfoBlock,
  AmplifyAccordion,
  FeatureComparisonTable,
  TwoCard,
  HeroCarrodeTussuenos,
  InformacionDestacada,
  ToyotaImageCollage,
  TextCard,
  VehiclesSwiper,
  WinnersCarousel,
  WinnersTabs,
  QuienesPuedenParticipar,
  PremiosSection,
  ComoParticipar,
  ThankYouPage,
];

export default function AllComponentsPage() {
  return (
    <div>
      <h1>All Components Page</h1>
      {components.map((Component, index) => (
        <div
          key={index}
          style={{ marginBottom: "50px", borderBottom: "2px solid #ccc" }}
        >
          <ComponentWithProps Component={Component} />
        </div>
      ))}
    </div>
  );
}
