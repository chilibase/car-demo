import ReactDOM from "react-dom/client";
import * as serviceWorker from './serviceWorker';
import {XUtils} from "@chilibase/frontend/XUtils";
import {setLocale} from "./Locale";
import {Utils} from "./Utils.tsx";
import {XApp} from "./XApp.tsx";
import {CarDemoRouterProvider} from "./CarDemoRouterProvider.tsx";

// PrimeReact / PrimeFlex / PrimeIcons global styles
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import 'primeflex/primeflex.css';

// Your own global styles (if any)
import './index.css';

XUtils.initLib(Utils.getEnvVarValue);

setLocale();

const container = document.getElementById("root");
if (container !== null) {
    const root = ReactDOM.createRoot(container);
    root.render(<XApp><CarDemoRouterProvider/></XApp>);
}
else {
    console.log('element with id="root" not found');
}

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
