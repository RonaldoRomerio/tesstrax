import type { ToolBarButtonProps } from "./types";

export function ToolBarButton({onClick, icon} : ToolBarButtonProps){
    return (
        <button
            onClick={onClick}
            className="hover:bg-zinc-700 px-2 py-1 rounded"
        >
            {icon}
        </button>
    )
}