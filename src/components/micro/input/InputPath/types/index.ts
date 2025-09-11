import type { MouseEvent } from "react";
import type { InputPatternProps } from "../../types/types";

export interface InputPathProps extends InputPatternProps{
    onClick: (event: MouseEvent<HTMLButtonElement>) => void;
}