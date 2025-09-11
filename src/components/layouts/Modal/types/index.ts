export interface TModal {
    title: string
    description?: string
    children: React.ReactNode
    footer?: React.ReactNode
    open?: boolean
    onOpenChange?: (open: boolean) => void
    size?: "sm" | "md" | "lg" | "xl" | "full"
}
