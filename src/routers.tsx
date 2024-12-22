import { createBrowserRouter } from "react-router-dom";
import MainLayout from "./pages/MainLayout";
import NotFound from "./pages/NotFound";
import StartPage from "./pages/StartPage";
import GamePage from "./pages/GamePage";

const routers = createBrowserRouter([

    {
       
        element:<MainLayout/>,
        children: [
             {
                path: "/",
                element:<StartPage/>,
              
             },
         {
        path: "/gamePage",
        element:<GamePage/>
    },

    {
        path: "*",
        element:<NotFound/>
    },
]
}
])

export default routers;