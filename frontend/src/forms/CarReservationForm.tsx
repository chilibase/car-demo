import {XInputText} from "@chilibase/frontend/XInputText";
import {SourceCodeLinkForm} from "./SourceCodeLinkForm";
import {SourceCodeLinkEntity} from "./SourceCodeLinkEntity";
import {XInputDecimal} from "@chilibase/frontend/XInputDecimal";
import {XUtils} from "@chilibase/frontend/XUtils";
import {XFormFooter} from "@chilibase/frontend/XFormFooter";
import {XFormHeader} from "@chilibase/frontend/XFormHeader";
import {XFormBaseModif} from "@chilibase/frontend/XFormBaseModif";
import type {XObject} from "@chilibase/frontend/XObject";
import {XInputTextarea} from "@chilibase/frontend/XInputTextarea";
import {XInputDate} from "@chilibase/frontend/XInputDate";
import {XAutoComplete} from "@chilibase/frontend/XAutoComplete";
import {ClientBrowse} from "./ClientBrowse";
import {ClientForm} from "./ClientForm";
import {CarBrowse} from "./CarBrowse";
import {CarForm} from "./CarForm";
import type {XFormProps} from "@chilibase/frontend/XFormBase";
import type {CarReservation} from "../model/car-reservation.entity.ts";

export class CarReservationForm extends XFormBaseModif {

    constructor(props: XFormProps) {
        super(props, "CarReservation");

        // row Brand (used in XAutoComplete for Car) is not joined automatically
        //this.addField("car.brandAssoc.brand");
    }

    createNewObject(): XObject {
        return {version: 0};
    }

    render() {
        return (
            <div>
                <XFormHeader form={this} label="Car reservation"/>
                <div className="x-form-row">
                    <div className="x-form-col">
                        <XInputDecimal form={this} field="id" label="ID" readOnly={true}/>
                        <XAutoComplete form={this} assocField="client" label="Client" width="30rem"
                                       displayField={["name", "birthDate", "address"]} sortField="name" scrollHeight="25rem"
                                       suggestionsLoad="lazy"
                                       SearchBrowse={ClientBrowse} AssocForm={ClientForm}
                        />
                        <XInputDate form={this} field="dateFrom" label="Date from"/>
                        <XInputDate form={this} field="dateTo" label="Date to"/>
                        <XAutoComplete form={this} assocField="car" label="Car"
                                       displayField={["id", "brandAssoc.brand", "color"]} scrollHeight="25rem"
                                       suggestionsLoad="lazy"
                                       SearchBrowse={CarBrowse} AssocForm={CarForm}/>
                        <XInputDecimal form={this} field="price" label="Price"/>
                        <XInputTextarea form={this} field="comment" label="Comment" rows={2} autoResize={true}/>
                        <XInputDate form={this} field="modifDate" label="Modified at" readOnly={true}/>
                        <XInputText form={this} field="modifXUser.name" label="Modified by" readOnly={true} inputStyle={{width: '12.5rem'}}/>
                    </div>
                </div>
                <XFormFooter form={this}/>
                <SourceCodeLinkForm sourceCodeFile="CarReservationForm.tsx"/>
                <SourceCodeLinkEntity sourceCodeFile="car-reservation.entity.ts"/>
            </div>
        );
    }
}

// docasne
// type XCreateObject<T> = (params?: XParams) => Promise<T>;
// type XFields = (params?: XParams) => string[];
// type XLoadObject<T> = (id: number, params?: XParams) => Promise<T>;


// static function (can be used without instantiating)
(CarReservationForm as any).createObject = async (): Promise<CarReservation> => {
    return {version: 0, price: 32200} as CarReservation;
}

// static function (can be used without instantiating)
// (CarReservationForm as any).assocList = (params?: XParams): string[] => {
//     return ["client", "car.brandAssoc", "modifXUser"];
// }

// static function (can be used without instantiating)
// not supported for now
// (CarReservationForm as any).fieldList = (params?: XParams): string[] => {
//     return ["client.name", "car.brandAssoc.brand", "modifXUser.name"];
// }

// static function (can be used without instantiating)
(CarReservationForm as any).loadObject = async (id: number): Promise<CarReservation> => {
    //console.log('pustame sleep 2500');
    //await new Promise(r => setTimeout(r, 2500));
    return XUtils.fetchById("CarReservation", ["client", "car.brandAssoc", "modifXUser"], id);
}


// registration is used if user opens form from editable Browse saved in DB
XUtils.registerAppForm(<CarReservationForm/>, "CarReservation");
