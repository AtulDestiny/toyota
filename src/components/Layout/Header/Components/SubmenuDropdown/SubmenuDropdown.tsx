import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Flex, Text, View, Divider } from "@aws-amplify/ui-react";
import { ExternalLinkIcon } from "@/icons/ExternalLinkIcon";
import RightArrowIcon from "@/icons/RightArrowIcon";
import LeftArrowIcon from "@/icons/LeftArrowIcon";
import styles from "./SubmenuDropdown.module.css";

interface LinkItem {
  label: string;
  description?: string;
  href?: string;
  isExternal?: boolean;
  submenu?: Column[]; // Para soportar múltiples niveles
  info?: boolean; // Para textos informativos
}

interface Column {
  title?: string;
  subtitle?: string;
  links: LinkItem[];
  showViewAll?: boolean;
  viewAllLink?: string;
}

interface MenuProps {
  columns: Column[];
  isMobile?: boolean;
  onClose?: () => void;
  onBack?: () => void; // Para navegación en mobile
  titleStyle?: React.CSSProperties; // Add this new prop
  linkStyle?: React.CSSProperties; // Add this new prop
}

const SubmenuDropdown: React.FC<MenuProps> = ({
  columns,
  isMobile = false,
  onClose,
  onBack,
  titleStyle, // Added titleStyle here
  linkStyle, // Add this,
}) => {
  const [activeSubmenus, setActiveSubmenus] = useState<
    { columns: Column[]; parentItem: LinkItem }[]
  >([]);

  const handleItemClick = (link: LinkItem, level: number) => {
    // Si el item ya está abierto, lo cerramos
    if (activeSubmenus[level]?.parentItem === link) {
      setActiveSubmenus(activeSubmenus.slice(0, level));
      return;
    }

    // Si tiene submenu, lo mostramos
    if (link.submenu) {
      setActiveSubmenus([
        ...activeSubmenus.slice(0, level),
        { columns: link.submenu, parentItem: link },
      ]);
    }
  };

  useEffect(() => {
    // Resetear submenús cuando cambian las columnas principales
    setActiveSubmenus([]);
  }, [columns]);

  // Implementación para mobile
  if (isMobile) {
    return (
      <View
        style={{
          position: "fixed",
          top: "60px",
          padding: "20px",
          left: 0,
          right: 0,
          bottom: 0,
          height: "100%",
          backgroundColor: "white",
          zIndex: 1000,
          overflowY: "auto",
        }}
      >
        {/* Mostrar el submenú activo o el menú principal */}
        {(activeSubmenus.length > 0
          ? activeSubmenus[activeSubmenus.length - 1].columns
          : columns
        ).map((column, columnIndex) => (
          <View key={columnIndex} style={{ marginBottom: "30px" }}>
            {/* Botón de retroceso solo si hay submenús activos */}
            {activeSubmenus.length > 0 && columnIndex === 0 && (
              <Flex
                alignItems="center"
                gap="10px"
                marginBottom="20px"
                onClick={() => {
                  if (activeSubmenus.length === 1) {
                    onBack?.(); // Volver al menú principal
                  } else {
                    setActiveSubmenus(activeSubmenus.slice(0, -1)); // Retroceder un nivel
                  }
                }}
                style={{ cursor: "pointer" }}
              >
                <LeftArrowIcon />
                <Text
                  fontSize={titleStyle?.fontSize || "18px"}
                  color="#000"
                  fontFamily="var(--font-toyotaDisplay)"
                >
                  Volver
                </Text>
              </Flex>
            )}

            <Text
              fontWeight={titleStyle?.fontWeight || "600"}
              fontSize="18px"
              marginBottom="10px"
              color="#000"
              fontFamily="var(--font-toyotaDisplay)"
              marginTop={columnIndex > 0 ? "20px" : "0"}
            >
              {column.title}
            </Text>
            {column.subtitle && (
              <Text
                fontSize="14px"
                color="#58595B"
                marginBottom="20px"
                fontFamily="var(--font-toyotaDisplay)"
              >
                {column.subtitle}
              </Text>
            )}
            <Flex direction="column" gap="15px">
              {column.links.map((link, linkIndex) => (
                // <Flex
                //   key={linkIndex}
                //   alignItems="center"
                //   justifyContent="space-between"
                //   onClick={() => {
                //     if (link.submenu) {
                //       handleItemClick(link, activeSubmenus.length);
                //     } else if (link.href) {
                //       onClose?.();
                //     }
                //   }}
                //   style={{
                //     cursor: "pointer",
                //     padding: "12px 0",
                //     borderBottom: "1px solid #f0f0f0",
                //   }}
                // >
                //   <Flex direction="column" gap="4px" style={{ flex: 1 }}>
                //     <Text
                //       fontSize={titleStyle?.fontSize || "18px"}
                //       fontWeight={500}
                //       fontFamily="var(--font-ToyotaType-Regular)"
                //       style={link.info ? { color: "#A0A0A0", padding: "8px" } : {}}
                //     >
                //       {link.label}
                //     </Text>
                //     {link.description && (
                //       <Text
                //         fontSize="14px"
                //         color="#58595B"
                //         fontFamily="var(--font-toyotaDisplay)"
                //         fontWeight={300}
                //       >
                //         {link.description}
                //       </Text>
                //     )}
                //   </Flex>
                //   {/* Only show right arrow for items with submenus */}
                //   {link.submenu && (
                //     <RightArrowIcon
                //       style={{
                //         opacity: activeSubmenus[activeSubmenus.length - 1]?.parentItem === link ? 1 : 0.6,
                //         transform: activeSubmenus[activeSubmenus.length - 1]?.parentItem === link ? "translateX(2px)" : "none",
                //         transition: "all 0.2s ease",
                //       }}
                //     />
                //   )}
                // </Flex>

                <Flex
                  key={linkIndex}
                  alignItems="center"
                  justifyContent="space-between"
                  onClick={() => {
                    if (link.submenu) {
                      handleItemClick(link, activeSubmenus.length);
                    }
                  }}
                  style={{
                    cursor: "pointer",
                    padding: "12px 0",
                    borderBottom: "1px solid #f0f0f0",
                  }}
                >
                  {link.href && !link.submenu ? (
                    <Link href={link.href} legacyBehavior>
                      <a
                        style={{
                          textDecoration: "none",
                          color: "inherit",
                          width: "100%",
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                        }}
                        onClick={() => onClose?.()}
                      >
                        <Flex direction="column" gap="4px" style={{ flex: 1 }}>
                          <Text
                            fontSize={titleStyle?.fontSize || "18px"}
                            fontWeight={500}
                            fontFamily="var(--font-ToyotaType-Regular)"
                            style={
                              link.info
                                ? { color: "#A0A0A0", padding: "8px" }
                                : {}
                            }
                          >
                            {link.label}
                          </Text>
                          {link.description && (
                            <Text
                              fontSize="14px"
                              color="#58595B"
                              fontFamily="var(--font-toyotaDisplay)"
                              fontWeight={300}
                            >
                              {link.description}
                            </Text>
                          )}
                        </Flex>
                        {link.isExternal && <ExternalLinkIcon />}
                      </a>
                    </Link>
                  ) : (
                    <Flex direction="column" gap="4px" style={{ flex: 1 }}>
                      <Text
                        fontSize={titleStyle?.fontSize || "18px"}
                        fontWeight={500}
                        fontFamily="var(--font-ToyotaType-Regular)"
                        style={
                          link.info ? { color: "#A0A0A0", padding: "8px" } : {}
                        }
                      >
                        {link.label}
                      </Text>
                      {link.description && (
                        <Text
                          fontSize="14px"
                          color="#58595B"
                          fontFamily="var(--font-toyotaDisplay)"
                          fontWeight={300}
                        >
                          {link.description}
                        </Text>
                      )}
                    </Flex>
                  )}

                  {link.submenu && (
                    <RightArrowIcon
                      style={{
                        opacity:
                          activeSubmenus[activeSubmenus.length - 1]
                            ?.parentItem === link
                            ? 1
                            : 0.6,
                        transform:
                          activeSubmenus[activeSubmenus.length - 1]
                            ?.parentItem === link
                            ? "translateX(2px)"
                            : "none",
                        transition: "all 0.2s ease",
                      }}
                    />
                  )}
                </Flex>
              ))}
            </Flex>
          </View>
        ))}
      </View>
    );
  }

  // Implementación para desktop
  return (
    <View
      style={{
        position: "fixed",
        top: "60px",
        padding: "60px",
        left: 0,
        right: 0,
        bottom: 0,
        height: "100%",
        backgroundColor: "white",
        zIndex: 9999999,
        display: "flex",
        flexDirection: "column",
      }}
      onMouseLeave={onClose}
    >
      <Flex gap="0" alignItems="flex-start">
        {/* Render each column separately */}
        {columns.map((column, index) => (
          <React.Fragment key={index}>
            {index > 0 && (
              <Divider
                orientation="vertical"
                style={{
                  height: "298px", // Fixed height for the separator
                  margin: "0 20px",
                  borderColor: "#E0E0E0",
                }}
              />
            )}
            <MenuColumn
              columns={[column]} // Pass only one column at a time
              level={0}
              onItemClick={handleItemClick}
              activeSubmenus={activeSubmenus}
              titleStyle={titleStyle}
              linkStyle={linkStyle}
              onClose={onClose} // Pass onClose prop
            />
          </React.Fragment>
        ))}

        {/* Render submenus for the active column */}
        {activeSubmenus.map((submenu, level) => (
          <React.Fragment key={level}>
            <Divider
              orientation="vertical"
              style={{
                height: "400px",
                margin: "0 40px",
                borderColor: "#E0E0E0",
              }}
            />
            <MenuColumn
              columns={submenu.columns}
              level={level + 1}
              onItemClick={handleItemClick}
              activeSubmenus={activeSubmenus}
              titleStyle={titleStyle}
              linkStyle={linkStyle}
              onClose={onClose} // Pass onClose prop
            />
          </React.Fragment>
        ))}
      </Flex>
    </View>
  );
};

