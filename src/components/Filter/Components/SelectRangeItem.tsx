import { Option, Select, SelectTheme } from "@/components/Layout/Select/Select";
import { Accordion, Flex, View } from "@aws-amplify/ui-react";
export type SelectRangeItemSelectProps = {
  placeHolder: string;
  elements: {
    label: string;
    value: string;
  }[];
  handleChange: (e: Option | null) => void;
  value?: Option | null;
};
export type SelectRangeItemProps = {
  title: string;
  first: SelectRangeItemSelectProps;
  second: SelectRangeItemSelectProps;
};

export const SelectRangeItem: React.FC<SelectRangeItemProps> = ({
  title,
  first,
  second,
}) => {
  return (
    <Accordion.Item
      className="filter__item"
      value={title}
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
        paddingBottom={20}
      >
        {title}
        <Accordion.Icon />
      </Accordion.Trigger>
      <Accordion.Content paddingInlineStart={"0px"} paddingBottom={25}>
        <Flex>
          <View
            className="select-range"
            minWidth={{ base: "164px", xl: "", xxl: "164px" }}
            minHeight={{ base: "40px", xl: "40px", xxl: "40px" }}
          >
            <Select
              options={first.elements}
              onSelect={first.handleChange}
              placeholder={first.placeHolder}
              theme={SelectTheme.Light}
              value={first.value}
              selectedOption={first.value}
            />
          </View>
          <View
            className="select-range"
            minWidth={{ base: "164px", xl: "", xxl: "164px" }}
            minHeight={{ base: "40px", xl: "40px", xxl: "40px" }}
          >
            <Select
              options={second.elements}
              onSelect={second.handleChange}
              placeholder={second.placeHolder}
              theme={SelectTheme.Light}
              value={second.value}
              selectedOption={second.value}
            />
          </View>
        </Flex>
      </Accordion.Content>
    </Accordion.Item>
  );
};
