export interface ComponentData {
  component: string;
  props?: Record<string, unknown>;
  children?: (ComponentData | string)[];
}

export interface ComponentSection {
  title: string;
  components: {
    name: string;
    purpose: string;
    props: string;
    example?: ComponentData;
  }[];
}
