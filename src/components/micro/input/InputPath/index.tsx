
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import type { InputPathProps } from "./types";
import { useFormContext } from "react-hook-form";
export default function InputPath({placeholder = '', id, label, onClick} : InputPathProps) {

    const {register} = useFormContext();

    return(
        <div className="space-y-2">
            <Label htmlFor={id} className="text-gray-200">
                {label}
            </Label>
            <div className="flex gap-2">
                <Input
                    id={id}
                    type="text"
                    readOnly
                    placeholder={placeholder}
                    className="bg-gray-700 border-gray-600 text-white placeholder:text-gray-400 flex-1"
                    {...register(id)}
                />
                <Button
                    type="button"
                    onClick={onClick}
                    className="bg-gray-600 hover:bg-gray-500 text-white px-4"
                >
                    Procurar
                </Button>
            </div>
        </div>
    )
}