import { Icon } from "@aws-amplify/ui-react";

export const RightArrowIcon = ({ ...props }) => {
  return (
    <Icon position={"relative"} top={"5px"} fontSize={20} {...props}>
      <path
        d="M-6.5578e-07 1.9975L6.18084 8.5L-8.73135e-08 15.0025L1.90283 17L10 8.5L1.90283 -8.31755e-08L-6.5578e-07 1.9975Z"
        fill="black"
      />
    </Icon>
  );
};

export default RightArrowIcon;
