import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import type { TCardTemplate } from "./types";
export default function CardTemplate({title,children} : TCardTemplate){
    return(
        <Card className=" rounded-none w-full bg-gray-800 border-gray-700 h-full">
            <CardHeader >
            <CardTitle className="text-white text-center">{title}</CardTitle>
            </CardHeader>
            <CardContent >
                {children}
            </CardContent>
        </Card>
    )
}