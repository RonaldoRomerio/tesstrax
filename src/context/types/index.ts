export interface config {
    tesseract_path: string;
}

export interface project_prop {
    project_name: String,
    base_path_photos: String,
    output_path_photos?: String|null,
    check_path_project: boolean
}

export interface Preferences {
    config: config,
    recent_list: project_prop[]
}

export interface Image {
    path: string,
    name: string,
    extension: string
}

export interface methodsSystemContext {
    init_system: () => void
}

export interface systemContextProps {
    preferences: Preferences,
    methods: methodsSystemContext,
    set_hooks : {
        setConfigHook: React.Dispatch<React.SetStateAction<config>> | null
    }
}
export interface methodsProjectContext {
    init_project: (data : project_prop) => void,
    init_a_existent_project: (data : project_prop) => void
}

export interface ProjectContextProps {
    project_prop : project_prop,
    images : Image[],
    methods : methodsProjectContext
}