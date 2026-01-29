// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck

"use client";

import React, { useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import renderComponent from "@/utils/renderComponent";
import { getBlogPostBySlug, getRelatedPosts, getBlogContent } from "../data";

export default function BlogDetailPage() {
  const params = useParams();
  const router = useRouter();
  const slug = typeof params.slug === "string" ? params.slug : "";

  // Get blog post data from our data files
  const blogPost = getBlogPostBySlug(slug);
  const relatedPosts = getRelatedPosts(slug);

  // Redirect if slug not found
  useEffect(() => {
    if (!blogPost && slug !== "") {
      console.log(`No se encontró información para el slug: ${slug}`);
      // router.push('/noticias');
    }
  }, [slug, router, blogPost]);

  // Show loading or not found state
  if (!blogPost) {
    return <div>Post not found</div>;
  }

  // Generate page data based on slug
  const pageData = [
    {
      component: "BlogDetailComponent",
      props: {
        slug: slug,
        title: blogPost.title,
        meta: blogPost.meta,
        mainImage: blogPost.imageUrl,
        content: {
          ...getBlogContent(slug),
          relatedPosts: relatedPosts,
        },
        handleShare: (network) => {
          const url = typeof window !== "undefined" ? window.location.href : "";
          const title = encodeURIComponent(blogPost.title);
          let shareUrl = "";

          switch (network) {
            case "facebook":
              shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;
              break;
            case "twitter":
              shareUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${title}`;
              break;
            case "linkedin":
              shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`;
              break;
            case "whatsapp":
              shareUrl = `https://api.whatsapp.com/send?text=${title}%20${encodeURIComponent(url)}`;
              break;
            default:
              return;
          }

          if (typeof window !== "undefined") {
            window.open(shareUrl, "_blank");
          }
        },
        handleRelatedPostClick: (postSlug) => {
          router.push(`/noticias/${postSlug}`);
        },
        router: router,
      },
    },
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
