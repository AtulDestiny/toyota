import { Option, Select, SelectTheme } from "@/components/Layout/Select/Select";
import { Accordion } from "@aws-amplify/ui-react";
import { useEffect, useState } from "react";

export type SelectItemProps = {
  title: string;
  placeHolder: string;
  elements: {
    label: string;
    value: string;
  }[];
  handleChange: (e: Option | null) => void;
  value?: Option | null;
};

export const SelectItem: React.FC<SelectItemProps> = ({
  title,
  placeHolder,
  elements,
  handleChange,
  value,
}) => {
  const [isMobile, setIsMobile] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);
  const [isXXL, setIsXXL] = useState(false);

  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < 768);
      setIsDesktop(window.innerWidth >= 1250);
      setIsXXL(window.innerWidth >= 1536);
    };

    checkIsMobile();
    window.addEventListener("resize", checkIsMobile);
    return () => window.removeEventListener("resize", checkIsMobile);
  }, []);

  useEffect(() => {
    // alert("value :" + value);
  }, [handleChange]);

  return (
    <Accordion.Item
      className="filter__item"
      value={title}
      borderRadius={{ base: "0" }}
      minWidth={{ base: "345px", xl: "", xxl: "378x" }}
      maxWidth={{ base: "345px", xl: "", xxl: "" }}
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
        padding={{ base: "15px 0px 16px ", xl: "30px 0px 20px" }}
        paddingBottom={{ base: "16px", xl: "" }}
        lineHeight={{ base: "100%", xl: "100%" }}
        letterSpacing={{ base: "0px", xl: "0px" }}
        style={{ verticalAlign: "middle" }}
      >
        {title}
        <Accordion.Icon />
      </Accordion.Trigger>
      <Accordion.Content
        paddingInlineStart={"0px"}
        paddingBottom={{ base: "40px", xl: "20px" }}
      >
        <Select
          options={elements}
          onSelect={handleChange}
          placeholder={placeHolder}
          selectedOption={value}
          theme={SelectTheme.Light}
          value={value}
          customControlStyles={
            isMobile
              ? {
                  maxWidth: "185px",
                  minHeight: "40px",
                  marginLeft: "5px",
                  fontWeight: 500,
                  lineHeight: "20px",
                  letterSpacing: "0.1px",
                  verticalAlign: "middle",
                  paddingLeft: "10px",
                }
              : isDesktop
                ? {
                    maxWidth: title === "Consecionario" ? "250px" : "183px",
                    minWidth: title === "Consecionario" && isXXL ? "250px" : "",
                    minHeight: "40px",
                    fontWeight: 500,
                    lineHeight: "22px",
                    letterSpacing: "0px",
                    verticalAlign: "middle",
                    paddingLeft: "12px",
                    fontSize: "14px",
                  }
                : {}
          }
        />
      </Accordion.Content>
    </Accordion.Item>
  );
};
