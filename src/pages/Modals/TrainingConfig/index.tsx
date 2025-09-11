import Modal from "@/components/layouts/Modal";
import { Inputs } from "@/components/micro/input";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import z from "zod";

type Props = {
  estado: [boolean, React.Dispatch<React.SetStateAction<boolean>>];
};

const newProjectSchema = z.object({
    project_name: z.string(),
    base_path_photos: z.string()
})

type newProjectSchemaType = z.infer<typeof newProjectSchema>
export default function TrainingConfig({estado} : Props) {


    const Navigate = useNavigate();

    const methods = useForm<newProjectSchemaType>({
        resolver: zodResolver(newProjectSchema)
    });

    function handleSubmitTeste(data: any) {
        console.log(data)

        return Navigate('/ProjectLab')
    }
    return (
        <Modal
            title="Configuração do treinamento"
            open={estado[0]}
            onOpenChange={estado[1]}>
            <FormProvider {...methods}>
                <form className="space-y-6" onSubmit={methods.handleSubmit(handleSubmitTeste)}>
                    <Inputs.InputText id="project_name"
                        placeholder="Digite o nome do projeto"
                        label="Modelo Inicial"
                        required={true} />
                    <Inputs.InputText id="project_name"
                        placeholder="Digite o nome do projeto"
                        label="Modelo Inicial"
                        required={true} />
                    <Inputs.InputText id="project_name"
                        placeholder="Digite o nome do projeto"
                        label="Taxa de aprendizado mínima"
                        required={true} />
                    <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white">Confirmar</Button>
                </form>
            </FormProvider>
        </Modal>
    )
}