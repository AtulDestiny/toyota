import React from "react";
import { Card, Grid, Image, View, ViewProps } from "@aws-amplify/ui-react";

interface ImageCard {
  src: string;
  alt?: string;
}

interface ToyotaImageCollageProps {
  images?: ImageCard[];
  viewStyle?: Pick<ViewProps, "margin" | "padding" | "maxWidth">;
}

const ToyotaImageCollage: React.FC<ToyotaImageCollageProps> = ({
  viewStyle,
}) => {
  return (
    <View
      width="100%"
      maxWidth="1200px"
      margin="0 auto"
      padding="0"
      {...viewStyle}
    >
      <Grid templateColumns="1fr 1fr 1fr" templateRows="auto auto auto">
        <Card
          backgroundColor={"#000"}
          padding={0}
          style={{ gridColumn: "1", gridRow: "1" }}
        >
          <Image src="/images/TGR-img-gallary-01.jpg" alt="Historia TGR" />
        </Card>
        <Card
          backgroundColor={"#000"}
          padding={0}
          style={{ gridColumn: "2", gridRow: "1" }}
        >
          <Image src="/images/TGR-img-gallary-02.jpg" alt="Historia TGR" />
        </Card>
        <Card
          backgroundColor={"#000"}
          padding={0}
          style={{ gridColumn: "3", gridRow: "1" }}
        >
          <Image src="/images/TGR-img-gallary-03.jpg" alt="Historia TGR" />
        </Card>

        <Card
          backgroundColor={"#000"}
          padding={0}
          style={{ gridColumn: "1 / -1", gridRow: "2" }}
        >
          <Image src="/images/HGF_0026.JPG" alt="Historia TGR" />
        </Card>

        <Card
          backgroundColor={"#000"}
          padding={0}
          style={{ gridColumn: "1", gridRow: "3" }}
        >
          <Image src="/images/TGR-img-gallary-04.jpg" alt="Modelos TGR" />
        </Card>
        <Card
          backgroundColor={"#000"}
          padding={0}
          style={{ gridColumn: "2", gridRow: "3" }}
        >
          <Image src="/images/TGR-img-gallary-05.jpg" alt="Modelos TGR" />
        </Card>
        <Card
          backgroundColor={"#000"}
          padding={0}
          style={{ gridColumn: "3", gridRow: "3" }}
        >
          <Image src="/images/TGR-img-gallary-06.jpg" alt="Modelos TGR" />
        </Card>
      </Grid>
    </View>
  );
};

export default ToyotaImageCollage;
