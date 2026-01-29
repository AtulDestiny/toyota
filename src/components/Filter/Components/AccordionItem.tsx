import { Accordion, CheckboxField, Flex, Text } from "@aws-amplify/ui-react";

export type AccordionItemProps = {
  title: string;
  value: string;
  elements: {
    label: string;
    name: string;
    value: string;
    amount: number;
  }[];
  labelFontSize?: string; // New prop for font size
  labelFontWeight?: string; // New prop for font weight
};

export const AccordionItem: React.FC<{
  item: AccordionItemProps;
  filters: Record<string, string[]>;
  handleCheckboxChange: (
    category: string,
    value: string,
    checked: boolean
  ) => void;
  labelFontSize?: string; // Add to component props
  labelFontWeight?: string; // Add to component props
}> = ({
  item,
  filters,
  handleCheckboxChange,
  labelFontSize = "sm", // Default value
  labelFontWeight = "400", // Default value
}) => {
  return (
    <Accordion.Item
      className="filter__item"
      value={item.value}
      key={item.value}
      borderRadius={{ base: "0" }}
      style={{
        borderLeft: 0,
        borderRight: 0,
        borderBottom: 0,
        borderTop: "1px solid #D9D9D9",
      }}
    >
      <Accordion.Trigger
        fontSize={{ base: "md" }}
        fontFamily="var(--font-ToyotaType-Regular)"
        padding={"30px 0"}
      >
        {item.title}
        <Accordion.Icon />
      </Accordion.Trigger>
      <Accordion.Content paddingInlineStart={"0px"}>
        {item.elements.map(({ label, value: val, amount }) => (
          <Flex
            key={val}
            alignItems="center"
            gap=".375rem"
            marginBottom={".9375rem"}
          >
            <CheckboxField
              label={label}
              name={label}
              value={val}
              checked={filters[item.title]?.includes(val) || false}
              onChange={(e) =>
                handleCheckboxChange(item.title, val, e.target.checked)
              }
              fontSize={{ base: labelFontSize }} // Apply custom font size
              fontFamily="var(--font-toyotaDisplay)"
              fontWeight={labelFontWeight} // Apply custom font weight
              lineHeight={{ base: "140%", xl: "" }}
              style={{ verticalAlign: "middle" }}
            />
            <Text
              fontSize={{ base: labelFontSize }} // Apply custom font size
              fontFamily="var(--font-toyotaDisplay)"
              fontWeight={labelFontWeight} // Apply custom font weight
              lineHeight={{ base: "140%", xl: "" }}
              style={{ verticalAlign: "middle" }}
            >
              [{amount}]
            </Text>
          </Flex>
        ))}
      </Accordion.Content>
    </Accordion.Item>
  );
};
