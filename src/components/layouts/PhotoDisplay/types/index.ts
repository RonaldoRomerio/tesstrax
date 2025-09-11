import type { ReactNode } from "react";

export interface TPhotoDisplay{
    children: ReactNode,
    DisplayControl: [number, React.Dispatch<React.SetStateAction<number>>]
    QuantifiedImages: number;
};