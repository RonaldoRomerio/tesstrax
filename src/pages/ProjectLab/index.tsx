import PhotoDisplay from "@/components/layouts/PhotoDisplay"
import { useContext, useEffect, useState } from "react"
import BoxEditor from "@/components/layouts/BoxEditor";
import type { Box } from "@/components/layouts/BoxEditor/types";
import CardTemplate from "@/components/layouts/Card";
import Table from "@/components/layouts/Table/TableBoxes";
import Menu from "@/components/layouts/Menu";
import ButtonMenu from "@/components/micro/button/ButtonMenu";
import { LucideGalleryHorizontalEnd, BookCopy } from "lucide-react";
import { useNavigate } from "react-router-dom";
import DragButtonMenu from "@/components/Templates/DragButtonMenu";
import TrainingConfig from "../Modals/TrainingConfig";
import { contexts } from "@/context";
export default function ProjectLab() {

  const {images} = useContext(contexts.ProjectContext)

  const [isFormOpen, setIsFormOpen] = useState<boolean>(false)
  const [currentIndex, setCurrentIndex] = useState<number>(0)
  const [newBox, setNewBox] = useState<Box | null>(null);
  const [lineBox, setLineBox] = useState<Box[]> ([]);

  useEffect(() => {
    console.log(lineBox);
  },[lineBox])


  const Navigate = useNavigate()
  const contentDisplay = (
    <BoxEditor image_actual={images[currentIndex]} box={[newBox, setNewBox]} arrayBoxes={[lineBox, setLineBox]}/>
  )

  return (
    <>
      <div className="min-h-screen grid grid-cols-1 lg:grid-cols-[65%_35%]">
        <div className="bg-gray-700 flex items-center justify-center p-4 relative">
          <PhotoDisplay DisplayControl={[currentIndex, setCurrentIndex]}
            children={contentDisplay}
            QuantifiedImages={images.length} />
        </div>
        <CardTemplate title="Localização das boxes" children={<Table lineBoxes={[lineBox, setLineBox]}/>} />
      </div>
      <Menu>
        <DragButtonMenu>
          <ButtonMenu
            icon={<BookCopy className="h-5 w-5" />}
            onClick={() => { return setIsFormOpen(!isFormOpen) }}
            title="Treinamento"
            index={1} />
          <ButtonMenu
            icon={<LucideGalleryHorizontalEnd className="h-5 w-5" />}
            onClick={() => { return Navigate("/Gallery") }}
            title="Galeria"
            index={2} />
        </DragButtonMenu>
      </Menu>
      <TrainingConfig estado={[isFormOpen, setIsFormOpen]}/>
    </>

  )
}