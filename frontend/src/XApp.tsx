import React from "react";
import {XAuth0Provider} from "./XAuth0Provider.tsx";
import {XEnvVar, XViteAuth} from "@chilibase/frontend/XEnvVars";
import {Utils} from "./Utils.tsx";
import AppAuthOff from "./AppAuthOff.tsx";
import {XMSEntraIDProvider} from "./XMSEntraIDProvider.tsx";

import './App.css'; // bol povodne ako prve css

export const XApp = ({children}: {children: React.ReactNode;}) => {
    let elem: React.ReactElement;
    if (Utils.getEnvVarValue(XEnvVar.VITE_AUTH) === XViteAuth.OFF) {
        elem =
            <React.StrictMode>
                <AppAuthOff />
            </React.StrictMode>;
    }
    else if (Utils.getEnvVarValue(XEnvVar.VITE_AUTH) === XViteAuth.LOCAL) {
        /* username/password authentication
        elem =
            <React.StrictMode>
                <AppLocal />
            </React.StrictMode>;
         */
        throw `XApp: Authentication not implemented for VITE_AUTH = ${Utils.getEnvVarValue(XEnvVar.VITE_AUTH)}`;
    }
    else if (Utils.getEnvVarValue(XEnvVar.VITE_AUTH) === XViteAuth.AUTH0) {
        elem = <XAuth0Provider>{children}</XAuth0Provider>;
    }
    else if (Utils.getEnvVarValue(XEnvVar.VITE_AUTH) === XViteAuth.MS_ENTRA_ID) {
        elem = <XMSEntraIDProvider>{children}</XMSEntraIDProvider>;
    }
    else {
        throw `XApp: Authentication not implemented for VITE_AUTH = ${Utils.getEnvVarValue(XEnvVar.VITE_AUTH)}`;
    }
    return (
        <div className="App">
            {elem}
        </div>
    );
}