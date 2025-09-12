import React, {useState} from "react";
import {Menubar} from "primereact/menubar";
import {CarBrowse} from "./forms/CarBrowse";
import {XFormNavigator3} from "@chilibase/frontend/XFormNavigator3";
import {BrandBrowse} from "./forms/BrandBrowse";
import {XUtils} from "@chilibase/frontend/XUtils";
import {XUserBrowse} from "@chilibase/frontend/XUserBrowse";
import {XBrowseMetaBrowse} from "@chilibase/frontend/XBrowseMetaBrowse";
import {XHolder1, XHolder2} from "@chilibase/frontend/XHolders";
import { User } from "@auth0/auth0-react";
import {XEditBrowse} from "@chilibase/frontend/XEditBrowse";
import {ClientBrowse} from "./forms/ClientBrowse";
import {CarReservationBrowse} from "./forms/CarReservationBrowse";

// TODO - v buducnosti presunut do XReactWebLib
export const XMenu = (props: {defaultFormElement?: any; logout: () => void; user?: User | undefined}) => {

    const [rootFormElement, setRootFormElement] = useState<any>(props.defaultFormElement);
    const [renderHolder1, setRenderHolder1] = useState<boolean>(true);

    const items = [
        {
            label:'Application',
            items:[
                {label:'Brands', command: () => {openForm(<BrandBrowse/>);}},
                {label:'Cars', command: () => {openForm(<CarBrowse/>);}},
                {label:'Clients', command: () => {openForm(<ClientBrowse/>);}},
                {label:'Car reservations', command: () => {openForm(<CarReservationBrowse/>);}}
            ]
        },
        // {
        //     label:'Runtime edit',
        //     items:[
        //         {label:'Brand - runtime edit', command: () => {openForm(<XEditBrowse entity="Brand"/>);}},
        //         {label:'Car - runtime edit', command: () => {openForm(<XEditBrowse entity="Car"/>);}}
        //     ]
        // },
        {
            label:'Administration',
            items:[
                {label:'Users', command: () => {openForm(<XUserBrowse/>);}}
                //{label:'Browses', command: () => {openForm(<XBrowseMetaBrowse/>);}}
                //{label:'Change password', command: () => {openForm(<XChangePasswordForm setXToken={props.setXToken}/>);}}
            ]
        },
        {
            label:'Log off',
            icon:'pi pi-fw pi-power-off',
            command: props.logout
        }
    ];

    const openForm = (newFormElement: any) => {
        setRootFormElement(newFormElement);
        // we want refresh the whole element tree (call constructors of class components, call componentDidMount methods to refresh data, ...)
        // change of Holder1 to Holder2 and back will cause mounting of new component tree
        // without this, changing from <XBrowse entity="Brand"/> to <XBrowse entity="Car"/> will not work (component tree will not change)
        setRenderHolder1(!renderHolder1);
    }

    /* dropdown ide nalavo, backend + user ide napravo (pomocou marginLeft: 'auto') - este boli potrebne zmeny v App.css */
    const end: any = (
        <div className="flex" style={{width: '100%'}}>
            <div className="flex align-content-center" style={{marginLeft: 'auto'}}>
                {!XUtils.isMobile() ? <div style={{padding: '0.5rem'}}>Backend: {XUtils.getXBackendUrl()}</div> : null}
                <div style={{padding: '0.5rem'}}>User: {/*XUtils.getUsername()*/XUtils.getXToken()?.xUser?.name}</div>
            </div>
        </div>
    );

    // little workaround - see remark in function openForm
    let holderWithNavigator;
    if (renderHolder1) {
        holderWithNavigator = <XHolder1 element={<XFormNavigator3 rootFormElement={rootFormElement}/>}/>;
    }
    else {
        holderWithNavigator = <XHolder2 element={<XFormNavigator3 rootFormElement={rootFormElement}/>}/>;
    }

    return (
        <div>
            <Menubar id="menuId" model={items} end={end} className="mb-1"/>
            {holderWithNavigator}
        </div>
    );
}
