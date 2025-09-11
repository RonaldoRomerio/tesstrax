import type { ReactNode } from "react";

export interface ButtonMenuProps{
    onClick: () => void,
    icon: ReactNode,
    title: string,
    index?: number;
}