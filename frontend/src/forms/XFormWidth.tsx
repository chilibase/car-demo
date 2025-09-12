import React from "react";
import {XFormBase} from "@chilibase/frontend/XFormBase";
import {XUtils} from "@chilibase/frontend/XUtils";

export interface XFormWidthProps {
    form: XFormBase;
    width: string; // e.g. 83rem - max sirka pre formular na ktoru obmedzi vyuziva sa na zuzenie XInputTextarea s width=100% (aby XInputTextarea nebol na cely display)
    children: JSX.Element | JSX.Element[];
}

// obmedzi sirku formulara na "width" (aby nezaberal celu sirku stranky) a zaroven vycentruje
export const XFormWidth = (props: XFormWidthProps) => {
    // na centrovanie nepouzivame flex, lebo flex meni sirku formulara (shrinkuje, treba zapnut grow aby nemenil)
    // marginLeft: 'auto', marginRight: 'auto' sposobi centrovanie
    let style: React.CSSProperties = {marginLeft: 'auto', marginRight: 'auto'};
    const width: string = `min(100vw - ${XUtils.isMobile() ? 1.2 : 2.2}rem, ${props.width})`; // ak je sirka display-a mensia ako zadana sirka (napr. pri mobile) tak sa pouzije sirka display-a (100vw - 1rem)
                                                                    // a vdaka tomu sa zapne scrollovanie v TabView (cez atribut scrollable)
                                                                    // hodilo by sa tu zadat min-content/fit-content ale tieto intrinsic values sa nedaju pouzit vo funkciach ako min/calc
    //if (props.form.isInDialog()) {
        // problem nam robi zobrazenie formu v dialogu, dialog shrinkuje formular, tak pre jednoduchost pouzijeme namiesto maxWidth surovy width
        // (surovy width zas znemozni zuzenie formulara pri "mobile" rozliseni)
        // toto je taky trosku docasny workaround, idealne by bolo nejako pomenit dialog aby sme mohli pouzit maxWidth
    //    style = {...style, width: width}
    //}
    //else {
        style = {...style, maxWidth: width}
    //}

    return (
        <div style={style}>
            {props.children}
        </div>
    );
}
