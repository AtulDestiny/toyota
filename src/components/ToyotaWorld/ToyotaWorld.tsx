// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import { Tabs, View, Text, Button } from "@aws-amplify/ui-react";
import "@aws-amplify/ui-react/styles.css";
import "./ToyotaWorld.css";
import { useRouter } from "next/navigation"; // For App Router

export const ToyotaWorld = ({
  // Updated items structure to support multiple titles and descriptions with customizable styling
  items = [
    {
      label: "Tab 1",
      value: "Tab 1",
      // New structure for content sections
      sections: [
        {
          title: "Section Title 1",
          titleStyle: {
            fontSize: "xl",
            fontWeight: 500,
            marginBottom: "1rem",
            fontFamily: "var(--font-ToyotaType-Regular)",
          },
          description: "Section description text goes here",
          descriptionStyle: {
            fontSize: "md",
            fontWeight: 400,
            marginBottom: "1.5rem",
            fontFamily: "var(--font-ToyotaType-Regular)",
          },
          padding: "1rem 0",
        },
      ],
      // Legacy support for simple content
      content: "",
      // Legacy support for single title/description
      title: "",
      description: "",
      titleStyle: {},
      descriptionStyle: {},
    },
    {
      label: "Tab 2",
      value: "Tab 2",
      sections: [
        {
          title: "Section Title 1",
          description: "Section description text goes here",
        },
      ],
      content: "",
      title: "",
      description: "",
    },
  ],
  isRedirectLink = false,
  baseUrl = '',
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
  margin,
  footerButtonAction = () => {},
  containerStyle = {
    margin: { base: "51px 15px 58px", xl: "75px 0 105px" },
  },
}) => {
  const router = useRouter();

  const handleTabChange = (value: string) => {
    if (isRedirectLink && baseUrl) {
      router.push(`/${baseUrl}/${value}`);
    }
  };

  return (
    <>
      <View>
        <View
          className="ToyotaWorldcontainer"
          {...containerStyle}
          margin={margin || containerStyle.margin}
        >
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
            className="ToyotaWorldtabs"
            border={"0"}
            justifyContent={{ xl: "center" }}
            onValueChange={handleTabChange}
            defaultValue={defaultValue || "Tab 1"}
            items={items.map((item) => ({
              label: item.label,
              value: item.value,
              content: (
                <View>
                  {/* Render sections if available */}
                  {item.sections && item.sections.length > 0 ? (
                    item.sections.map((section, idx) => (
                      <View key={idx} padding={section.padding || "0"}>
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

                        {section.image && (
                          <img
                            src={section.image.src}
                            alt={section.image.alt}
                            style={{
                              width: section.image.width || "100%",
                              maxWidth: section.image.maxWidth || "553px",
                              marginTop: section.image.marginTop || "1rem",
                              marginLeft: "auto",
                              marginRight: "auto",
                            }}
                          />
                        )}
                      </View>
                    ))
                  ) : (
                    // Legacy support for single title/description
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
                  {/* Always render content if provided */}
                  {item.content}
                </View>
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
                  fontSize={"1rem"}
                  fontWeight={"500"}
                  lineHeight={"1.25rem"}
                >
                  {footerButtonText}
                </Text>
              </Button>
            </View>
          )}
        </View>
      </View>
    </>
  );
};
