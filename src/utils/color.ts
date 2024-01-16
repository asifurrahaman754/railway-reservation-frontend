import { CustomColors } from "theme/index";

export const getColor = (name: keyof CustomColors) => `var(--${name})`;
