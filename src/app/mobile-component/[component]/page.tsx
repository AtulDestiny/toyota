"use client";

import { componentExamples } from "@/app/components-view/component-examples";
import renderComponent from "@/utils/renderComponent";
import React from "react";
import { useParams } from "next/navigation";

export default function MobileComponentPage() {
  const params = useParams();
  const componentName = params.component as string;
  const component = componentExamples[componentName];

  return (
    <div className="mobile-viewport">
      {component && renderComponent(component)}
    </div>
  );
}
