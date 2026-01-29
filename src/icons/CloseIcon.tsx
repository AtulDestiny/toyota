import { Icon } from "@aws-amplify/ui-react";

export const CloseIcon = ({ ...props }) => {
  return (
    <Icon fontSize={20} {...props}>
      <path
        d="M1.01366 13.9842L0.128906 13.0994L5.81366 7.41492L0.128906 1.73042L1.01366 0.845673L6.69816 6.53042L12.3827 0.845673L13.2674 1.73042L7.58266 7.41492L13.2674 13.0994L12.3827 13.9842L6.69816 8.29942L1.01366 13.9842Z"
        fill="url(#paint0_linear_2633_802)"
      />
      <defs>
        <linearGradient
          id="paint0_linear_2633_802"
          x1="6.69816"
          y1="0.845673"
          x2="6.69816"
          y2="13.9842"
          gradientUnits="userSpaceOnUse"
        >
          <stop />
          <stop offset="1" />
        </linearGradient>
      </defs>
    </Icon>
  );
};

export default CloseIcon;
