"use client";

import React, { useEffect, useState } from "react";
import type { VehicleFormProps } from "../../types";
import styles from "./VehicleForm.module.scss";
import { Select } from "@/components/Layout/Select/Select";

export enum SelectTheme {
  Dark = "dark",
  Light = "light",
  LightNoBorder = "light-no-border",
  Transparent = "transparent",
}
export const VehicleForm: React.FC<VehicleFormProps> = ({
  data,
  onChange,
  vehicleInfo,
  onValidate,
}) => {
  const MODELS = [
    {
      option: { value: "HILUX D.C. 4X4 DIESEL 2.4 MT", label: "Hilux" },
    },
    {
      option: { value: "FORTUNER SRV 4X2 DIÉSEL 2.8", label: "Fortuner" },
    },
    {
      option: {
        value: "LAND CRUISER PRADO DIÉSEL TX",
        label: "Land Cruiser Prado",
      },
    },
    {
      option: { value: "Land Cruiser 79", label: "Land Cruiser 79" },
    },
    {
      option: { value: "YARIS CROSS XLS HEV", label: "Yaris Cross" },
    },
    {
      option: { value: "COROLLA CROSS SEG", label: "Corolla Cross" },
    },
    {
      option: { value: "COROLLA XLI HEV", label: "Corolla" },
    },
  ];

  const [selectedModel, setSelectedModel] = useState<any>(MODELS[0]);

  useEffect(() => {
    if (!vehicleInfo?.name) return;

    const matchedModel = MODELS.find(
      (model) =>
        model.option.label.toLowerCase() === vehicleInfo.name.toLowerCase()
    );

    if (matchedModel) {
      setSelectedModel(matchedModel);

      onChange({
        vehicleType: matchedModel.option.label,
        vehicleVersions: matchedModel.option.value,
      });
    }
  }, [vehicleInfo]);

  useEffect(() => {
    const isValid = data.vehicleType !== "" && data.quantity !== "";
    onValidate(isValid);
  }, [data.vehicleType, data.quantity]); // Remove onValidate from dependencies

  return (
    <div className={styles.formContainer}>
      <div className={styles.formGroup}>
        <label htmlFor="model">Modelo*</label>
        <Select
          options={MODELS.map((model) => model.option)}
          selectedOption={selectedModel?.option || null}
          onSelect={(selected) => {
            const newModel = MODELS.find(
              (model) => model.option.value === selected?.value
            );
            setSelectedModel(newModel || null);

            if (newModel) {
              onChange({
                vehicleType: newModel.option.label,
                vehicleVersions: newModel.option.value,
              });
            }
          }}
          theme={SelectTheme.Light}
        />
      </div>
      <div className={styles.formGroup}>
        <label htmlFor="quantity">Cantidad de vehículos a cotizar*</label>
        <input
          type="text"
          id="quantity"
          placeholder="Cantidad de vehículos a cotizar"
          value={data.quantity}
          onChange={(e) => onChange({ quantity: e.target.value })}
        />
      </div>
    </div>
  );
};
