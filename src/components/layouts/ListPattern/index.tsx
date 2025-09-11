import type { ListPatternProps } from "./types";

export default function ListPattern({children} : ListPatternProps) {

    return (
        <div className="w-full max-w-2xl mx-auto p-2  h-full">
            <ul className="space-y-2 h-64 overflow-auto p-2 ">
                {children}
            </ul>
        </div>
    )
}
