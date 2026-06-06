import {TextField} from "@chilibase/frontend/text-field";
import {SourceCodeLinkForm} from "./SourceCodeLinkForm";
import {SourceCodeLinkEntity} from "./SourceCodeLinkEntity";
import {NumberField} from "@chilibase/frontend/number-field";
import {XUtils} from "@chilibase/frontend/utils";
import {FormFooter, FormHeader, FormBaseModif} from "@chilibase/frontend/form";
import {MultilineTextField} from "@chilibase/frontend/multiline-text-field";
import {DateField} from "@chilibase/frontend/date-field";
import {AutocompleteField} from "@chilibase/frontend/autocomplete-field";
import {ClientBrowse} from "./ClientBrowse";
import {ClientForm} from "./ClientForm";
import {CarBrowse} from "./CarBrowse";
import {CarForm} from "./CarForm";
import type {FormProps} from "@chilibase/frontend/form";
import type {CarReservation} from "../model/car-reservation.entity.ts";
import {FormCol, FormRow} from "@chilibase/frontend/form-layout";

export class CarReservationForm extends FormBaseModif {

    constructor(props: FormProps) {
        super(props, "CarReservation");
    }

    render() {
        return (
            <div>
                <FormHeader form={this} label="Car reservation"/>
                <FormRow>
                    <FormCol>
                        <NumberField form={this} field="id" label="ID" readOnly={true}/>
                        <AutocompleteField form={this} assocField="client" label="Client" width="30rem"
                                       displayField={["name", "birthDate", "address"]} sortField="name" scrollHeight="25rem"
                                       suggestionsLoad="lazy"
                                       SearchBrowse={ClientBrowse} AssocForm={ClientForm}
                        />
                        <DateField form={this} field="dateFrom" label="Date from"/>
                        <DateField form={this} field="dateTo" label="Date to"/>
                        <AutocompleteField form={this} assocField="car" label="Car"
                                       displayField={["id", "brandAssoc.brand", "color"]} scrollHeight="25rem"
                                       suggestionsLoad="lazy"
                                       SearchBrowse={CarBrowse} AssocForm={CarForm}/>
                        <NumberField form={this} field="price" label="Price"/>
                        <MultilineTextField form={this} field="comment" label="Comment" rows={2} autoResize={true}/>
                        <DateField form={this} field="modifDate" label="Modified at" readOnly={true}/>
                        <TextField form={this} field="modifUser.name" label="Modified by" readOnly={true} inputStyle={{width: '12.5rem'}}/>
                    </FormCol>
                </FormRow>
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