// Componente reutilizable para columnas del menú
const MenuColumn: React.FC<{
  columns: Column[];
  level: number;
  onItemClick: (link: LinkItem, level: number) => void;
  activeSubmenus: { columns: Column[]; parentItem: LinkItem }[];
  titleStyle?: React.CSSProperties; // Add this
  linkStyle?: React.CSSProperties; // Add this
  onClose?: () => void; // Pass onClose from parent
}> = ({
  columns,
  level,
  onItemClick,
  activeSubmenus,
  titleStyle,
  linkStyle,
  onClose, // Receive onClose here
}) => {
  const resolvedTitleFontWeight = titleStyle?.fontWeight ?? "400";
  const resolvedTitleFontSize = titleStyle?.fontSize ?? "18px";

  return (
    <View style={{ width: "280px" }}>
      {columns.map((column, columnIndex) => (
        <React.Fragment key={columnIndex}>
          <View marginTop={columnIndex > 0 ? "20px" : "0"}>
            <Text
              fontWeight={resolvedTitleFontWeight}
              fontSize={resolvedTitleFontSize}
              marginBottom="38px"
              color="#58595B"
              letterSpacing={"0"}
              fontFamily="var(--font-toyotaDisplay)"
              lineHeight="140%"
            >
              {column.title}
            </Text>
            {column.subtitle && (
              <Text
                fontSize="16px"
                color="#000"
                fontWeight="600"
                fontFamily="var(--font-toyotaDisplay)"
              >
                {column.subtitle}
              </Text>
            )}
            <Flex direction="column" gap="8px">
              {column.links.map((link, linkIndex) => {
                const isActive = activeSubmenus[level]?.parentItem === link;

                return (
                  <Flex
                    key={linkIndex}
                    alignItems="center"
                    justifyContent={
                      link.label === "Ver todo" ? "start" : "space-between"
                    }
                    onClick={() => {
                      onItemClick(link, level);
                      if (!link.submenu) {
                        onClose?.();
                      }
                    }}
                    className={isActive || level > 0 ? styles.active : ""}
                    style={{
                      cursor: link.info ? "default" : "pointer",
                      padding: link.info ? "8px 0 0" : "8px 0px",
                      marginBottom: link.info ? "-8px" : "inherit",
                      borderRadius: "4px",
                      backgroundColor: isActive ? "#f5f5f5" : "transparent",
                      transition: "background-color 0.2s ease",
                    }}
                    onMouseEnter={() => {
                      // Opcional: abrir al hover en desktop
                      if (link.submenu && !isActive) {
                        onItemClick(link, level);
                      }
                    }}
                  >
                    <Flex
                      direction="column"
                      gap="0px"
                      style={{ flex: link.label === "Ver todo" ? 0 : 1 }}
                    >
                      {link.href ? (
                        <Link
                          href={link.href}
                          passHref
                          target={link.isExternal ? "_blank" : "_self"}
                          rel={
                            link.isExternal ? "noopener noreferrer" : undefined
                          }
                          style={{ textDecoration: "none", color: "inherit" }}
                          onClick={(e) => {
                            if (link.submenu) {
                              e.preventDefault(); // Evitar navegación si tiene submenu
                            }
                          }}
                        >
                          <Text
                            fontSize={linkStyle?.fontSize || "18px"}
                            fontWeight={
                              link.label === "Ver todo"
                                ? 500
                                : linkStyle?.fontWeight || 400
                            }
                            lineHeight={
                              link.label === "Ver todo"
                                ? "100%"
                                : linkStyle?.lineHeight || "normal"
                            }
                            fontFamily={
                              link.label === "Ver todo"
                                ? " var(--font-roboto)"
                                : "var(--font-ToyotaType-Regular)"
                            }
                            style={{
                              ...(link.label === "Ver todo"
                                ? {
                                    backgroundClip: "text",
                                    border: "none",
                                    padding: 0,
                                    fontFamily: "var(--font-roboto)",
                                    fontSize: "14px",
                                    fontWeight: 500,
                                    fontStyle: "normal",
                                    width: "max-content",
                                    lineHeight: "normal",
                                    textDecorationLine: "underline",
                                    textDecorationStyle: "solid",
                                    textDecorationSkipInk: "none",
                                    textDecorationThickness: "auto",
                                    textUnderlineOffset: "auto",
                                    textUnderlinePosition: "from-font",
                                  }
                                : {}),
                              ...(link.info
                                ? { color: "#A0A0A0", fontStyle: "italic" }
                                : {}),
                            }}
                          >
                            {link.label}
                          </Text>
                        </Link>
                      ) : (
                        <Text
                          fontSize={linkStyle?.fontSize || "17px"}
                          fontWeight={linkStyle?.fontWeight || 500}
                          fontFamily="var(--font-ToyotaType-Regular)"
                          style={link.info ? { color: "#A0A0A0" } : {}}
                        >
                          {link.label}
                        </Text>
                      )}
                      {link.description && (
                        <Text
                          fontSize="13px"
                          color="#58595B"
                          fontFamily="var(--font-toyotaDisplay)"
                          fontWeight={300}
                        >
                          {link.description}
                        </Text>
                      )}
                    </Flex>
                    {/* Only show right arrow for items with submenus */}
                    {link.submenu && (
                      <RightArrowIcon
                        style={{
                          opacity: isActive ? 1 : 0.6,
                          transform: isActive ? "translateX(2px)" : "none",
                          transition: "all 0.2s ease",
                        }}
                      />
                    )}
                  </Flex>
                );
              })}
            </Flex>
          </View>
        </React.Fragment>
      ))}
    </View>
  );
};

export default SubmenuDropdown;
