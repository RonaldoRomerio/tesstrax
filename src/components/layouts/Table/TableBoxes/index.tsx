import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Trash2 } from "lucide-react"
import type { tableBoxesProps } from "./types"
export default function Table({lineBoxes} : tableBoxesProps) {
    const [rows, setRows] = lineBoxes;
    return (
        <div className="w-full max-w-6xl overflow-auto">
            <div className="flex-1 overflow-auto p-4">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="text-white">
                            <tr>
                                <th className="px-2 py-2 text-left font-semibold">Img.</th>
                                <th className="px-2 py-2 text-center font-semibol">Coordenadas</th>
                                <th className="px-2 py-2 text-left font-semibold">Linha</th>
                                <th className="px-2 py-2 text-left font-semibold ">Conteúdo</th>
                                <th className="px-2 py-2 text-center font-semibold">Ações</th>
                            </tr>
                        </thead>    
                        <tbody>
                            {rows.map((row, index) => (
                                <tr key={index} className={index % 2 === 0 ? "bg-background" : "bg-muted/20"}>
                                    <td className="px-2 py-2">
                                        <div className="flex justify-center w-1/2">
                                            <img src="http://www.feebpr.org.br/images/media/40656790066264305508b0.jpg"/>
                                        </div>
                                    </td>
                                    <td className="px-2 py-2">
                                        <span className="text-sm font-mono text-white px-2 py-1 rounded whitespace-nowrap">
                                            {row.x_max}, {row.x_min}, {row.y_max}, {row.y_min}
                                        </span>
                                    </td>
                                    <td className="px-2 py-2">
                                        <Input
                                            type="text"
                                            value={row.line}
                                            placeholder="Digite a linha..."
                                            className="w-full text-white"
                                        />
                                    </td>
                                    <td className="px-2 py-2">
                                        <Input
                                            type="text"
                                            value={row.content ? row.content : ""}
                                            placeholder="Digite o conteúdo..."
                                            className="w-full text-white"
                                        />
                                    </td>
                                    <td className="px-2 py-2">
                                        <div className="flex justify-center">
                                            <Button
                                                variant="ghost"
                                                size="sm"
                                                className="text-destructive hover:text-destructive hover:bg-destructive/10"
                                                disabled={rows.length === 1}
                                            >
                                                <Trash2 className="h-4 w-4" />
                                            </Button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {rows.length === 0 && (
                <div className="text-center py-8 text-muted-foreground">
                    <p>Nenhuma linha na tabela. Desenhe sua primeira caixa.</p>
                </div>
            )}
        </div>
    )
}
