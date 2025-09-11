import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle
} from "@/components/ui/dialog"
import type { TModal } from "./types"

export default function Modal({
    title,
    description,
    children,
    footer,
    open,
    onOpenChange,
    size = "md"
}: TModal) {
    const sizeClasses = {
        sm: "max-w-sm",
        md: "max-w-md",
        lg: "max-w-lg",
        xl: "max-w-xl",
        full: "max-w-[90vw]"
    }

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className={`${sizeClasses[size]} max-h-[90vh] overflow-y-auto bg-gray-900`}>
                <DialogHeader>
                    <DialogTitle className="text-white">{title}</DialogTitle>
                    {description && (
                        <DialogDescription className="text-white">{description}</DialogDescription>
                    )}
                </DialogHeader>

                <div className="py-4">
                    {children}
                </div>

                {footer && (
                    <DialogFooter>
                        {footer}
                    </DialogFooter>
                )}
            </DialogContent>
        </Dialog>
    )
}
