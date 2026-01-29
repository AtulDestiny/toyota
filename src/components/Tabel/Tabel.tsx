import React from "react";
import {
  Table,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
  View,
  Text,
} from "@aws-amplify/ui-react";

type FeatureRow = {
  feature: string;
  free: boolean;
  bonus: boolean;
};

interface FeatureComparisonTableProps {
  data?: FeatureRow[];
  margin?: string;
}

const defaultData: FeatureRow[] = [
  { feature: "Diagnóstico del vehículo", free: true, bonus: true },
  { feature: "Recordatorio de mantenimiento", free: true, bonus: true },
  { feature: "Puntuación de combustible", free: true, bonus: true },
  { feature: "Estado del vehículo", free: true, bonus: true },
  { feature: "Últimos viajes", free: true, bonus: true },
  { feature: "Alerta de velocidad", free: false, bonus: true },
  { feature: "Delimitación geográfica", free: false, bonus: true },
  { feature: "Inmovilización de vehículo", free: false, bonus: true },
  { feature: "Monitoreo mejorado", free: false, bonus: true },
  { feature: "Notificación de alarma", free: false, bonus: true },
  { feature: "Rastreo de vehículo robado", free: false, bonus: true },
  { feature: "Desconexión del módulo", free: false, bonus: true },
];

const FeatureComparisonTable: React.FC<FeatureComparisonTableProps> = ({
  data = defaultData,
  margin = "2rem auto",
}) => {
  return (
    <View
      as="section"
      margin={margin}
      overflow="auto"
      width="100%"
      maxWidth="1105px"
      padding="1rem 0"
    >
      <Table
        className="data-table"
        highlightOnHover={false}
        variation="bordered"
        width="100%"
      >
        <TableHead>
          <TableRow>
            <TableCell as="th">
              <Text>Funcionalidades</Text>
            </TableCell>
            <TableCell as="th">
              <Text>Siempre Conectado</Text>
            </TableCell>
            <TableCell as="th">
              <Text>Seguridad Conectada</Text>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row, index) => (
            <TableRow
              key={index}
              backgroundColor={index % 2 === 0 ? "#F7F7F7" : "transparent"}
            >
              <TableCell className="title">{row.feature}</TableCell>
              <TableCell style={{ textAlign: "center" }}>
                {row.free ? "✅" : "❌"}
              </TableCell>
              <TableCell style={{ textAlign: "center" }}>
                {row.bonus ? "✅" : "❌"}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </View>
  );
};

export default FeatureComparisonTable;
