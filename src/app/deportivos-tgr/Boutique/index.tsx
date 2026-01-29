// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
"use client";

import React from "react";
import renderComponent from "@/utils/renderComponent";

interface ComponentData {
  component: string;
  props?: Record<string, unknown>;
  children?: (ComponentData | string)[];
}

const pageData: ComponentData[] = [
  {
    component: "AWSAmplifyComponent",
    props: {
      title: {
        text: "Lleva la pasión por TGR todos los días ",
        fontSize: { base: "32px", xl: "32px" },
        fontFamily: "var(--font-decimaMonoPro)",
        fontStyle: "normal",
        fontWeight: "500",
        maxWidth: {
          xl: "70%",
        },
        lineHeight: "130%",
        textAlign: { base: "center", xl: "center" },
        padding: { base: "73px 35px 0 35px", xl: "80px 0 0" },
        color: "#fff",
        margin: "0 auto",
      },
      viewstyle: {
        backgroundColor: "#000",
      },
    },
  },
  {
    component: "BoutiqueTGRCard",
  },
];

export function BoutiqueComponent() {
  return (
    <React.Fragment>
      {pageData.map((componentData, index) => (
        <React.Fragment key={index}>
          {renderComponent(componentData)}
        </React.Fragment>
      ))}
    </React.Fragment>
  );
}
