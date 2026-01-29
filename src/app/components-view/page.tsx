/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useEffect, useState } from "react";
import { componentExamples } from "./component-examples";
import { ComponentSection } from "./types";
import "./component-view.css";

export default function ComponentsView() {
  const [sections, setSections] = useState<ComponentSection[]>([]);

  useEffect(() => {
    // Fetch and parse the documentation file
    fetch("/COMPONENTS_DOCUMENTATION.md")
      .then((response) => response.text())
      .then((text) => {
        const sections = parseDocumentation(text);
        setSections(sections);
      })
      .catch((error) => console.error("Error loading documentation:", error));
  }, []);

  const parseDocumentation = (markdown: string): ComponentSection[] => {
    const sections: ComponentSection[] = [];
    let currentSection: ComponentSection | null = null;
    let currentComponent: {
      name: string;
      purpose: string;
      props: string;
      example?: any;
    } | null = null;

    const lines = markdown.split("\n");
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];

      // Check for section headers (##)
      if (line.startsWith("## ")) {
        if (currentSection) {
          sections.push(currentSection);
        }
        currentSection = {
          title: line.replace("## ", ""),
          components: [],
        };
        continue;
      }

      // Check for component headers (###)
      if (line.startsWith("### ")) {
        if (currentComponent) {
          currentSection?.components.push(currentComponent);
        }
        const componentName = line.replace("### ", "");
        currentComponent = {
          name: componentName,
          purpose: "",
          props: "",
          example: componentExamples[componentName],
        };
        continue;
      }

      // Parse component details
      if (currentComponent) {
        if (line.startsWith("**Purpose**: ")) {
          currentComponent.purpose = line.replace("**Purpose**: ", "");
        } else if (line.startsWith("```typescript")) {
          let propsText = "";
          i++; // Skip the opening ```typescript
          while (i < lines.length && !lines[i].startsWith("```")) {
            propsText += lines[i] + "\n";
            i++;
          }
          currentComponent.props = propsText.trim();
        }
      }
    }

    // Add the last component and section
    if (currentComponent && currentSection) {
      currentSection.components.push(currentComponent);
      sections.push(currentSection);
    }

    return sections;
  };

  return (
    <div className="p-8">
      <h1
        className="text-3xl font-bold mb-8"
        style={{ fontSize: 40, fontWeight: "bold" }}
      >
        Component Library
      </h1>

      {sections.map((section, sectionIndex) => (
        <div key={sectionIndex} className="mb-12">
          {section.components && (
            <>
              <div className="gap-8">
                {section.components.map((component, componentIndex) => (
                  <div
                    key={componentIndex}
                    className="component border rounded-lg p-6"
                  >
                    <div
                      className="gap-6"
                      style={{
                        display: "grid",
                        gridTemplateColumns: "380px auto",
                        marginTop: 20,
                      }}
                    >
                      {/* Preview */}
                      <div className="border rounded p-4 bg-gray-50 flex justify-center">
                        {component.example && (
                          <iframe
                            src={`/mobile-component/${component.name}`}
                            className="mobile-frame"
                            style={{
                              width: "375px",
                              height: "667px",
                              border: "12px solid #1a1a1a",
                              borderRadius: "36px",
                              overflow: "hidden",
                              transform: "scale(0.9)",
                              backgroundColor: "white",
                            }}
                            sandbox="allow-scripts allow-same-origin"
                            loading="lazy"
                            allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
                          />
                        )}
                      </div>

                      {/* Code */}
                      <div
                        className="border rounded p-4 "
                        style={{ padding: 20 }}
                      >
                        <h3
                          className="text-xl font-semibold mb-2"
                          style={{ fontSize: 20, fontWeight: "bold" }}
                        >
                          {component.name}
                        </h3>
                        <p
                          className="text-gray-600 mb-4"
                          style={{ marginBottom: 20 }}
                        >
                          {component.purpose}
                        </p>

                        <pre className="props overflow-x-auto bg-gray-900 text-white">
                          <code>{component.props}</code>
                        </pre>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      ))}
    </div>
  );
}
