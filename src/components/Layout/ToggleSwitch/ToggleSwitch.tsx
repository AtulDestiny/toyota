"use client";

import * as React from "react";
import "./ToggleSwitch.css";

interface ToggleSwitchProps extends React.HTMLAttributes<HTMLButtonElement> {
  checked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
  disabled?: boolean;
}

export function ToggleSwitch({
  checked = false,
  onCheckedChange,
  disabled = false,
  ...props
}: ToggleSwitchProps): JSX.Element {
  function handleClick(): void {
    if (!disabled) {
      onCheckedChange?.(!checked);
    }
  }

  function handleKeyDown(event: React.KeyboardEvent<HTMLButtonElement>): void {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      handleClick();
    }
  }

  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      data-state={checked ? "checked" : "unchecked"}
      data-disabled={disabled}
      disabled={disabled}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      className="toggle-switch"
      {...props}
    >
      <span className="toggle-switch__thumb"></span>
    </button>
  );
}
