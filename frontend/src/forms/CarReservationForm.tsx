import {InputText} from "@chilibase/frontend/input-text";
import {SourceCodeLinkForm} from "./SourceCodeLinkForm";
import {SourceCodeLinkEntity} from "./SourceCodeLinkEntity";
import {InputDecimal} from "@chilibase/frontend/input-decimal";
import {XUtils} from "@chilibase/frontend/XUtils";
import {FormFooter, FormHeader, FormBaseModif} from "@chilibase/frontend/form";
import {InputTextarea} from "@chilibase/frontend/input-textarea";
import {InputDate} from "@chilibase/frontend/input-date";
import {AutoComplete} from "@chilibase/frontend/auto-complete";
import {ClientBrowse} from "./ClientBrowse";
import {ClientForm} from "./ClientForm";
import {CarBrowse} from "./CarBrowse";
import {CarForm} from "./CarForm";
import type {FormProps} from "@chilibase/frontend/form";
import type {CarReservation} from "../model/car-reservation.entity.ts";

export class CarReservationForm extends FormBaseModif {

    constructor(props: FormProps) {
        super(props, "CarReservation");
    }

    render() {
        return (
            <div>
                <FormHeader form={this} label="Car reservation"/>
                <div className="x-form-row">
                    <div className="x-form-col">
                        <InputDecimal form={this} field="id" label="ID" readOnly={true}/>
                        <AutoComplete form={this} assocField="client" label="Client" width="30rem"
                                       displayField={["name", "birthDate", "address"]} sortField="name" scrollHeight="25rem"
                                       suggestionsLoad="lazy"
                                       SearchBrowse={ClientBrowse} AssocForm={ClientForm}
                        />
                        <InputDate form={this} field="dateFrom" label="Date from"/>
                        <InputDate form={this} field="dateTo" label="Date to"/>
                        <AutoComplete form={this} assocField="car" label="Car"
                                       displayField={["id", "brandAssoc.brand", "color"]} scrollHeight="25rem"
                                       suggestionsLoad="lazy"
                                       SearchBrowse={CarBrowse} AssocForm={CarForm}/>
                        <InputDecimal form={this} field="price" label="Price"/>
                        <InputTextarea form={this} field="comment" label="Comment" rows={2} autoResize={true}/>
                        <InputDate form={this} field="modifDate" label="Modified at" readOnly={true}/>
                        <InputText form={this} field="modifUser.name" label="Modified by" readOnly={true} inputStyle={{width: '12.5rem'}}/>
                    </div>
                </div>
                <FormFooter form={this}/>
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
    return {version: 0, price: 32200} as CarReservation; // init values
}

// static function (can be used without instantiating)
// (CarReservationForm as any).assocList = (params?: XParams): string[] => {
//     return ["client", "car.brandAssoc", "modifUser"];
// }

// static function (can be used without instantiating)
// not supported for now
// (CarReservationForm as any).fieldList = (params?: XParams): string[] => {
//     return ["client.name", "car.brandAssoc.brand", "modifUser.name"];
// }

// static function (can be used without instantiating)
(CarReservationForm as any).loadObject = async (id: number): Promise<CarReservation> => {
    //console.log('pustame sleep 2500');
    //await new Promise(r => setTimeout(r, 2500));
    return XUtils.fetchById("CarReservation", ["client", "car.brandAssoc", "modifUser"], id);
}
