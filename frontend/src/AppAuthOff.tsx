
import {useState} from 'react';
// import './App.css'; - tu bol povodne
import {XMenu} from "./XMenu";
import {XUtilsMetadata} from "@chilibase/frontend/XUtilsMetadata";
import {XUtils} from "@chilibase/frontend/XUtils";

import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import 'primeflex/primeflex.css';

import './App.css'; // bol povodne ako prve css
import type {XPostLoginRequest} from "./serverApi/XPostLoginIfc";
import {Utils, XUserNotFoundOrDisabledError} from "./Utils";
import {Button} from "primereact/button";
import {XEnvVar} from "@chilibase/frontend/XEnvVars";


// TODO - v buducnosti presunut do XReactWebLib
function AppAuthOff() {

    const [loggedIn, setLoggedIn] = useState(false);
    const [initialized, setInitialized] = useState(false);

    // useEffect(() => {
    //     fetchAndSetXEntityMap();
    // },[]); // eslint-disable-line react-hooks/exhaustive-deps

    const initializeApp = async () => {
        try {
            await getAndSetAccessToken();
            await fetchAndSetXMetadata();
            // vsetko zbehlo, app-ka je inicializovana
            setInitialized(true);
        }
        catch (err) {
            if (err instanceof XUserNotFoundOrDisabledError) {
                // prihlasil sa napr. gmail user, ktory nie je uvedeny v DB
            }
            else {
                // ak bola ina chyba, aplikacia spadne
                throw err;
            }
        }
    }

    const getAndSetAccessToken = async () => {

        // TODO - provizorne
        // XUtils.getAccessToken() vyhadzuje chybu ak je accessToken null
        // post-login potrebuje accessToken, preto ho uz tu setneme
        XUtils.setXToken({accessToken: 'dummy'});

        // zavolame post-login
        const username: string = Utils.getEnvVarValue(XEnvVar.VITE_AUTH_OFF_USERNAME);
        let xPostLoginResponse;
        try {
            const xPostLoginRequest: XPostLoginRequest = {username: username};
            xPostLoginResponse = await XUtils.fetch('post-login', xPostLoginRequest);
        }
        catch (e) {
            // console.log(typeof e);
            // console.log(e instanceof Error);
            const error: Error = e as Error;
            // console.log(JSON.stringify(error));
            console.log(error.stack);
            // console.log(error.message);
            // console.log(error.name);
            // @ts-ignore
            console.log(error.cause);

            XUtils.showErrorMessage('post-login failed', e);
            throw 'post-login failed';
        }

        if (xPostLoginResponse.xUser === undefined) {
            // nenasli sme usera v DB
            alert(`User account "${username}" not found in DB. Login not permitted. Ask admin to create user account in DB.`);
            // pouzijeme custom exception ktoru neskor odchytime (krajsie riesenie ako vracat true/false)
            throw new XUserNotFoundOrDisabledError();
        }

        if (!xPostLoginResponse.xUser.enabled) {
            // user je disablovany
            alert(`User account "${username}" is not enabled. Ask admin to enable user account.`);
            // pouzijeme custom exception ktoru neskor odchytime (krajsie riesenie ako vracat true/false)
            throw new XUserNotFoundOrDisabledError();
        }

        // ulozime si usera do access token-u - zatial take provizorne, user sa pouziva v preSave na setnutie vytvoril_id
        // TODO - tu provizorne accessToken: 'dummy', bolo accessToken: undefined
        XUtils.setXToken({accessToken: 'dummy', xUser: xPostLoginResponse.xUser});
        setLoggedIn(true);

        console.log("App - bol uspesne zavolany getAndSetAccessToken");
    }

    const fetchAndSetXMetadata = async () => {
        await XUtilsMetadata.fetchAndSetXEntityMap();
        console.log("App - bol zavolany XUtilsMetadata.fetchAndSetXEntityMap()");
        await XUtilsMetadata.fetchAndSetXBrowseMetaMap();
        console.log("App - bol zavolany XUtilsMetadata.fetchAndSetXBrowseMetaMap()");
    }

    const logout = () => {
        console.log("zavolany logout");
        XUtils.setXToken(null);
        setLoggedIn(false);
        setInitialized(false);
    }

    let elem;
    if (!loggedIn) {
        elem = <div className="App-form"><Button onClick={initializeApp}>Log In</Button></div>;
    }
    else {
        if (!initialized) {
            elem = <div className="App-form">App is being initialized...</div>;
        } else {
            elem = <XMenu defaultFormElement={null} logout={logout}/>;
        }
    }

    return (
        <div className="App">
            {elem}
        </div>
    );
}

export default AppAuthOff;
