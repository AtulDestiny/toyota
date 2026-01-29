/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Accordion, Flex, Image, Text, View } from "@aws-amplify/ui-react";
import Nouislider from "nouislider-react";
import { useEffect, useRef } from "react";
import { debounceTime, Subject } from "rxjs";

export type RangeItemProps = {
  title: string;
  rangeHelperText?: string;
  selectedRange: number[];
  priceRange: number[];
  setSelectedRange: (range: number[]) => void;
  selectedRangeStartText: string;
  selectedRangeEndText: string;
};
export const RangeItem: React.FC<RangeItemProps> = ({
  title,
  rangeHelperText,
  selectedRange,
  priceRange,
  setSelectedRange,
  selectedRangeStartText,
  selectedRangeEndText,
}) => {
  const sliderRef = useRef<any>(null);
  const sliderSubject = useRef(new Subject<number[]>()).current;

  useEffect(() => {
    const subscription = sliderSubject
      .pipe(debounceTime(200))
      .subscribe((value) => {
        setSelectedRange(value);
      });
    return () => {
      subscription.unsubscribe();
    };
  }, [sliderSubject, setSelectedRange]);

  const formatCurrency = (value: number) => `${value.toLocaleString("es-CL")}`;

  useEffect(() => {
    if (sliderRef.current) {
      sliderRef.current.noUiSlider.updateOptions({
        start: selectedRange,
      });
    }
  }, [selectedRange]);

  function onSlide(render: any, handle: any, value: number[]): void {
    sliderSubject.next([value[0], value[1]]);
  }

  return (
    <Accordion.Item
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
        padding={title === "Kilomentraje" ? "20px 0" : "30px 0"}
      >
        {title}
        <Accordion.Icon />
      </Accordion.Trigger>
      <Accordion.Content paddingInlineStart={"0px"} paddingBottom={30}>
        <View className={"rangeSlider"}>
          <View marginBottom={{ xl: "15px" }}>
            {rangeHelperText && (
              <Text
                fontSize={{ base: "14px", xl: "12px", xxl: "12px" }}
                fontFamily="var(--font-ToyotaType-Regular)"
                fontStyle={{ base: "normal" }}
                lineHeight={{ base: "100%", xl: "100%" }}
                fontWeight={400}
                letterSpacing={{ base: "0%", xl: "0px" }}
                margin={{ base: " 0 0 15px " }}
              >
                {rangeHelperText}
              </Text>
            )}
            <Flex
              gap={title === "Kilomentraje" ? "114px" : "1.6875rem"}
              padding={{ base: "", xl: "" }}
              fontSize={"sm"}
            >
              <Text
                fontFamily={{ base: "var(--font-toyotaDisplay)" }}
                lineHeight={{ base: "140%", xl: "140%" }}
                letterSpacing={{ base: "0px", xl: "0px" }}
                fontWeight={400}
                fontSize={"14px"}
              >
                {selectedRangeStartText}
              </Text>
              <Text
                fontFamily={{ base: "var(--font-toyotaDisplay)" }}
                lineHeight={{ base: "140%" }}
                letterSpacing={{ base: "0%" }}
              >
                {selectedRangeEndText}
              </Text>
            </Flex>
          </View>
          <View className={"range"} padding={{ base: "15px 6px", xl: "11px" }}
            onClick={(e) => e.stopPropagation()}
            onFocus={(e) => e.stopPropagation()}>
            <Nouislider
              ref={sliderRef}
              range={{ min: priceRange[0], max: priceRange[1] }}
              start={selectedRange}
              connect
              step={100000}
              onSlide={onSlide}
            />
          </View>

          <Flex
            position={"relative"}
            top={{ base: "-15px", xl: "0" }}
            gap={"9px"}
            marginTop={{ base: "11px", xl: "26px" }}
            alignItems={"center"}
          >
            <View>
              <Text
                className="range__title"
                fontSize={"0.875rem"}
                fontWeight={"400"}
                paddingBottom={"0.25rem"}
                fontFamily="var(--font-ToyotaType-Regular)"
                fontStyle={{ base: "normal" }}
                lineHeight={{ base: "100%" }}
                letterSpacing={{ base: "0px", xl: "0px" }}
                style={{ verticalAlign: "middle" }}
              >
                Desde
              </Text>
              <input
                type="text"
                value={formatCurrency(selectedRange[0])}
                className={"minInput"}
                onChange={(e) => {
                  const rawValue = parseInt(
                    e.target.value.replace(/\D/g, ""),
                    10
                  );
                  if (!isNaN(rawValue)) {
                    setSelectedRange([rawValue, selectedRange[1]]);
                  }
                }}
              />
            </View>

            <Image
              src={"/images/icons/range_divider.svg"}
              alt="Range"
              width="14px"
              marginTop={14}
            />

            <View>
              <Text
                className="range__title"
                fontSize={"0.875rem"}
                fontWeight={"400"}
                paddingBottom={"0.25rem"}
                fontFamily="var(--font-ToyotaType-Regular)"
                fontStyle={{ base: "normal" }}
                lineHeight={{ base: "100%" }}
                letterSpacing={{ base: "0px", xl: "0px" }}
                style={{ verticalAlign: "middle" }}
              >
                Hasta
              </Text>
              <input
                type="text"
                value={formatCurrency(selectedRange[1])}
                className={"maxInput"}
                onChange={(e) => {
                  const rawValue = parseInt(
                    e.target.value.replace(/\D/g, ""),
                    10
                  );
                  if (!isNaN(rawValue)) {
                    setSelectedRange([selectedRange[0], rawValue]);
                  }
                }}
              />
            </View>
          </Flex>
        </View>
      </Accordion.Content>
    </Accordion.Item>
  );
};
