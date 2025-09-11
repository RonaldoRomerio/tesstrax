import type { ProjectLineProps } from "./types";

export default function RecentProjectLine(line_info: ProjectLineProps) {
    return (
        <li className=" bg-black/20 rounded p-3 hover:bg-black/40 cursor-pointer" key={line_info.key} 
            onClick={line_info.onClick} >
            <div className="text-left">
                <h2 className="text-md font-bold text-white mb-2">Nome do projeto: {line_info.Data.project_name}</h2>
                <p className="text-sm text-gray-400 font-medium">Pasta base: {line_info.Data.base_path_photos}</p>
                <p className="text-sm text-gray-400 font-medium">Pasta Destino: {line_info.Data.destination_path_photos}</p>
            </div>
        </li>
    )
}
