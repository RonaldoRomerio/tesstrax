import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useFormContext } from "react-hook-form";
import type { InputPatternProps } from "../types/types";

export default function InputText(inputInfo: InputPatternProps) {

    const {register} = useFormContext();

    return (
        <div className="space-y-2">
            <Label htmlFor={inputInfo.id} className="text-gray-200">
                {inputInfo.label}
            </Label>
            <Input
                id={inputInfo.id}
                type="text"
                placeholder={inputInfo.placeholder}
                className="bg-gray-700 border-gray-600 text-white placeholder:text-gray-400 focus:border-gray-500"
                {...register(inputInfo.id)}
            />
        </div>
    )
}