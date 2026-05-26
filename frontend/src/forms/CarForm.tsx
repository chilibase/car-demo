import {TextField} from "@chilibase/frontend/text-field";
import type {FormProps} from "@chilibase/frontend/form";
import {SelectField} from "@chilibase/frontend/select-field";
import {BrandForm} from "./BrandForm";
import {
    FormDataTable,
    Column,
    SelectColumn
} from "@chilibase/frontend/form-data-table";
import {NumberField} from "@chilibase/frontend/number-field";
import {DateField} from "@chilibase/frontend/date-field";
import {SourceCodeLinkForm} from "./SourceCodeLinkForm";
import {SourceCodeLinkEntity} from "./SourceCodeLinkEntity";
import {CheckboxField} from "@chilibase/frontend/checkbox-field";
import type {FormErrorMap} from "@chilibase/frontend/form";
import {AutocompleteField} from "@chilibase/frontend/autocomplete-field";
import {FormFooter, FormHeader, FormBaseModif} from "@chilibase/frontend/form";
import {MultilineTextField} from "@chilibase/frontend/multiline-text-field";
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
                        <NumberField form={this} field="id" label="ID" readOnly={true}/>
                        <FormRow inline={true}>
                            <TextField form={this} field="vin" label="Vin"/>
                            <CheckboxField form={this} field="carBoolean" label="Car boolean" labelStyle={{width:'8rem'}}/>
                        </FormRow>
                        <TextField form={this} field="brandString" label="Brand string"/>
                        <MultilineTextField form={this} field="comment" label="Comment" rows={2} autoResize={true}/>
                    </FormCol>
                    <FormCol>
                        <TextField form={this} field="color" label="Color"/>
                        <FormRow inline={true}>
                            <NumberField form={this} field="year" label="Year"/>
                            <NumberField form={this} field="price" label="Price" labelStyle={{width:'4rem'}}/>
                        </FormRow>
                        <DateField form={this} field="carDate" label="Car date"/>
                        <DateField form={this} field="carDatetime" label="Car datetime"/>
                        <FormRow inline={true}>
                            <DateField form={this} field="modifDate" label="Modified" readOnly={true}/>
                            <TextField form={this} field="modifUser.name" labelStyle={{width:'0rem'}} inputStyle={{width:'10rem'}} readOnly={true}/>
                        </FormRow>
                    </FormCol>
                    <FormCol>
                        <NumberField form={this} field="brandAssoc.id" label="ID Brand"/>
                        <SelectField form={this} assocField="brandAssoc" displayField="brand" label="Brand assoc SelectField"/>
                        <AutocompleteField form={this} assocField="brandAssoc" displayField="brand" AssocForm={BrandForm} label="Brand assoc AutoComplete"/>
                    </FormCol>
                </FormRow>
                <div className="x-viewport-width">
                    <FormDataTable form={this} assocField="rideList" label="Ride list">
                        <Column field="id" header="ID" readOnly={true} width="5rem"/>
                        <Column field="cityFrom" header="From" width={'10rem'}/>
                        <Column field="cityTo" header="To" width={'10rem'}/>
                        <Column field="km"/>
                        <Column field="fuelPrice" header="Fuel - price"/>
                        <Column field="rideDate" header="Ride Date"/>
                        <Column field="rideDatetime" header="Ride Datetime"/>
                        <Column field="rideBoolean" header="Boolean"/>
                        <Column field="country.id" header="ID country"/>
                        <SelectColumn assocField="country" displayField="code" header="Country Drop"/>
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
