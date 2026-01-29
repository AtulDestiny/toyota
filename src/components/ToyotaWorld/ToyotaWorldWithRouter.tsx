"use client";

import { Tabs, View, Text, Button, Link } from "@aws-amplify/ui-react";
import { usePathname, useRouter } from "next/navigation";
import { ReactNode } from "react";
import "@aws-amplify/ui-react/styles.css";
import "./ToyotaWorld.css";

interface Section {
  title?: string;
  titleStyle?: Record<string, any>;
  description?: string;
  descriptionStyle?: Record<string, any>;
  padding?: string;
}

interface TabItem {
  label: string;
  value: string;
  content?: ReactNode;
  isDisabled?: boolean;
  title?: string;
  description?: string;
  titleStyle?: Record<string, any>;
  descriptionStyle?: Record<string, any>;
  sections?: Section[];
  containerStyle?: Record<string, any>;
}

interface ToyotaWorldProps {
  basePath: string;
  items: TabItem[];
  defaultValue?: string;
  showTitle?: boolean;
  mainTitle?: string;
  mainSubtitle?: string;
  mainTitleStyle?: Record<string, any>;
  mainSubtitleStyle?: Record<string, any>;
  showFooter?: boolean;
  footerText?: string;
  footerButtonText?: string;
  footerButtonAction?: () => void;
  containerStyle?: Record<string, any>;
}

type TabKeys = "Tab 1" | "Tab 2" | "Tab 3" | "Tab 4";

export const ToyotaWorldWithRouter = ({
  items = [],
  basePath,
  defaultValue = "Tab 1",
  showTitle = false,
  mainTitle = "Mundo Toyota",
  mainSubtitle = "Descubre",
  mainTitleStyle = {
    fontSize: "xxxxl",
    lineHeight: "110%",
    paddingBottom: "4.8125rem",
    fontWeight: 400,
    fontFamily: "var(--font-ToyotaType-Regular)",
    letterSpacing: "-2%",
  },
  mainSubtitleStyle = {
    fontSize: { base: "sm", xl: "md" },
    fontWeight: 400,
    fontFamily: "var(--font-ToyotaType-Regular)",
  },
  showFooter = false,
  footerText = "Conoce la historia de Toyota en Colombia desde sus inicios.",
  footerButtonText = "Conoce más",
  footerButtonAction = () => {},
  containerStyle = {
    margin: { base: "51px 17px 58px", xl: "94px 0 105px" },
  },
}: ToyotaWorldProps) => {
  const router = useRouter();
  const pathname = usePathname();
  const currentSlug = pathname?.split("/").pop() || "inicio";

  console.log("basePath", basePath);

  const tabValueToSlug = Object.fromEntries(
    items.map((item) => [
      item.value as TabKeys,
      item.label.toLowerCase().replace(/\s+/g, "-"),
    ])
  ) as Record<TabKeys, string>;

  const slugToTabValue = Object.fromEntries(
    Object.entries(tabValueToSlug).map(([key, value]) => [value, key])
  ) as Record<string, TabKeys>;

  const handleTabChange = (value: string) => {
    const slug = tabValueToSlug[value as TabKeys] || "inicio";
    if (!basePath) {
      console.error("Tab change failed: basePath is undefined");
      return;
    }
    router.push(`/${basePath}/${slug}`);
  };

  return (
    <View>
      <View className="ToyotaWorldcontainer" {...containerStyle}>
        {showTitle && (
          <View>
            <Text color="inherit" {...mainSubtitleStyle}>
              {mainSubtitle}
            </Text>
            <Text color="inherit" {...mainTitleStyle}>
              {mainTitle}
            </Text>
          </View>
        )}

        <Tabs
          className="Toyotatabs"
          border="0"
          justifyContent={{ xl: "center" }}
          onValueChange={handleTabChange}
          defaultValue={slugToTabValue[currentSlug] || defaultValue}
          items={items.map((item) => ({
            label: item.label,
            value: item.value,
            content: (
              <Link>
                {item.sections && item.sections.length > 0 ? (
                  item.sections.map((section, idx) => (
                    <View
                      key={`section-${idx}`}
                      padding={section.padding || "0"}
                    >
                      {section.title && (
                        <Text
                          color="inherit"
                          {...(section.titleStyle ||
                            item.titleStyle || {
                              fontSize: "xl",
                              fontWeight: 500,
                              fontFamily: "var(--font-ToyotaType-Regular)",
                              marginBottom: "1rem",
                            })}
                        >
                          {section.title}
                        </Text>
                      )}
                      {section.description && (
                        <Text
                          color="inherit"
                          {...(section.descriptionStyle ||
                            item.descriptionStyle || {
                              fontSize: "md",
                              fontWeight: 400,
                              fontFamily: "var(--font-ToyotaType-Regular)",
                              marginBottom: "1.5rem",
                            })}
                        >
                          {section.description}
                        </Text>
                      )}
                    </View>
                  ))
                ) : (
                  <>
                    {item.title && (
                      <Text
                        color="inherit"
                        {...(item.titleStyle || {
                          fontSize: "xl",
                          fontWeight: 500,
                          fontFamily: "var(--font-ToyotaType-Regular)",
                          marginBottom: "1rem",
                        })}
                      >
                        {item.title}
                      </Text>
                    )}
                    {item.description && (
                      <Text
                        color="inherit"
                        {...(item.descriptionStyle || {
                          fontSize: "md",
                          fontWeight: 400,
                          fontFamily: "var(--font-ToyotaType-Regular)",
                          marginBottom: "1.5rem",
                        })}
                      >
                        {item.description}
                      </Text>
                    )}
                  </>
                )}
                {item.content}
              </Link>
            ),
            isDisabled: item.isDisabled,
          }))}
        />

        {showFooter && (
          <View>
            <Text>{footerText}</Text>
            <Button
              type="button"
              color="black"
              onClick={footerButtonAction}
              style={{
                width: "100%",
                maxWidth: "18.125rem",
                lineHeight: "3.125rem",
                padding: "0",
              }}
            >
              <Text
                as="span"
                fontSize="1rem"
                fontWeight="500"
                lineHeight="1.25rem"
              >
                {footerButtonText}
              </Text>
            </Button>
          </View>
        )}
      </View>
    </View>
  );
};
