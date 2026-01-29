// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
"use client";

import React from "react";
import { View, Text, Flex, Button, Image } from "@aws-amplify/ui-react";
import { useRouter } from "next/navigation";

interface JobDetailProps {
  id: string;
  slug: string;
  title: string;
  department: string;
  location: string;
  description: string;
  postedDate: string;
}

export const JobDetailPage: React.FC<JobDetailProps> = (props) => {
  const router = useRouter();

  // Handle back to results
  const handleBackToResults = () => {
    router.push("/trabaja-con-nosotros");
  };

  // Format description paragraphs
  const descriptionParagraphs = props.description.split("\n\n");

  // Calculate days since posted
  const calculateDaysDifference = (dateString) => {
    const postedDate = new Date(dateString);
    const today = new Date();
    const diffTime = Math.abs(today.getTime() - postedDate.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  return (
    <View width="100%">
      {/* Banner image - same as main page */}
      <View width="100%">
        <Image
          src="/images/reserch.svg"
          alt="Toyota careers banner"
          width="100%"
          height={{ base: "200px", medium: "300px" }}
          objectFit="cover"
        />
      </View>

      {/* Title section below banner */}
      <View
        padding={{ base: "40px 15px", medium: "60px 30px" }}
        width="100%"
        textAlign="center"
      >
        <Text
          fontSize={{ base: "28px", medium: "32px" }}
          fontWeight="700"
          fontFamily="var(--font-ToyotaType-Regular)"
        >
          TRABAJA CON NOSOTROS
        </Text>
      </View>

      {/* Content container */}
      <View
        maxWidth="1200px"
        margin="0 auto"
        padding={{ base: "0 15px", medium: "0 30px" }}
      >
        {/* Back button */}
        <Button
          onClick={handleBackToResults}
          backgroundColor="transparent"
          border="none"
          color="#666"
          display="flex"
          alignItems="center"
          gap="8px"
          padding={{ base: "20px 0", medium: "30px 0" }}
          fontSize="14px"
          fontFamily="var(--font-toyotaDisplay)"
          style={{ cursor: "pointer", fontWeight: "400" }}
        >
          <Text>← Volver a los resultados</Text>
        </Button>

        {/* Main content wrapper */}
        <Flex
          direction={{ base: "column", large: "row" }}
          gap={{ base: "30px", large: "60px" }}
          marginBottom="60px"
        >
          {/* Left column - Job details */}
          <View width={{ base: "100%", large: "70%" }}>
            {/* Position label */}
            <Text fontSize="16px" color="#666" marginBottom="8px">
              Cargo
            </Text>

            {/* Job title */}
            <Text
              as="h1"
              fontSize={{ base: "24px", medium: "32px" }}
              fontWeight="700"
              fontFamily="var(--font-ToyotaType-Regular)"
              marginBottom="20px"
              lineHeight="1.2"
            >
              {props.title}
            </Text>

            {/* Location and posting date */}
            <Flex
              direction={{ base: "row", medium: "row" }}
              gap={{ base: "12px", medium: "30px" }}
              fontSize={{ base: "14px", medium: "14px" }}
              marginBottom="40px"
            >
              <Text fontSize="16px" fontWeight="500" color="#333">
                {props.location}
              </Text>

              <Text fontSize="16px" color="#666">
                Publicado hace {calculateDaysDifference(props.postedDate)} días
              </Text>
            </Flex>

            {/* Job description */}
            <View>
              {descriptionParagraphs.map((paragraph, index) => (
                <Text
                  key={index}
                  fontSize="16px"
                  fontFamily="var(--font-toyotaDisplay)"
                  lineHeight="1.6"
                  marginBottom="20px"
                >
                  {paragraph}
                </Text>
              ))}
            </View>
          </View>

          {/* Right column - Apply button */}
          <View width={{ base: "100%", large: "30%" }}>
            <View position={{ large: "sticky" }} top={{ large: "20px" }}>
              <Button
                backgroundColor="#000000"
                color="white"
                border="none"
                padding="16px 20px"
                borderRadius="999px"
                fontSize="16px"
                fontWeight="500"
                width="100%"
                style={{ cursor: "pointer" }}
                onClick={() => {
                  alert("Gracias por tu interés en esta posición!");
                }}
              >
                Aplicar a este cargo
              </Button>
            </View>
          </View>
        </Flex>
      </View>
    </View>
  );
};

export default JobDetailPage;
