import {createBrowserRouter, RouterProvider} from "react-router";
import {AppMainLayout} from "./AppMainLayout.tsx";
import {BrandBrowse} from "./forms/BrandBrowse.tsx";
import {CarBrowse} from "./forms/CarBrowse.tsx";
import {ClientBrowse} from "./forms/ClientBrowse.tsx";
import {CarReservationBrowse} from "./forms/CarReservationBrowse.tsx";
import {ChangePasswordForm} from "@chilibase/frontend/administration";
import {CBUtils} from "@chilibase/frontend/utils";
import {CBEnvVar, ViteAuth} from "@chilibase/frontend/env-vars";
import {UserCarDemoBrowse} from "./forms/UserCarDemoBrowse.tsx";

export const AppRouterProvider = () => {
    const router = createBrowserRouter([
        {
            // no path on this parent route, just the component
            Component: AppMainLayout,
            children: [
                {path: "/", element: <div/>},
                // >> add project specific items here <<
                {path: "/brands", Component: BrandBrowse},
                {path: "/cars", Component: CarBrowse},
                {path: "/clients", Component: ClientBrowse},
                {path: "/car-reservations", Component: CarReservationBrowse},
                {path: "/users", Component: UserCarDemoBrowse},
                ...(CBUtils.getEnvVarValue(CBEnvVar.VITE_AUTH) === ViteAuth.LOCAL ? [{path: "/change-password", Component: ChangePasswordForm}] : [])
            ]
        }
    ]);

    return <RouterProvider router={router}/>;
}