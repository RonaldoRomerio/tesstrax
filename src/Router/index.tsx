import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "../App";
import Home from "../pages/Home";
import ProjectLab from "@/pages/ProjectLab";
import Gallery from "@/pages/Gallery";
import Training from "@/pages/Training";

const routes = createBrowserRouter([
    {
        path: "/",
        element: <App/>,
        children: [{
            path: "/",
            element: <Home/>
        },
        {
            path: "/ProjectLab",
            element: <ProjectLab/>
        },
        {
            path: "/Gallery",
            element: <Gallery/>
        },
        {
            path: "/Training",
            element: <Training/>
        }
        ]
    }
])

function Router(){
    return(
        <RouterProvider router={routes}/>
    )
}

export default Router;