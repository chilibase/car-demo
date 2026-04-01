import {InputText} from "@chilibase/frontend/input-text";
import type {FormProps} from "@chilibase/frontend/form";
import {Dropdown} from "@chilibase/frontend/dropdown";
import {BrandForm} from "./BrandForm";
import {
    FormDataTable,
    FormColumn,
    FormDropdownColumn
} from "@chilibase/frontend/form-data-table";
import {InputDecimal} from "@chilibase/frontend/input-decimal";
import {DateField} from "@chilibase/frontend/date-field";
import {SourceCodeLinkForm} from "./SourceCodeLinkForm";
import {SourceCodeLinkEntity} from "./SourceCodeLinkEntity";
import {CheckboxField} from "@chilibase/frontend/checkbox-field";
import type {FormErrorMap} from "@chilibase/frontend/form";
import {AutocompleteField} from "@chilibase/frontend/autocomplete-field";
import {FormFooter, FormHeader, FormBaseModif} from "@chilibase/frontend/form";
import {InputTextarea} from "@chilibase/frontend/input-textarea";
import type {EntityRow} from "@chilibase/frontend/common";
import type {Car} from "../model/car.entity.ts";
import {FormCol, FormRow} from "@chilibase/frontend/form-layout";

export class CarForm extends FormBaseModif {

    constructor(props: FormProps) {
        super(props, "Car");
    }

    // overrides method in FormBase
    async validate(entityRow: EntityRow): Promise<FormErrorMap> {
        const errors: FormErrorMap = {};
        if (entityRow.vin && entityRow.vin.length < 3) {
            errors.vin = "Length must be at least 3.";
        }
        return errors;
    }

    render() {
        return (
            <div>
                <FormHeader form={this} label="Car"/>
                <FormRow>
                    <FormCol>
                        <InputDecimal form={this} field="id" label="ID" readOnly={true}/>
                        <FormRow inline={true}>
                            <InputText form={this} field="vin" label="Vin"/>
                            <CheckboxField form={this} field="carBoolean" label="Car boolean" labelStyle={{width:'8rem'}}/>
                        </FormRow>
                        <InputText form={this} field="brandString" label="Brand string"/>
                        <InputTextarea form={this} field="comment" label="Comment" rows={2} autoResize={true}/>
                    </FormCol>
                    <FormCol>
                        <InputText form={this} field="color" label="Color"/>
                        <FormRow inline={true}>
                            <InputDecimal form={this} field="year" label="Year"/>
                            <InputDecimal form={this} field="price" label="Price" labelStyle={{width:'4rem'}}/>
                        </FormRow>
                        <DateField form={this} field="carDate" label="Car date"/>
                        <DateField form={this} field="carDatetime" label="Car datetime"/>
                        <FormRow inline={true}>
                            <DateField form={this} field="modifDate" label="Modified" readOnly={true}/>
                            <InputText form={this} field="modifUser.name" labelStyle={{width:'0rem'}} inputStyle={{width:'10rem'}} readOnly={true}/>
                        </FormRow>
                    </FormCol>
                    <FormCol>
                        <InputDecimal form={this} field="brandAssoc.id" label="ID Brand"/>
                        <Dropdown form={this} assocField="brandAssoc" displayField="brand" label="Brand assoc Dropdown"/>
                        <AutocompleteField form={this} assocField="brandAssoc" displayField="brand" AssocForm={BrandForm} label="Brand assoc AutoComplete"/>
                    </FormCol>
                </FormRow>
                <div className="x-viewport-width">
                    <FormDataTable form={this} assocField="rideList" label="Ride list">
                        <FormColumn field="id" header="ID" readOnly={true} width="5rem"/>
                        <FormColumn field="cityFrom" header="From" width={'10rem'}/>
                        <FormColumn field="cityTo" header="To" width={'10rem'}/>
                        <FormColumn field="km"/>
                        <FormColumn field="fuelPrice" header="Fuel - price"/>
                        <FormColumn field="rideDate" header="Ride Date"/>
                        <FormColumn field="rideDatetime" header="Ride Datetime"/>
                        <FormColumn field="rideBoolean" header="Boolean"/>
                        <FormColumn field="country.id" header="ID country"/>
                        <FormDropdownColumn assocField="country" displayField="code" header="Country Drop"/>
                    </FormDataTable>
                </div>
                <FormFooter form={this}/>
                <SourceCodeLinkForm sourceCodeFile="CarForm.tsx"/>
                <SourceCodeLinkEntity sourceCodeFile="car.entity.ts"/>
            </div>
        );
    }
}

(CarForm as any).createObject = async (): Promise<Car> => {
    return {carBoolean: false, rideList: [], version: 0} as unknown as Car;
}

(CarForm as any).assocList = (): string[] => {
    return ["modifUser", "brandAssoc", "rideList.country"];
}
