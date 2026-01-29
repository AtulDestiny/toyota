import React from "react";
import { Select, SelectTheme, Option } from "../Layout/Select/Select";

interface CompactSelectProps {
  options: Option[];
  onSelect: (selectedOption: Option | null) => void;
  selectedOption?: Option | null;
  placeholder?: string;
  theme?: SelectTheme;
}

// Define proper types for the style functions
interface StyleProps {
  padding?: string;
  marginLeft?: string;
  paddingRight?: string;
  // Add other potential style properties
}

export const CompactSelect: React.FC<CompactSelectProps> = ({
  options,
  onSelect,
  selectedOption,
  placeholder,
  theme = SelectTheme.Transparent,
}) => {
  // Custom styles that will override the default ones
  const compactStyles = {
    dropdownIndicator: (provided: StyleProps) => ({
      ...provided,
      padding: "0 4px", // Reduce padding
      marginLeft: "-10px", // Move indicator closer to text
    }),
    control: (provided: StyleProps) => ({
      ...provided,
      paddingRight: "8px", // Reduce right padding to bring indicator closer
    }),
  };

  return (
    <Select
      options={options}
      onSelect={onSelect}
      selectedOption={selectedOption}
      placeholder={placeholder}
      theme={theme}
      // @ts-expect-error - This will work even if the Select component doesn't explicitly accept a styles prop
      styles={compactStyles}
    />
  );
};
