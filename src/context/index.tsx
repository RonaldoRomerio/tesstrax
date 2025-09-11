import React from "react";
import { ProjectContext, ProjectContextProvider } from "./ProjectContext";
import { SystemContext, SystemContextProvider } from "./SystemContext";

export const contexts = {
    ProjectContext : ProjectContext,
    SystemContext : SystemContext
}

type Props = {
    children: React.ReactNode
}

export function ProviderContexts({children} : Props) {
    return(
        <SystemContextProvider>
            <ProjectContextProvider>
                {children}
            </ProjectContextProvider>
        </SystemContextProvider>
    )
}