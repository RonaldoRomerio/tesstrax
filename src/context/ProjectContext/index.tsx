import { createContext, useState } from "react";
import type { project_prop,  Image,  ProjectContextProps } from "../types";
import { invoke } from "@tauri-apps/api/core";
import { useNavigate } from "react-router-dom";


export const ProjectContext = createContext<ProjectContextProps>(
    {
        project_prop: {
            project_name: "",
            base_path_photos: "",
            check_path_project: false,
            output_path_photos: ""
        },
        images: [],
        methods: {
            init_project : () => { },
            init_a_existent_project: () => { }
        }
    }
)

export const ProjectContextProvider = ({ children }: { children: React.ReactNode }) => {

    const Navigate = useNavigate();

    const [getImageList, setImageList] = useState<Image[]>([]);
    const [getProjectProp, setPojectProp] = useState<project_prop>({
        project_name: "",
        base_path_photos: "",
        check_path_project: false,
        output_path_photos: ""
    });
    async function init_project(project_prop : project_prop) {
        try {
            let imagesList: Image[] = await invoke<Image[]>('init_new_project', {
                data: project_prop
            });
            console.log(imagesList)
            setPojectProp(project_prop);
            setImageList(imagesList);
            Navigate("/projectLab")
        } catch (error: any) {
            console.error(error)
        }
    }
    
        async function init_a_existent_project(project_prop : project_prop) {
        try {
            let imagesList: Image[] = await invoke<Image[]>('init_exist_project', {
                data: project_prop
            });
            setPojectProp(project_prop);
            setImageList(imagesList);
            Navigate("/projectLab")
        } catch (error: any) {
            console.error(error)
        }
    }

    return (
        <ProjectContext.Provider value={{
            project_prop: getProjectProp,
            images: getImageList,
            methods: {
                init_project: init_project,
                init_a_existent_project: init_a_existent_project
            }
        }}>
            {children}
        </ProjectContext.Provider>
    )
}