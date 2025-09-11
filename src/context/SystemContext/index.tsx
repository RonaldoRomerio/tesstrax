import { createContext, useState } from "react";
import type { systemContextProps, project_prop, config, Preferences } from "../types";
import { invoke } from "@tauri-apps/api/core";


export const SystemContext = createContext<systemContextProps>(
    {
        preferences: {
            config: { tesseract_path: "" },
            recent_list: []
        },
        methods: {
            init_system: () => { }
        },
        set_hooks: {
            setConfigHook: null
        }
    }
)

export const SystemContextProvider = ({ children }: { children: React.ReactNode }) => {

    const [getRecentList, setRecentList] = useState<project_prop[]>([]);
    const [getConfig, setConfig] = useState<config>({ tesseract_path: "" });
    
    async function init_system() {
        try {
            let preferences : Preferences = await invoke('init_system');

            const recentListWithoutNullValue = preferences.recent_list.filter(value => value !== null)

            setRecentList(recentListWithoutNullValue);
            setConfig(preferences.config);
        } catch (error: any) {
            console.error(error)
        }
    }


    return (
        <SystemContext.Provider value={{
            preferences: {
                config: getConfig,
                recent_list: getRecentList
            },
            methods: {
                init_system: init_system
            },
            set_hooks: {
                setConfigHook: setConfig
            }
        }}>
            {children}
        </SystemContext.Provider>
    )
}