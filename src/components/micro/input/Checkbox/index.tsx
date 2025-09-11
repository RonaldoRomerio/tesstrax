import { Label } from "@/components/ui/label";
import { Checkbox as CheckboxUI } from "@/components/ui/checkbox";
import type { CheckboxProps } from "./types";
import { Controller, useFormContext } from "react-hook-form";
export default function Checkbox({ checked = false, id, label, onClick }: CheckboxProps) {

    const { control } = useFormContext();


    return (
        <div className="flex items-center space-x-2">
            <Controller
                name={id}
                control={control}
                defaultValue={checked}
                render={({ field }) => (
                    <CheckboxUI
                        id={id}
                        className="border-gray-600 data-[state=checked]:bg-blue-600 data-[state=checked]:border-blue-600"
                        onClick={onClick}
                        checked={field.value}
                        onCheckedChange={(value) => field.onChange(value)}
                    />
                )}

            />

            <Label htmlFor={id} className="text-gray-200 text-sm">
                {label}
            </Label>
        </div>
    )
}