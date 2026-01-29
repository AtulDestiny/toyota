import React, { useState, Children, cloneElement } from "react";

function renderSelectorChildren({
  children,
  selectedIndex,
  handleSelect,
}: {
  children: React.ReactNode;
  selectedIndex: number;
  handleSelect: (index: number) => void;
}) {
  return (
    <div>
      {Children.map(children, (child, index) => {
        if (!React.isValidElement(child)) return child;
        return cloneElement(child as React.ReactElement<any>, {
          isSelected: index === selectedIndex,
          onSelect: () => {
            handleSelect(index);
            if (typeof child.props.onSelect === "function") {
              child.props.onSelect();
            }
          },
        });
      })}
    </div>
  );
}

export const ManageableSelector = ({
  children,
  selectedIndex,
  handleSelect,
}: {
  children: React.ReactNode;
  selectedIndex: number;
  handleSelect: (index: number) => void;
}) => {
  return renderSelectorChildren({ children, selectedIndex, handleSelect });
};

export const Selector = ({ children }: { children: React.ReactNode }) => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const handleSelect = (index: number) => {
    setSelectedIndex(index);
  };
  return renderSelectorChildren({ children, selectedIndex, handleSelect });
};

export const OptionSelector = ({
  isSelected,
  onSelect,
  children,
}: {
  isSelected?: boolean;
  onSelect?: () => void;
  children?: React.ReactNode;
}) => {
  return (
    <div
      onClick={onSelect}
      style={{
        background: isSelected
          ? "linear-gradient(178.06deg, #E7EDF1 52.85%, #F4F7F9 98.36%)"
          : "#fff",
        border: isSelected ? "1px solid #373948" : "1px solid #E0E0E0",
        borderRadius: "8px",
        padding: "15px 20px",
        margin: "5px",
        cursor: "pointer",
      }}
    >
      {children}
    </div>
  );
};
