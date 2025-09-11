import { Button } from "@/components/ui/button";
import type { ButtonMenuProps } from "./types";
import { cn } from "@/lib/utils";

export default function ButtonMenu({ icon, onClick, title, index = 1 }: ButtonMenuProps) {
    return (

        <Button
            key={index}
            className={cn(
                "w-12 h-12 bg-gray-700 hover:bg-gray-600 transition-all duration-200",
                "border border-gray-600 shadow-lg"
            )}
            style={{
                transitionDelay: `${index * 50}ms`
            }}
            onClick={onClick}
            title={title}
        >
            {icon}
        </Button>
    )
}