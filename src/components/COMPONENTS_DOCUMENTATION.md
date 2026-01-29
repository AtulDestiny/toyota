# Components Documentation

This document provides information about all available components and how to use them in the custom render system.

- [Main Components](#main-components)
- [Slider Components](#slider-components)
- [Banner Components](#banner-components)
- [Content Components](#content-components)
- [Navigation Components](#navigation-components)
- [Utility Components](#utility-components)

## Main Components

### MainSlider

**Purpose**: Main banner slider component with autoplay, navigation, and pagination

```typescript
{
  component: "MainSlider",
  props: {
    // No props required as it uses internal state and configuration
    // The component uses a predefined slides array with the following structure:
    slides: {
      imageMobile: string;  // Mobile image URL
      imageDesktop: string;  // Desktop image URL
      title: string;  // Slide title
      description: string;  // Slide description
    }[];
  }
}
```

### FeaturedHybridComponent

**Purpose**: Displays hybrid technology benefits with a list of features

```typescript
{
  component: "FeaturedHybridComponent",
  props: {
    title: string;          // Main title of the section
    subtitle: string;       // Subtitle of the section
    image: string;         // URL of the main image
    list: Array<{
      title: string;       // Title of each benefit
      description: string; // Description of each benefit
    }>
  }
}
```

### Quotes

**Purpose**: Displays testimonial quotes with background image

```typescript
{
  component: "Quotes",
  props: {
    backgroundImage: string; // URL of the background image
    quote: string;          // The testimonial quote text
    author: string;         // Name of the quote author
  }
}
```

### ThreeImageGallery

**Purpose**: Shows three images in a gallery layout

```typescript
{
  component: "ThreeImageGallery",
  props: {
    images: Array<{
      url: string;     // URL of the image
      altText: string; // Alt text for accessibility
    }>
  }
}
```

### SpecList

**Purpose**: Displays vehicle specifications

```typescript
{
  component: "SpecList",
  props: {
    details: {
      engine: string;      // Engine type
      gears: string;       // Transmission gears
      doors: number;       // Number of doors
      passengers: number;  // Passenger capacity
      warranty: string;    // Warranty information
      fuelType: string;    // Fuel type
    }
  }
}
```

### GeneralEspecs

**Purpose**: General specifications display

```typescript
{
  component: "GeneralEspecs",
  props: {
    // No props required as it uses internal data
    // The component includes:
    // - Title and subtitle
    // - Grid of specification cards:
    //   - Motor (Engine)
    //   - Rendimiento (Performance)
    //   - Transmisión (Transmission)
    //   - Suspensión (Suspension)
    //   - Drivetrain
    // - "View all specifications" button
  }
}
```

## Slider Components

### SliderInfo

**Purpose**: Displays a slider with information about manufacturing process steps

```typescript
{
  component: "SliderInfo",
  props: {
    backgroundColor: string;  // Background color of the slider
    color: string;  // Text color
    head: {
      subtitle: string;  // Subtitle text
      title: string;  // Main title text
    };
    slides: Array<{
      id: string;
      data: {
        image: string;  // Image source
        title: string;  // Slide title
        text: string;  // Slide description
      }
    }>;
  }
}
```

### SliderGallery

**Purpose**: Gallery slider for multiple images

```typescript
{
  component: "SliderGallery",
  props: {
    // Add props based on implementation
  }
}
```

### HTMLSlider

**Purpose**: A slider component that accepts HTML content for slides

```typescript
{
  component: "HTMLSlider",
  props: {
    backgroundColor: string;  // Background color of the slider container
    color: string;  // Text color
    head: string;  // HTML content for the header section
    slides: Array<{
      id: string;  // Unique identifier for the slide
      data: string;  // HTML content for the slide
    }>;
  }
}
```

### CustomizableSlider

**Purpose**: A flexible slider component that accepts custom React elements for header and slides

```typescript
{
  component: "CustomizableSlider",
  props: {
    head: JSX.Element;  // Custom React element for the header section
    slides: JSX.Element;  // Custom React element for the slides content
  }
}
```

### PreventiveCampaignsServicesSlider

**Purpose**: Slider for preventive campaigns and services

```typescript
{
  component: "PreventiveCampaignsServicesSlider",
  props: {
    // Add props based on implementation
  }
}
```

### CampanaTapetesSlider

**Purpose**: Slider for floor mat campaigns

```typescript
{
  component: "CampanaTapetesSlider",
  props: {
    // Add props based on implementation
  }
}
```

### SliderSection

**Purpose**: Section containing slider content

```typescript
{
  component: "SliderSection",
  props: {
    theme: SliderSectionTheme;  // Theme of the slider (Dark or Light)
    title: string;  // Section title
    description: string;  // Section description
    items: Array<{
      image: {
        src: string;  // Image source URL
        alt: string;  // Image alt text
      };
      title: string;  // Item title
      description: string;  // Item description
    }>;
  }
}
```

## Banner Components

### Banner

**Purpose**: Main banner component with vehicle information and features

```typescript
{
  component: "Banner",
  props: {
    // No props required - uses internal data structure
    // Contains:
    // - Vehicle image (mobile/desktop versions)
    // - Vehicle name
    // - Price information
    // - Feature list with icons and availability
  }
}
```

### BannerSlider

**Purpose**: Reusable banner slider component with navigation and pagination

```typescript
{
  component: "BannerSlider",
  props: {
    children: ReactNode;  // Child components to be rendered as slides
  }
}
```

### PreventiveCampaignsServicesBanner

**Purpose**: Banner for preventive campaigns and services

```typescript
{
  component: "PreventiveCampaignsServicesBanner",
  props: {
    slides: Array<{
      mobileImage: string;    // Image URL for mobile view
      desktopImage: string;   // Image URL for desktop view
      title: string;         // Title of the slide
      description: string;   // Description text
      buttonText: string;    // Text for the CTA button
      buttonLink: string;    // URL for the CTA button
    }>
  }
}
```

### MantenimientoOficialBanner

**Purpose**: Banner for official maintenance services

```typescript
{
  component: "MantenimientoOficialBanner",
  props: {
    // Add props based on implementation
  }
}
```

### CampanaTapetesBanner

**Purpose**: Banner for floor mat campaigns

```typescript
{
  component: "CampanaTapetesBanner",
  props: {
    // Add props based on implementation
  }
}
```

### CatalogoPostventaBanner

**Purpose**: Banner slider component for after-sales catalog section

```typescript
{
  component: "CatalogoPostventaBanner",
  props: {
    // No props required as it uses internal data
    // The component uses a predefined slides array with the following structure:
    slides: {
      imageMobile: string;  // Mobile image URL
      imageDesktop: string;  // Desktop image URL
      title: string;  // Slide title
      button: string;  // Button text
    }[];
  }
}
```

## Content Components

### News

**Purpose**: Grid of news articles with responsive layout

```typescript
{
  component: "News",
  props: {
    // No props required - uses internal data structure
    // Contains:
    // - Section title and subtitle
    // - Grid of news cards with:
    //   - Image
    //   - Date and reading time
    //   - Title
    //   - Description
    //   - Link
    // Responsive behavior:
    // - Mobile: 2 columns, 3 cards
    // - Desktop: 4 columns, 6 cards
    // - Highlight cards: First 2 on desktop, first 1 on mobile
  }
}
```

### ToyotaWorld

**Purpose**: Tabbed section displaying Toyota's history and information

```typescript
{
  component: "ToyotaWorld",
  props: {
    // No props required as it uses internal data
    // The component uses a predefined tabs array with the following structure:
    tabs: {
      label: string;  // Tab label text
      value: string;  // Tab value identifier
      content: string;  // Tab content
      isDisabled?: boolean;  // Whether the tab is disabled
    }[];
  }
}
```

### Guarantees

**Purpose**: Display of Toyota guarantees and services

```typescript
{
  component: "Guarantees",
  props: {
    // Add props based on implementation
  }
}
```

### CanIWeHelpYou

**Purpose**: Customer support and assistance section

````

### VehicleNavigation
**Purpose**: Navigation component for vehicle selection with dropdown functionality
```typescript
{
  component: "VehicleNavigation",
  props: {
    // No props required as it uses internal state
    // The component includes:
    // - A header with vehicle name and dropdown arrow
    // - A modal with vehicle selection options
    // - Navigation links for different vehicle sections
  }
}
````

### DealershipSelector

**Purpose**: Component for selecting and displaying dealership information with modals

```typescript
{
  component: "DealershipSelector",
  props: {
    // No props required as it uses internal state
    // The component includes:
    // - Dealership selection dropdowns
    // - Modal for displaying dealership details:
    //   - Title and subtitle
    //   - Description and location
    //   - Sales and maintenance schedules
    //   - Contact information
  }
}
```

### ConcessionaireSearch

**Purpose**: Search component for finding dealerships with location selection

```typescript
{
  component: "ConcessionaireSearch",
  props: {
    // No props required as it uses internal state
    // The component includes:
    // - Location selection dropdown
    // - Search functionality
    // - Responsive layout with:
    //   - Title and description
    //   - Search interface
    //   - Results display
  }
}
```

### Tools

**Purpose**: Collection of utility tools and search components

```typescript
{
  component: "Tools",
  props: {
    // No props required as it uses internal data
    // The component includes:
    // - ConcessionaireSearch: Dealer search functionality
    // Additional tools may be added in the future
  }
}
```

### ColorListItem

**Purpose**: Individual color option in the color selection list

```typescript
{
  component: "ColorListItem",
  props: {
    item: {
      id: string;    // Unique identifier for the color
      img: string;   // URL of the color image
      title: string; // Name of the color
    };
    onSelect: (item: {
      id: string;    // Selected color ID
      img: string;   // Selected color image URL
      title: string; // Selected color name
    }) => void;      // Callback function when clicked
    isSelected: boolean; // Whether this color is currently selected
  }
}
```

### Button

**Purpose**: Customizable button component with multiple styles and states

```typescript
{
  component: "Button",
  props: {
    type?: "button" | "submit" | "reset";  // Button type
    color?: "red" | "white" | "transparent" | "black" | "underlined" | "transparentBlack";  // Button color theme
    size?: "small" | "large";  // Button size
    children: React.ReactNode;  // Button content
    onClick?: () => void;  // Click handler
    disabled?: boolean;  // Whether the button is disabled
    className?: string;  // Additional CSS classes
    style?: React.CSSProperties;  // Inline styles
    isFullWidth?: boolean;  // Whether the button should take full width
    isLoading?: boolean;  // Whether the button is in loading state
    loadingText?: string;  // Text to show during loading state
    textColor?: "white" | "black";  // Text color override
    padding?: string | object;  // Custom padding
  }
}
```

### SpecListItem

**Purpose**: Individual specification item in the specifications list

```typescript
{
  component: "SpecListItem",
  props: {
    item: {
      img: {
        alt: string;  // Alt text for the icon
        src: string;  // URL of the icon image
      };
      title: string;  // Specification title
      description: string;  // Specification description
    };
    isLast?: boolean;  // Whether this is the last item in the list
  }
}
```
