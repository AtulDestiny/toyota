"use client";

import React, { useEffect } from "react";
import renderComponent from "@/utils/renderComponent";
import { useRouter } from "next/navigation";
import { BlogPost, getFeaturedPosts, getRegularPosts } from "./data";

interface ComponentData {
  component: string;
  props?: Record<string, unknown>;
  children?: (ComponentData | string)[];
}

export default function BlogPage() {
  const router = useRouter();

  const [selectedCategory, setSelectedCategory] = React.useState<
    string | string[] | null
  >(null);
  const [sortOption, setSortOption] = React.useState("recientes");

  const monthMap: Record<string, number> = {
    enero: 0,
    febrero: 1,
    marzo: 2,
    abril: 3,
    mayo: 4,
    junio: 5,
    julio: 6,
    agosto: 7,
    septiembre: 8,
    octubre: 9,
    noviembre: 10,
    diciembre: 11,
  };
  const isAll =
    selectedCategory === null ||
    selectedCategory === "todas" ||
    (Array.isArray(selectedCategory) &&
      (selectedCategory.length === 0 || selectedCategory.includes("todas")));

  const featuredPosts = isAll
    ? getFeaturedPosts()
    : getFeaturedPosts().filter((post) =>
        Array.isArray(selectedCategory)
          ? selectedCategory
              .map((cat) => cat.toLowerCase())
              .includes(post.category?.toLowerCase())
          : post.category?.toLowerCase() === selectedCategory?.toLowerCase()
      );

  const regularPosts = isAll
    ? getRegularPosts()
    : getRegularPosts().filter((post) =>
        Array.isArray(selectedCategory)
          ? selectedCategory
              .map((cat) => cat.toLowerCase())
              .includes(post.category?.toLowerCase())
          : post.category?.toLowerCase() === selectedCategory?.toLowerCase()
      );
  // Get data from our data files
  const selectedFilterArray = isAll
    ? []
    : Array.isArray(selectedCategory)
      ? selectedCategory
      : [selectedCategory];

  const handlePostClick = (slug: string) => {
    router.push(`/noticias/${slug}`);
  };

  const sortPosts = (posts: any[], option: string) => {
    const sorted = [...posts];

    switch (option) {
      case "a-z":
        return sorted.sort((a, b) => a.title.localeCompare(b.title));
      case "z-a":
        return sorted.sort((a, b) => b.title.localeCompare(a.title));
      case "antiguos":
        return sorted.sort(
          (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
        );
      case "recientes":
      default:
        return sorted.sort(
          (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
        );
    }
  };

  const sortedFeaturedPosts = sortPosts(featuredPosts, sortOption);
  const sortedRegularPosts = sortPosts(regularPosts, sortOption);
  
  function parseSpanishDate(dateStr: string): Date {
    const match = dateStr.match(/([a-z]+) de (\d{4})/i);
    if (!match) return new Date(0); // fallback to earliest date
    const month = monthMap[match[1].toLowerCase()];
    const year = parseInt(match[2]);
    return new Date(year, month);
  }

  function sortBlogPosts(posts: BlogPost[], sort: string): BlogPost[] {
    const sorted = [...posts].sort((a, b) => {
      const dateA = parseSpanishDate(a.date);
      const dateB = parseSpanishDate(b.date);
  
      if (sort === "recientes") {
        return dateB.getTime() - dateA.getTime(); // Newest first
      } else if (sort === "antiguos") {
        return dateA.getTime() - dateB.getTime(); // Oldest first
      }
  
      return 0; // fallback
    });
  
    return sorted;
  }
  // Datos para la página de Blog y Noticias
  const pageData: ComponentData[] = [
    // BlogHeader en lugar de MainSlider
    {
      component: "BlogHeader",
      props: {
        title: "Noticias",
        subtitle:
          "Todas las historias, innovaciones, noticias y novedades de Toyota en Colombia",
        mainImage: "/images/cabin.svg",
        images: [
          {
            src: "/images/circle1.svg",
            alt: "Toyota Image 1",
            size: { base: "41px", medium: "60px", xl: "60px" },
            position: {
              left: { base: "6%", medium: "15%", xl: "20%" },
              top: { base: "35%", medium: "16%", xl: "18%" },
            },
          },
          {
            src: "/images/land.svg",
            alt: "Toyota Image 2",
            size: { base: "77px", medium: "60px", xl: "112px" },
            position: {
              left: { base: "10%", medium: "15%", xl: "12%" },
              bottom: { base: "16%", medium: "16%", xl: "28%" },
            },
          },
          {
            src: "/images/circle3.svg",
            alt: "Toyota Image 3",
            size: { base: "41px", medium: "60px", xl: "60px" },
            position: {
              right: { base: "6.5%", medium: "15%", xl: "23%" },
              top: { base: "25%", medium: "16%", xl: "14%" },
            },
          },
          {
            src: "/images/circle4.svg",
            alt: "Toyota Image 4",
            size: { base: "70px", medium: "60px", xl: "102px" },
            position: {
              right: { base: "5%", medium: "15%", xl: "16%" },
              bottom: { base: "7%", medium: "16%", xl: "40%" },
            },
          },
        ],
        labels: [
          {
            text: "Descubre Toyota Colombia",
            position: {
              left: { base: "-1%", medium: "8%", xl: "11%" },
              top: { base: "21%", medium: "45%", xl: "40%" },
            },
            width: { base: "139px" },
            light: false,
            style: {
              fontSize: { base: "9px", xl: "14px" },
              fontFamily: "var(--font-ToyotaType-Regular)",
              fontWeight: "400",
              lineHeight: "100%",
              letterSpacing: "0%",
              textAlign: "center",
              width: { base: "139px", xl: "203.17px" },
              height: { base: "20px", xl: "29.23px" },
            },
          },
          {
            text: "Toyota se adelanta al futuro",
            position: {
              right: { base: "18%", medium: "8%", xl: "10%" },
              bottom: { base: "22%", medium: "20%", xl: "25%" },
            },
            light: true,
            style: {
              fontSize: { base: "9px", xl: "14px" },
              fontFamily: "var(--font-ToyotaType-Regular)",
              fontWeight: "400",
              lineHeight: "100%",
              letterSpacing: "0%",
              textAlign: "center",
              width: { base: "160px", xl: "233.87px" },
              height: { base: "20px", xl: "29.23px" },
            },
          },
        ],
        titleStyle: {
          fontSize: { base: "32px", medium: "46px", xl: "56px" },
          fontWeight: "400",
          fontFamily: "var(--font-ToyotaType-Regular)",
          textAlign: "center",
          lineHeight: {
            base: "1.2",
            medium: "110.00000000000001%",
            xl: "110.00000000000001%",
          },
          margin: { base: ".5rem 0 .75rem", xl: "1rem 0 1.5rem" },
          letterspacing: { base: "0.02em", medium: "-2%", xl: "-2%" },
          color: "#000",
        },
        subtitleStyle: {
          fontSize: { base: "16px", medium: "18px", xl: "22px" },
          fontWeight: "400",
          fontFamily: "var(--font-ToyotaType-Regular)",
          textAlign: "center",
          lineHeight: { base: "1.5", medium: "100%", xl: "100%" },
          margin: { base: "0", xl: "0 auto 1rem" },
          maxWidth: { base: "100%", xl: "800px" },
          letterspacing: { base: "0", medium: "0", xl: "0" },

          color: "#333",
        },
        containerStyle: {
          padding: { base: "1rem", xl: "2rem 0" },
          backgroundColor: "#e7edf1",
          width: "100%",
          height: { base: "540px", xl: "auto" },
        },
        mainImageStyle: {
          width: { base: "254.22px", medium: "50%", xl: "50%" },
          height: { base: "143px", medium: "80%", xl: "90%" },
          borderRadius: { base: "71.5px", medium: "50px", xl: "60px" },
        },
      },
    },

    // Filter Bar
    {
      component: "BlogFilterBar",
      props: {
        title: "Selecciona el tema de tu interés",
        onFilterClick: (category: string | string[]) =>
          setSelectedCategory(category),
        sortOptions: ["Más recientes", "Más antiguos", "Alfabético"],
        onSortChange: (option: string) => setSortOption(option),
      },
    },

    // Featured Posts - Now using data from files
    {
      component: "BlogFeatured",
      props: {
        posts: sortedFeaturedPosts,
        selectedFilters: selectedFilterArray,
        onPostClick: handlePostClick,
      },
    },

    // Blog Posts Grid - Now using data from files
    {
      component: "BlogPostsGrid",
      props: {
        posts: sortedRegularPosts,
        onPostClick: handlePostClick,
        onLoadMore: () => console.log("Load more clicked"),
        showLoadMore: false,
      },
    },

    // Boletín de suscripción
    // {
    //   component: "NewsletterSubscription",
    //   props: {
    //     title: "Suscríbete a nuestro boletín",
    //     description:
    //       "Recibe las últimas noticias y actualizaciones de Toyota directamente en tu correo electrónico.",
    //     buttonText: "Suscribirse",
    //     placeholderText: "Tu correo electrónico",
    //   },
    // },
  ];

  return (
    <div>
      {pageData.map((componentData, index) => (
        <React.Fragment key={index}>
          {renderComponent(componentData)}
        </React.Fragment>
      ))}
    </div>
  );
}
