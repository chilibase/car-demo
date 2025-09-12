import {createBrowserRouter, RouterProvider} from "react-router";
import {CarDemoMainLayout} from "./CarDemoMainLayout.tsx";
import {BrandBrowse} from "./forms/BrandBrowse.tsx";
import {CarBrowse} from "./forms/CarBrowse.tsx";
import {ClientBrowse} from "./forms/ClientBrowse.tsx";
import {CarReservationBrowse} from "./forms/CarReservationBrowse.tsx";
import {XUserBrowse} from "@chilibase/frontend/XUserBrowse";

export const CarDemoRouterProvider = () => {
    const router = createBrowserRouter([
        {
            // no path on this parent route, just the component
            Component: CarDemoMainLayout,
            children: [
                {path: "/", element: <div/>},
                {path: "/brands", Component: BrandBrowse},
                {path: "/cars", Component: CarBrowse},
                {path: "/clients", Component: ClientBrowse},
                {path: "/car-reservations", Component: CarReservationBrowse},
                {path: "/users", Component: XUserBrowse}
            ]
        }
    ]);

    return <RouterProvider router={router}/>;
}