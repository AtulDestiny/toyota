import { Filter as NewVehiclesFilter } from "./NewVehicles";
import { Filter as UsedVehiclesFilter } from "./UsedVehicles";
import { Filter as BoutiqueFilter } from "./Boutique";
import { Filter as RepuestosFilter } from "./Repuestos";
import { Filter as AccesoriesFilter } from "./Accesories";

export {
  NewVehiclesFilter,
  UsedVehiclesFilter,
  BoutiqueFilter,
  RepuestosFilter,
  AccesoriesFilter,
};

export type FilterPanelChildProps = {
  opened: boolean;
  toggle: () => void;
};
