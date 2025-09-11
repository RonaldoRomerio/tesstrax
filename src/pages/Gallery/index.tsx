import Menu from "@/components/layouts/Menu"
import ButtonMenu from "@/components/micro/button/ButtonMenu"
import DragButtonMenu from "@/components/Templates/DragButtonMenu"
import PhotoGallery from "@/components/Templates/PhotoGallery"
import type { TPhotoGallery } from "@/components/Templates/PhotoGallery/types"
import { BookCopy, LucideToolCase } from "lucide-react"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import TrainingConfig from "../Modals/TrainingConfig"

export default function Gallery() {

    const Navigate = useNavigate()
    const [isFormOpen, setIsFormOpen] = useState(false)

    const photos: TPhotoGallery[] = [
        {
            key: 1,
            prevision: "Mountain Sunrise"
        },
        {
            key: 2,
            prevision: "Ocean Waves"
        },
        {
            key: 3,
            prevision: "Forest Path"
        },
        {
            key: 4,
            prevision: "City Skyline"
        },
        {
            key: 5,
            prevision: "Desert Dunes"
        },
        {
            key: 6,
            prevision: "Autumn Leaves"
        },
        {
            key: 7,
            prevision: "Snowy Mountains"
        },
        {
            key: 8,
            prevision: "Tropical Beach"
        },
        {
            key: 9,
            prevision: "Northern Lights"
        },
    ]

    return (
        <>
            <div className="h-screen py-12 px-4 sm:px-6 lg:px-8 overflow-auto">
                <div className="max-w-7xl mx-auto">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {photos.map((photo) => (
                            <PhotoGallery key={photo.key} prevision={photo.prevision} />
                        ))}
                    </div>
                </div>
            </div>
            <Menu>
                <DragButtonMenu>
                    <ButtonMenu
                        icon={<BookCopy className="h-5 w-5" />}
                        onClick={() => { return setIsFormOpen(!isFormOpen) }}
                        title="Treinamento"
                        index={1} />
                    <ButtonMenu
                        icon={<LucideToolCase className="h-5 w-5" />}
                        onClick={() => { return Navigate("/ProjectLab") }}
                        title="Galeria" />
                </DragButtonMenu>
            </Menu>
            <TrainingConfig estado={[isFormOpen, setIsFormOpen]} />
        </>
    )
}
