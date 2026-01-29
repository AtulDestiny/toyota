"use client";
import React, { useState } from "react";
import { View, Text, Divider } from "@aws-amplify/ui-react";

type AccordionItemType = {
  title: string;
  content: string | JSX.Element;
};

type viewStyleType = {
  bgColor?: string;
  margin?: string;
  padding?: string;
  maxWidth?: string;
};

type AmplifyAccordionProps = {
  data: {
    sectionTitle: string;
    items: AccordionItemType[];
  }[];
  viewStyle?: viewStyleType;
};

const defaultData: AmplifyAccordionProps["data"] = [
  {
    sectionTitle: "FAQs",
    items: [
      {
        title: "What is Amplify UI?",
        content:
          "Amplify UI is a component library by AWS to build cloud-connected applications faster.",
      },
      {
        title: "Is Amplify UI customizable?",
        content:
          "Yes, you can style and extend Amplify UI components to match your design needs.",
      },
    ],
  },
];

const AmplifyAccordion: React.FC<AmplifyAccordionProps> = ({
  data = defaultData,
  viewStyle,
}) => {
  const [openIndex, setOpenIndex] = useState<string | null>(null);

  const toggleItem = (key: string) => {
    setOpenIndex((prev) => (prev === key ? null : key));
  };

  return (
    <View
      backgroundColor={viewStyle?.bgColor}
      as="section"
      maxWidth={viewStyle?.maxWidth}
      margin={viewStyle?.margin}
      padding={viewStyle?.padding}
    >
      {data.map((section, sectionIndex) => (
        <View key={sectionIndex} marginBottom="1.5rem">
          <Text
            as="h2"
            fontFamily="var(--font-toyotaDisplay)"
            fontSize="32px"
            fontWeight="400"
            marginBottom={{ base: "49px", xl: "86px" }}
            color="#000"
          >
            {section.sectionTitle}
          </Text>
          <Divider
            borderColor="#D9D9D9"
            margin={{ base: "20px 0 0", xl: "45px 0 0" }}
          />

          {section.items.map((item, itemIndex) => {
            const key = `${sectionIndex}-${itemIndex}`;
            const isOpen = openIndex === key;

            return (
              <View
                key={key}
                border="1px solid #D9D9D9"
                borderWidth="0 0 1px 0"
                overflow="hidden"
              >
                <View
                  padding={{ base: "10px 0", xl: "1rem 0" }}
                  display="flex"
                  style={{
                    alignItems: "center",
                    cursor: "pointer",
                    justifyContent: "space-between",
                  }}
                  onClick={() => toggleItem(key)}
                >
                  <Text
                    fontWeight="600"
                    fontSize={{ base: "14px", xl: "1.125rem" }}
                    color="#000"
                  >
                    {item.title}
                  </Text>
                  <Text fontSize="1.5rem" fontWeight="bold">
                    {isOpen ? "−" : "+"}
                  </Text>
                </View>
                {isOpen && (
                  <View padding="1rem 0">
                    <Text
                      fontSize="14px"
                      color="#58595B"
                      lineHeight={"140%"}
                      dangerouslySetInnerHTML={{ __html: item.content }}
                    />
                  </View>
                )}
              </View>
            );
          })}
        </View>
      ))}
    </View>
  );
};

export default AmplifyAccordion;
