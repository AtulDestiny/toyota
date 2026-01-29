"use client";

import { Flex, Input, Label } from "@aws-amplify/ui-react";
import "@aws-amplify/ui-react/styles.css";
import { useState } from "react";

type TestDriveInputProps = {
  label: string;
  labelColor?: string;
  inputBackground?: string;
  inputBorder?: string;
  placeholder: string;
  id: string;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  errorMessage?: string;
  validatePattern?: RegExp;
};

export const TestDriveInput = ({
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
}: TestDriveInputProps) => {
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

export const TestDriveMobileInput = ({
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
}: TestDriveInputProps) => {
  const [inputValue, setInputValue] = useState(value);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value;

    // Prevent input if it doesn't match the numeric pattern
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
      <Flex alignItems="center" gap="0">
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
          maxLength={10}
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
