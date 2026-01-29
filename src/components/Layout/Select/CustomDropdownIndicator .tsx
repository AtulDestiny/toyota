import { Image } from "@aws-amplify/ui-react";
import { components } from "react-select";

export const CustomDropdownIndicator = (props: any) => {
  return (
    <components.DropdownIndicator {...props}>
      <Image
        src="/svgs/arrow--black-short.svg"
        alt="Arrow Black Short"
        height="10px"
        width="20px"
        style={{ transform: "rotate(90deg)" }}
      />
    </components.DropdownIndicator>
  );
};
