import type ButtonMenu from "@/components/micro/button/ButtonMenu";
import type { ReactElement } from "react";

export interface Position {
    x: number
    y: number
}

export interface TDragButtonMenu{
    children: ReactElement<typeof ButtonMenu> | ReactElement<typeof ButtonMenu>[];
}