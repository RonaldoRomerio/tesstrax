import type { Image } from "@/context/types";

export interface Box {
    x: number;
    y: number;
    width: number;
    height: number;
    line?: number;
    content?: string
};

export interface boxEditorProps {
    image_actual: Image;
    box: [Box | null, React.Dispatch<React.SetStateAction<Box | null>>]
    arrayBoxes: [Box[], React.Dispatch<React.SetStateAction<Box[]>>]
};

export interface imageBox{
    imageBoxArray: [string, Box[]]
}