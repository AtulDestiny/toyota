import styles from "./ContactForm.module.scss";
import { cityList } from "./cityList";
import React, { useState, useEffect } from "react";

const CitySelectInput = ({ formValues, formErrors, handleInputChange }: any) => {
    const [searchTerm, setSearchTerm] = useState("");
    const [showDropdown, setShowDropdown] = useState(false);

    // 🔹 Keep displayed city name in sync when the stored code changes
    useEffect(() => {
        const selectedCity = cityList.find(
            (city) => city.code === formValues.ciudadCirculacion
        );
        if (selectedCity) setSearchTerm(`${selectedCity.city_name} (${selectedCity.state_name})`);
    }, [formValues.ciudadCirculacion]);

    const filteredCities = cityList.filter((city) =>
        city.city_name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleSelectCity = (city: any) => {
        // ✅ Send city code to form state
        handleInputChange("ciudadCirculacion", city.code);

        // ✅ Display city name in the input
        setSearchTerm(city.city_name);

        // ✅ Hide dropdown
        setShowDropdown(false);
    };

    return (
        <div className={styles.formGroup} style={{ position: "relative" }}>
            <label className={styles.formInputlabel}>Ciudad de circulación*</label>

            <input
                type="text"
                placeholder="Seleccione o busque una ciudad"
                value={searchTerm}
                onChange={(e) => {
                    setSearchTerm(e.target.value);
                    setShowDropdown(true); // show dropdown as user types
                }}
                onFocus={() => setShowDropdown(true)}
                onBlur={() => setTimeout(() => setShowDropdown(false), 200)} // slight delay to allow click
                style={{
                    backgroundColor: "#fff",
                    borderRadius: "80px",
                    border: "none",
                    color: "#58595B",
                    fontSize: "14px",
                    fontFamily: "var(--font-ToyotaDisplay)",
                    padding: "10px 23px",
                    outline: "none",
                    width: "100%",
                    maxWidth: "444px",
                }}
            />

            {showDropdown && (
                <ul
                    style={{
                        position: "absolute",
                        top: "100%",
                        left: 0,
                        width: "100%",
                        maxHeight: "200px",
                        overflowY: "auto",
                        background: "#fff",
                        borderRadius: "12px",
                        boxShadow: "0 2px 10px rgba(0,0,0,0.15)",
                        marginTop: "4px",
                        zIndex: 1000,
                        listStyle: "none",
                        padding: "8px 0",
                    }}
                >
                    {filteredCities.length > 0 ? (
                        filteredCities
                            .sort((a, b) =>
                                a.city_name.localeCompare(b.city_name, "es", { sensitivity: "base" })
                            )
                            .map((city) => (
                                <li
                                    key={city.code}
                                    onClick={() => handleSelectCity(city)}
                                    style={{
                                        padding: "8px 20px",
                                        cursor: "pointer",
                                        color: "#333",
                                    }}
                                    onMouseDown={(e) => e.preventDefault()} // prevent blur before click
                                >
                                    {city.city_name}
                                </li>
                            ))
                    ) : (
                        <li style={{ padding: "8px 20px", color: "#888" }}>
                            No se encontraron ciudades
                        </li>
                    )}
                </ul>
            )}

            {formErrors.ciudadCirculacion && (
                <p className={styles.errorMessage_tp}>
                    {formErrors.ciudadCirculacion}
                </p>
            )}
        </div>
    );
};

export default CitySelectInput;
