import { Icon } from "@aws-amplify/ui-react";

export const LeftArrowIcon = ({ ...props }) => {
  return (
    <Icon fontSize={20} {...props}>
      <path
        d="M7.41016 1.41L2.83016 6L7.41016 10.59L6.00016 12L0.000156665 6L6.00016 -6.16331e-08L7.41016 1.41Z"
        fill="black"
      />
    </Icon>
  );
};

export default LeftArrowIcon;
