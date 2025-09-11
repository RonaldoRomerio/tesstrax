import type {Box} from "@/components/layouts/BoxEditor/types"

export interface tableBoxesProps{
    lineBoxes: [Box[], React.Dispatch<React.SetStateAction<Box[]>>]
}