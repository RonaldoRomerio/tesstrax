import { Button } from "@/components/ui/button"
import { open } from '@tauri-apps/plugin-dialog';
import { Inputs } from "@/components/micro/input";
import { FormProvider, useForm } from "react-hook-form"
import CardTemplate from "@/components/layouts/Card";
import { zodResolver } from "@hookform/resolvers/zod";
import { Settings } from "lucide-react"
import ButtonMenu from "@/components/micro/button/ButtonMenu";
import Menu from "@/components/layouts/Menu";
import { newProjectSchema, type newProjectSchemaType } from "./types";
import { useState, useEffect, useContext } from "react";
import type { project_prop } from "@/context/types";
import { LineList } from "@/components/layouts/ListPattern/Line";
import ListPattern from "@/components/layouts/ListPattern";
import { contexts } from "@/context";

export default function Home() {

  const { methods : SystemMethods, preferences } = useContext(contexts.SystemContext);
  const { methods : ProjectMethods} = useContext(contexts.ProjectContext);
  const [isDestinationInputVisible, setDestinationInputVisible] = useState(false);

  const ToggleDestinationInputVisibility = () => setDestinationInputVisible(!isDestinationInputVisible);

  useEffect(() => {
    SystemMethods.init_system();
  }, [])

  const FormMethods = useForm<newProjectSchemaType>({
    resolver: zodResolver(newProjectSchema)
  });

  function handle_init_new_project(data: newProjectSchemaType) {
    try {
      let project : project_prop = {
        project_name : data.project_name,
        base_path_photos: data.base_path_photos,
        output_path_photos: data.output_path_photos,
        check_path_project: data.check_path_project
      }
      
      ProjectMethods.init_project(project);
    } catch (error: any) {
      console.error(error)
    }
  }

  function handle_init_existent_project(data: project_prop) {
    try {
      let project : project_prop = {
        project_name : data.project_name,
        base_path_photos: data.base_path_photos,
        output_path_photos: data.output_path_photos,
        check_path_project: data.check_path_project
      }
      
      ProjectMethods.init_a_existent_project(project);
      
    } catch (error: any) {
      console.error(error)
    }
  }

  const handleSelecionarPasta = async (inputId: keyof newProjectSchemaType) => {
    try {
      const selected = await open({
        directory: true,
        multiple: false, // ou true se quiser permitir várias pastas
      })

      if (selected) {
        FormMethods.setValue(inputId, selected)
      }
    } catch (error) {
      console.error('Erro ao selecionar pasta:', error)
    }
  }


  return (
    <div className="flex flex-col justify-center items-center h-full w-full" >
      <Menu>
        <ButtonMenu
          icon={<Settings className="h-5 w-5" />}
          onClick={() => { }}
          title="Configurações" />
      </Menu>

      <div className="flex flex-row w-7xl justify-center" >

        <CardTemplate title="Projetos Recentes">
          <ListPattern>
            {preferences.recent_list.length > 0 ?
              preferences.recent_list.map((data, index) => (
                <LineList.RecentProjectLine key={index} Data={data} onClick={() => handle_init_existent_project(data)} />
              ))
              :
              <p className="text-sm text-gray-400 font-medium">Nenhum projeto recente adicionado</p>
            }
          </ListPattern>
        </CardTemplate>

        <CardTemplate title="Iniciar novo Projeto">
          <FormProvider {...FormMethods}>
            <form className="space-y-6" onSubmit={FormMethods.handleSubmit(handle_init_new_project)}>
              <Inputs.InputText id="project_name"
                placeholder="Digite o nome do projeto"
                label="Nome do Projeto"
                required={true} />
              <Inputs.InputPath id="base_path_photos"
                label="Banco de imagens"
                onClick={() => handleSelecionarPasta("base_path_photos")}
                required={true}
              />
              {isDestinationInputVisible ?
                <Inputs.InputPath id="output_path_photos"
                  label="Pasta Destino"
                  onClick={() => handleSelecionarPasta("output_path_photos")}
                  required={true}
                />
                : ''}
              <Inputs.Checkbox id="check_path_project"
                label="Converter imagens para Tiff e exportar para pasta destino"
                onClick={() => ToggleDestinationInputVisibility()} />
              <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white">Confirmar</Button>
            </form>
          </FormProvider>
        </CardTemplate>
      </div>
    </div>
  )
}
