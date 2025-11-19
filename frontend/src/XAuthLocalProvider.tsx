import React, {useState} from 'react';
import {XUtilsMetadata} from "@chilibase/frontend/XUtilsMetadata";
import {XLoginForm} from "@chilibase/frontend/XLoginForm";
import useXToken from "@chilibase/frontend/useXToken";

// TODO - does not work (very old code) - implement creating bearer token, use nestjs modul to process bearer token on backend
// - add logout

export const XAuthLocalProvider = ({children}: {children: React.ReactNode;}) => {
    return (
        <AppAuthLocal>
            {children}
        </AppAuthLocal>
    );
}

function AppAuthLocal({children}: {children: React.ReactNode;}) {

    const [xToken, setXToken] = useXToken();

    const [initialized, setInitialized] = useState(false);

    // useEffect(() => {
    //     fetchAndSetXEntityMap();
    // },[]); // eslint-disable-line react-hooks/exhaustive-deps

    const fetchAndSetXMetadata = async () => {
        await XUtilsMetadata.fetchAndSetXEntityMap();
        await XUtilsMetadata.fetchAndSetXBrowseMetaMap();
        setInitialized(true);
    }

    // const logout = () => {
    //     XUtils.setXToken(null);
    //     setInitialized(false);
    // }

    let elem;
    if (xToken === null) {
        elem = <div className="App-form"><XLoginForm setXToken={setXToken}/></div>;
    }
    else {
        if (!initialized) {
            elem = <div className="App-form">App is being initialized...</div>;
            fetchAndSetXMetadata();
        }
        else {
            elem = children;
        }
    }

    return elem;
}
