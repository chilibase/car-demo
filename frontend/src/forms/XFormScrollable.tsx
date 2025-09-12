import React from "react";
import {XUtils} from "@chilibase/frontend/XUtils";
import {XFormBase} from "@chilibase/frontend/XFormBase";

export interface XFormScrollableProps {
    form: XFormBase;
    maxWidth?: string; // e.g. 83rem - vyuziva sa na zuzenie XInputTextarea s width=100% (aby XInputTextarea nebol na cely display)
    widthFitContent?: boolean; // ak je vertikalny scrollbar daleko od obsahu (lebo sirka elementu sa defaultne vzdy natahuje na celeho parenta), treba nastavit na true
                                // problem je ze v tab-kach nam stlaca obsah (tam kde mame textarea fieldy) a to nechceme (bolo by fajn mat nejake krajsie riesenie)
                                // (pouziva sa mimo tab-iek)
    headerFooterHeight?: string; // e.g. 10rem, 140px, 140 (means px)
    headerFooterHeightInDialog?: string; // toto je hack-fix koli formu KlientSluzbaForm - AlzbetaOsetrovna - zjavoval sa tam vertikalny scrollbar v dialogu (v klientovi noclaharne neni tento problem)
    fixedHeight?: boolean; // ak mame tab-ky, obsah kazdej tab-ky ma inu vysku a ked je vyska tab-ky mensia ako vyska disposable priestoru (nemame vertikalny scrollbar),
                            // tak nam buttony Save, Cancel "skacu" hore dole pri prepinani tab-iek (a ked sme v dialogu tak skace cely dialog, co je este horsie)
                            // tymto priznakom skakanie odstranime
                            // (TODO - pre tab-ky kde nechceme obsah natahovat na celu vysku disposable priestoru, treba sem posuvat konstantu v rem a pouzivat height = min(<vyratana vyska>, <konstanta>))
    marginsWidth?: string; // e.g. 10rem, 140px, 140 (means px)
    children: JSX.Element | JSX.Element[];
}

export const XFormScrollable = (props: XFormScrollableProps) => {
    // TODO - tahat konstanty '12.2rem' a '4rem' odniekial z XUtils (a do XUtils nastavit pri spusteni)
    let headerFooterHeight: number = XUtils.toPX0(props.headerFooterHeight ?? '11.2rem'); // zistene skusanim priamo v browseri - sedi na depaul projekt (jeho menu)
    if (props.form.isInDialog()) {
        headerFooterHeight += XUtils.toPX0(props.headerFooterHeightInDialog ?? '2.8rem'); // v dialogu sa zjavil vertikalny scrollbar v browseri, tak to trosku upraceme
    }
    const maxHeight: string = `calc(100vh - ${headerFooterHeight}px)`;

    // 2.6rem zistene skusanim priamo v browseri - zrejme zodpoveda margin-om na uplnych okrajoch stranky
    // 1rem pre mobil je padding na body elemente (okraje mobilu)
    let marginsWidth: number = XUtils.toPX0(props.marginsWidth ?? (XUtils.isMobile() ? '1rem' : '2.6rem'));
    if (props.form.isTabViewUsed()) {
        marginsWidth += XUtils.toPX0('1rem'); // TabPanel has padding 0.5rem (in css file) -> 1rem both margins
    }
    let maxWidth: string = `calc(100vw - ${marginsWidth}px)`;
    if (props.maxWidth) {
        maxWidth = `min(${maxWidth}, ${props.maxWidth})`;
    }
    // width: '100%' rozsiruje element na sirku parenta (dolezite napr. pre textarea) (minWidth/maxWidth override width (css rule)) - zatial sme ho zrusili...
    // maxHeight nam vytvori vertikalny scrollbar ak je formular prilis vysoky a nezmesti sa na aktualny viewport,
    // maxWidth stlaca sirku formulara na aktualny viewport (malokedy vznikne horizontalny scrollbar), udrzuje buttony Ulozit/Zrusit pekne v strede,
    // marginLeft: 'auto', marginRight: 'auto' centruje
    let style: React.CSSProperties = {marginLeft: 'auto', marginRight: 'auto', width: props.widthFitContent ? 'fit-content' : undefined, maxWidth: maxWidth, overflow: 'auto'};
    if (props.fixedHeight) {
        style = {...style, height: maxHeight};
    }
    else {
        style = {...style, maxHeight: maxHeight};
    }
    return (
        <div style={style}>
            {props.children}
        </div>
    );
}
