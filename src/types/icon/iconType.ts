export type IconColors = "primary" | "disabled";

export type Ticon = React.ComponentProps<"svg"> & {
  color?: IconColors;
  isActive?: boolean;
  fill?: string;
};
