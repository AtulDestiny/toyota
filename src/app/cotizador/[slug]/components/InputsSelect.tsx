"use client";

import { Flex, Input, Label } from "@aws-amplify/ui-react";
import "@aws-amplify/ui-react/styles.css";
import { useState } from "react";

type CotizadorInputProps = {
  label: string;
  labelColor?: string;
  inputBackground?: string;
  inputBorder?: string;
  placeholder: string;
  id: string;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  validatePattern?: RegExp;
  errorMessage?: string;
};

export const CotizadorInput = ({
  label,
  labelColor,
  inputBackground,
  inputBorder,
  placeholder,
  id,
  value,
  onChange,
  errorMessage,
  validatePattern,
}: CotizadorInputProps) => {
  const [inputValue, setInputValue] = useState(value);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value;
    if (validatePattern && !validatePattern.test(newValue) && newValue !== "") {
      return;
    }

    setInputValue(event.target.value);
    onChange(event);
  };

  return (
    <Flex direction="column" gap={{ base: "8px", xl: "8px" }}>
      <Label
        htmlFor={id}
        color={labelColor ?? "#ffffff"}
        fontSize={{ base: "14px", xl: "18px" }}
        fontFamily="var(--font-ToyotaType-Regular)"
      >
        {label}
      </Label>
      <Input
        backgroundColor={inputBackground ?? "#fff"}
        borderRadius={"80px"}
        border={inputBorder ?? "none"}
        id={id}
        name={id}
        placeholder={placeholder}
        color="#58595B"
        fontSize={{ base: "12px", xl: "14px" }}
        fontFamily="var(--font-ToyotaDisplay)"
        padding={{ base: "12px 23px", xl: "10px 23px" }}
        value={inputValue}
        onChange={handleChange}
      />
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

export const CotizadorMobileInput = ({
  label,
  labelColor,
  inputBackground,
  inputBorder,
  placeholder,
  id,
  value,
  onChange,
  errorMessage,
  validatePattern,
}: CotizadorInputProps) => {
  const [inputValue, setInputValue] = useState(value);
  const [code, setCode] = useState("+57");

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value;

    // Prevent input if it doesn't match the numeric pattern
    if (validatePattern && !validatePattern.test(newValue) && newValue !== "") {
      return;
    }
    setInputValue(event.target.value);
    onChange(event);
  };

  const handleCodeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setCode(event.target.value);
  };

  return (
    <Flex direction="column" gap={{ base: "8px", xl: "8px" }}>
      <Label
        htmlFor={id}
        color={labelColor ?? "#ffffff"}
        fontSize={{ base: "14px", xl: "18px" }}
        fontFamily="var(--font-ToyotaType-Regular)"
      >
        {label}
      </Label>
      <Flex alignItems="center" gap="8px">
        <select
          style={{
            backgroundColor: inputBackground ?? "#fff",
            borderRadius: "80px",
            border: inputBorder ?? "none",
            color: "#58595B",
            fontSize: "14px",
            fontFamily: "var(--font-ToyotaDisplay)",
            padding: "12px 16px",
            appearance: "none",
            outline: "none",
          }}
          onChange={handleCodeChange}
        >
          <option value="+57">🇨🇴 +57</option>
          <option value="+1">🇺🇸 +1</option>
          <option value="+44">🇬🇧 +44</option>
          <option value="+91">🇮🇳 +91</option>
        </select>
        <Input
          type="tel"
          backgroundColor={"#fff"}
          borderRadius={"80px"}
          border={inputBorder ?? "none"}
          id={id}
          name={id}
          placeholder={placeholder}
          color="#58595B"
          fontSize={{ base: "12px", xl: "14px" }}
          fontFamily="var(--font-ToyotaDisplay)"
          padding={{ base: "12px 23px", xl: "10px 23px" }}
          value={inputValue}
          onChange={handleChange}
        />
      </Flex>
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
