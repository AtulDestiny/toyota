import { View, Text, Image, useBreakpointValue } from "@aws-amplify/ui-react";
import "./InformacionDestacada.css";

interface DreamCarBoxProps {
  icon?: string;
  title?: string;
  backgroundColor?: string;
  blueBg?: string;
}

export function InformacionDestacada({
  icon = "/svgs/small-car-icon.svg",
  // title = "Dale vida a tu imaginación con el carro de tus sueños de Toyota",
  backgroundColor = "#A7D8F0",
  blueBg = "/images/blue-shape-bg.svg",
}: DreamCarBoxProps): JSX.Element {
  // const paddingResponsive = useBreakpointValue({
  //   base: "2rem 1rem",
  //   medium: "3rem 2rem",
  //   xl: "4rem 3rem",
  // });

  // const fontSizeResponsive = useBreakpointValue({
  //   base: "24px",
  //   medium: "28px",
  //   xl: "32px",
  // });

  const rotationResponsive = useBreakpointValue({
    base: "0deg",
    medium: "-1deg",
    xl: "-2deg",
  });

  return (
    <View
      className="blue-shape"
      backgroundImage={blueBg}
      position="relative"
      // maxWidth="800px"
      margin={{ base: "-26px auto 0", medium: "-42px auto 0" }}
      // width={{
      //   base: "90%",
      //   medium: "50%",
      //   xl: "26%",
      // }}
      // paddingTop={"18px"}
    >
      {/* Rotated background */}
      {/* <View
        backgroundColor={backgroundColor}
        borderRadius="30px"
        height="100%"
        width="100%"
        transform={`rotate(${rotationResponsive})`}
        position="absolute"
        top="0"
        left="0"
        right="0"
        bottom="0"
        border={"10px solid white"}
        // zIndex={0}
      /> */}

      {/* Content above rotated background */}
      <View
        // padding={paddingResponsive}
        textAlign="center"
        position="relative"
        // zIndex={1}
      >
        {/* Icon */}
        <View marginBottom={{ base: "5ppx", medium: "1rem" }}>
          <Image
            src={icon}
            alt="Car Icon"
            width={{
              base: "20px",
              medium: "40px",
              xl: "48px",
            }}
            margin="0 auto"
          />
        </View>

        {/* Title */}
        <Text
          padding={{
            base: "0 0 35px 0",
            medium: "0 0 20px 0",
            xl: "0 0 20px 0",
          }}
          //   fontSize={fontSizeResponsive}
          fontWeight="700"
          fontFamily="var(--font-toyotaDisplay)"
          fontSize={{ base: "22px", medium: "26px" }}
          lineHeight={{ base: "28px", medium: "130%" }}
          color="#05264E"
          margin={"0 auto"}
        >
          Dale vida a tu<br></br> imaginación con el carro<br></br> de tus
          sueños de Toyota
        </Text>
      </View>
    </View>
  );
}
