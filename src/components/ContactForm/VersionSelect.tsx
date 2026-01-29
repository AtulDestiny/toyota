"use client";

import { useState, useEffect } from "react";
import { CotizadorSelect } from "@/app/cotizador/[slug]/components/CotizadorSelect";

type VersionSelectProps = {
  marca: string;
  modelo?: string;
  year?: string; // filter by year
  value: string;
  onChange: (value: string) => void;
  setVehicleData: any;
  vehicleData: any;
  vehicleType: any;
  creds?: {
    Ciudad?: string;
    Concesionario?: string;
    externalId?: string;
  };
  setParentLoading?: (value: boolean) => void;
};

export const VersionSelect = ({
  marca,
  modelo,
  year,
  value,
  onChange,
  setVehicleData,
  vehicleData,
  vehicleType,
  creds,
  setParentLoading
}: VersionSelectProps) => {
  const [versions, setVersions] = useState<{ value: string; label: string; raw: any }[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | undefined>(undefined);


  useEffect(() => {
    if (!modelo || !marca) return;
    const fetchVersions = async () => {
      setLoading(true);
      setError(undefined);

      try {
        const response = await fetch(
          `https://apipro.agentemotor.com/seguros/co/vehicles/consultar/vehiculos-por-caracteristica?marca=${encodeURIComponent(
            marca
          )}&modelo=${encodeURIComponent(modelo)}&ceroKm=True&in_agency=True`
        );

        const result = await response.json();
        console.log("Version API result:", result);

        //  Filter only new vehicles & match year if provided
        let filtered = (result || []).filter((item: any) => {

          const vehicle = item?.data?.vehicle;
          const modelYear = vehicle?.model;
          const novedad = vehicle?.vehicle_codification?.um;
          return (!year || modelYear === year) && novedad === "True";
        });

        // Exclude models by year
        if (year === "2025") {
          filtered = filtered.filter((item: any) => {
            const line1 = item?.data?.vehicle?.vehicle_codification?.line1?.toLowerCase() || "";
            const excludedModels = ["sequoia", "grand highlander", "bz4x"];
            return !excludedModels.some((excluded) => line1.includes(excluded.toLowerCase()));
          });
        } else if (year === "2026") {
          filtered = filtered.filter((item: any) => {
            const line1 = item?.data?.vehicle?.vehicle_codification?.line1?.toLowerCase() || "";
            return !line1.includes("sequoia");
          });
        }


        //  Map dropdown values (label + value)
        const mapped = filtered
          .map((item: any) => {
            const line = item?.data?.vehicle?.vehicle_codification?.line1;
            if (!line) return null;
            const label = line.replace(/\s*\[.*?\]/g, "").trim();
            return { value: line, label, raw: item.data.vehicle };
          })
          .filter(Boolean) as { value: string; label: string; raw: any }[];

        //  Remove duplicate labels
        const uniqueMap = new Map<string, { value: string; label: string; raw: any }>();
        mapped.forEach((item) => {
          if (!uniqueMap.has(item.label)) uniqueMap.set(item.label, item);
        });

        const uniqueVersions = Array.from(uniqueMap.values());

        //  Set versions for dropdown UI
        setVersions(uniqueVersions);

        //  Store ALL versions inside vehicleData (as requested)
        setVehicleData({
          ...vehicleData,
          versions: filtered.map((item: any) => item.data.vehicle), // full raw API response per version
        });

      } catch (err) {
        console.error("Error fetching versions:", err);
        setError("Error al cargar versiones");
        setVersions([]);
      } finally {
        setLoading(false);
      }
    };

    fetchVersions();
  }, [modelo, marca, year]);

  //  Optional: Update vehicleData when a version is picked
  const handleVersionChange = async (val: string) => {
    try {
      setParentLoading?.(true);
      onChange(val);
      if (!modelo) return;

      const selectedVersion = versions.find((v) => v.value === val);
      const selectedVehicle = selectedVersion?.label;
      const label = selectedVehicle ?? "";
      if (!selectedVehicle) {
        console.warn("⚠️ No version label found for selected value");
        return;
      }

      //  Prepare API call to Lambda function
      const lambdaUrl =
        "https://apvc4zmjfi.execute-api.us-east-2.amazonaws.com/prod/getDealershipUsedVehicle";

      const myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");
      //  Use valid Bearer token
      myHeaders.append(
        "Authorization",
        "Bearer ItSry30SEviCPSmiSu1rvC7XoYexzeiVzxX5Wu6RiuwMmH65y7fCY861W4eo4PtqQSWjf6I3cYt5BUfc2rFtfe82ahsCeLeFr26SCWxzUE82QphsMOukkZP5QSjL"
      );
      const raw = JSON.stringify({
        Ciudad: creds?.Ciudad,
        Concesionario: creds?.Concesionario,
        externalId: creds?.externalId,
        marca: "TOYOTA",
        modelo: modelo,
        ref: label,
      });

      const response = await fetch(lambdaUrl, {
        method: "POST",
        headers: myHeaders,
        body: raw,
      });

      const result = await response.json();

      if (!result.success) {
        console.error("❌ Lambda returned error:", result.message || result.error);
        setVehicleData({ selectedVersion: null, versions: [] });
        return;
      }

      // Extract data correctly
      const data = result.data;
      if (Array.isArray(data) && data.length > 0) {
        const vehicles = data
          .map((item: any) => item?.data?.vehicle)
          .filter(Boolean)
          .map((v: any) => ({
            id: v.id ?? "",
            type: v.type,
            line: v.line,
            line2: v.vehicle_codification?.line2,
            brand: v.brand,
            model: v.model,
            cylinder: v.codification?.cylinder,
            airBags: v.vehicle_codification?.air_bags,
            codeCf: v.codification?.code_cf,
            code: v.codification?.code,
            referencePrice: v.vehicle_risk?.reference_price,
            commercial_price: v.vehicle_risk?.commercial_price,
          }));

        setVehicleData({
          selectedVersion: null,
          versions: vehicles,
        });
      } else {
        console.warn("⚠️ No vehicles returned from Lambda");
        setVehicleData({
          selectedVersion: null,
          versions: [],
        });
      }
    } catch (error) {
      console.error("❌ Error fetching vehicle data from Lambda:", error);
      setVehicleData({
        selectedVersion: null,
        versions: [],
      });
    }
    finally {
      setParentLoading?.(false);
    }
  };

  return (
    <CotizadorSelect
      label="Versión*"
      id="version"
      value={value}
      onChange={(e) => handleVersionChange(e.target.value)}
      options={versions}
      placeholder={loading ? "Cargando versiones..." : "Seleccione versión"}
      errorMessage={error}
    />
  );
};
