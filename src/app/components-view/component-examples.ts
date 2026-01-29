/* eslint-disable @typescript-eslint/no-explicit-any */
import { ComponentData } from "./types";

export const componentExamples: Record<string, ComponentData> = {
  MainSlider: {
    component: "MainSlider",
    props: {
      slides: [
        {
          imageMobile: "/images/slider-mobile-1.jpg",
          imageDesktop: "/images/slider-desktop-1.jpg",
          title: "Welcome to Toyota",
          description: "Discover our latest models",
        },
        {
          imageMobile: "/images/slider-mobile-2.jpg",
          imageDesktop: "/images/slider-desktop-2.jpg",
          title: "Innovation",
          description: "Leading the future of mobility",
        },
      ],
    },
  },
  FeaturedHybridComponent: {
    component: "FeaturedHybridComponent",
    props: {
      title: "Hybrid Technology",
      subtitle: "Efficiency and Sustainability",
      image: "/images/gallery__image-1.png",
      list: [
        {
          title: "Fuel Efficiency",
          description: "Up to 50% better fuel economy",
        },
        {
          title: "Environmental Impact",
          description: "Reduced CO2 emissions",
        },
      ],
    },
  },
  Quotes: {
    component: "Quotes",
    props: {
      backgroundImage: "/images/quote-bg.jpg",
      quote: "Toyota's commitment to quality and innovation drives us forward.",
      author: "John Doe, Toyota Enthusiast",
    },
  },
  ThreeImageGallery: {
    component: "ThreeImageGallery",
    props: {
      images: [
        {
          url: "/images/gallery-1.jpg",
          altText: "Toyota Model Front View",
        },
        {
          url: "/images/gallery-2.jpg",
          altText: "Toyota Model Side View",
        },
        {
          url: "/images/gallery-3.jpg",
          altText: "Toyota Model Rear View",
        },
      ],
    },
  },
  SpecList: {
    component: "SpecList",
    props: {
      details: {
        engine: "2.5L Hybrid",
        gears: "8-speed automatic",
        doors: 4,
        passengers: 5,
        warranty: "5 years / 60,000 miles",
        fuelType: "Hybrid",
      },
    },
  },
  SliderInfo: {
    component: "SliderInfo",
    props: {
      backgroundColor: "#2A5B59",
      color: "#ffffff",
      head: {
        subtitle: "Manufacturing Process",
        title: "Step by Step",
      },
      slides: [
        {
          id: "1",
          data: {
            image: "/images/process-1.jpg",
            title: "Step 1",
            text: "Quality Check",
          },
        },
        {
          id: "2",
          data: {
            image: "/images/process-2.jpg",
            title: "Step 2",
            text: "Assembly",
          },
        },
      ],
    },
  },
  HTMLSlider: {
    component: "HTMLSlider",
    props: {
      backgroundColor: "#000000",
      color: "#ffffff",
      head: "<h2>Welcome to Toyota</h2>",
      slides: [
        {
          id: "1",
          data: "<div>Slide 1 Content</div>",
        },
        {
          id: "2",
          data: "<div>Slide 2 Content</div>",
        },
      ],
    },
  },
  CustomizableSlider: {
    component: "CustomizableSlider",
    props: {
      head: "<div>Custom Header</div>",
      slides: "<div>Custom Slides</div>",
    },
  },
  Banner: {
    component: "Banner",
    props: {
      // No props needed as it uses internal data
    },
  },
  BannerSlider: {
    component: "BannerSlider",
    props: {
      children: [
        {
          component: "Banner",
          props: {},
        },
        {
          component: "Banner",
          props: {},
        },
      ],
    },
  },
  News: {
    component: "News",
    props: {
      // No props needed as it uses internal data
    },
  },
  ToyotaWorld: {
    component: "ToyotaWorld",
    props: {
      // No props needed as it uses internal data
    },
  },
  VehicleNavigation: {
    component: "VehicleNavigation",
    props: {
      // No props needed as it uses internal state
    },
  },
  DealershipSelector: {
    component: "DealershipSelector",
    props: {
      // No props needed as it uses internal state
    },
  },
  ConcessionaireSearch: {
    component: "ConcessionaireSearch",
    props: {
      // No props needed as it uses internal state
    },
  },
  ColorList: {
    component: "ColorList",
    props: {
      colorLists: [
        {
          id: "1",
          name: "Red",
          iconPath: "/images/colors/red.jpg",
        },
        {
          id: "2",
          name: "Blue",
          iconPath: "/images/colors/blue.jpg",
        },
      ],
      onSelect: (item: any) => console.log("Selected color:", item),
    },
  },
  Button: {
    component: "Button",
    props: {
      type: "button",
      color: "red",
      size: "large",
      children: "Click Me",
      onClick: () => console.log("Button clicked"),
    },
  },
  SpecListItem: {
    component: "SpecListItem",
    props: {
      item: {
        img: {
          alt: "Engine Icon",
          src: "/images/icons/engine.svg",
        },
        title: "Engine",
        description: "2.5L Hybrid Engine",
      },
      isLast: false,
    },
  },
};
