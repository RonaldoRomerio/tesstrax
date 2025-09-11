import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import type { TPhotoDisplay } from "./types";

export default function EditorBoxPhotoDisplay({children, DisplayControl, QuantifiedImages} : TPhotoDisplay) {

    const [currentIndex, setCurrentIndex] = DisplayControl
    const goToPrevious = () => {
        setCurrentIndex((prevIndex) => (prevIndex === 0 ? QuantifiedImages - 1 : prevIndex - 1))
    }

    const goToNext = () => {
        setCurrentIndex((prevIndex) => (prevIndex === QuantifiedImages - 1 ? 0 : prevIndex + 1))
    }

    return (
        
            <div className="w-full h-full max-w-4xl max-h-[80vh] relative">
                <div className="h-full flex justify-center items-center">
                    {children}
                </div>
                {/* Navigation Buttons */}
                <Button
                    variant="outline"
                    size="icon"
                    className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-gray-800 hover:bg-purple-700 backdrop-blur-sm border-purple-700"
                    onClick={goToPrevious}
                >
                    <ChevronLeft className="h-4 w-4 text-white" />
                </Button>

                <Button
                    variant="outline"
                    size="icon"
                    className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-gray-800 hover:bg-purple-700 backdrop-blur-sm border-purple-700"
                    onClick={goToNext}
                >
                    <ChevronRight className="h-4 w-4 text-white" />
                </Button>

                <div className="absolute top-4 right-4 bg-black/50 text-white px-3 py-1 rounded-full text-sm backdrop-blur-sm">
                    {currentIndex + 1} / {QuantifiedImages}
                </div>
            </div>
    )
}