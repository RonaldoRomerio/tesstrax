import type { project_prop } from "@/context/types";

export interface ProjectLineProps{
    key?:number|string,
    Data: project_prop,
    onClick?: () => void
}
