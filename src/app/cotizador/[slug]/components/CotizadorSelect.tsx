"use client";

import { Flex, Label } from "@aws-amplify/ui-react";
import "@aws-amplify/ui-react/styles.css";
import { useEffect, useState } from "react";
import styles from "./CotizadorSelect.module.scss";

type CotizadorSelectProps = {
  label: string;
  id: string;
  options: { value: string; label: string }[];
  value: string;
  onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  errorMessage?: string;
  placeholder?: string;
  labelColor?: string;
  selectWidth?: string;
};

export const CotizadorSelect = ({
  labelColor,
  label,
  id,
  options,
  value,
  onChange,
  errorMessage,
  selectWidth,
  placeholder = "Seleccione un documento",
}: CotizadorSelectProps) => {
  const [selectedValue, setSelectedValue] = useState(value);

  useEffect(() => {
    if (value !== selectedValue) {
      setSelectedValue(value);
    }
  }, [value]);

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedValue(event.target.value);
    onChange(event);
  };

  return (
    <Flex direction="column" gap={{ base: "8px", xl: "10px", xxl: "13px" }}>
      <Label
        htmlFor={id}
        color={labelColor ? labelColor : "#ffffff"}
        fontSize={{ base: "14px", xl: "18px" }}
        fontWeight={400}
        fontFamily="var(--font-ToyotaType-Regular)"
        lineHeight={"100%"}
        letterSpacing={"0"}
      >
        {label}
      </Label>
      <select
        id={id}
        name={id}
        value={selectedValue}
        onChange={handleChange}
        style={{
          backgroundColor: "#fff",
          borderRadius: "80px",
          border: "none",
          color: "#58595B",
          fontSize: "14px",
          fontFamily: "var(--font-ToyotaDisplay)",
          padding: "10px 23px",
          appearance: "none",
          backgroundImage: "url('/images/icons/arrow--down--grey.svg')",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "right 18px center",
          outline: "none",
          maxWidth: selectWidth ? selectWidth : "444px",
        }}
        className={styles.selectBox}
      >
        <option
          value=""
          disabled
          hidden
          // style={{
          //   fontFamily: "var(--font-ToyotaDisplay)",
          //   fontWeight: 400,
          //   fontStyle: "normal",
          //   fontSize: "14px",
          //   lineHeight: "140%",
          //   letterSpacing: "0",
          //   color: "#58595B",
          // }}

          // className={styles.selectBox}
        >
          {placeholder}
        </option>

        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {errorMessage && (
        <span
          style={{
            color: "red",
            fontSize: "12px",
            fontFamily: "var(--font-ToyotaDisplay)",
            marginTop: "4px",
          }}
        >
          {errorMessage}
        </span>
      )}
    </Flex>
  );
};
