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
import {InputDate} from "@chilibase/frontend/input-date";
import {SourceCodeLinkForm} from "./SourceCodeLinkForm";
import {SourceCodeLinkEntity} from "./SourceCodeLinkEntity";
import {Checkbox} from "@chilibase/frontend/checkbox";
import type {XErrors} from "@chilibase/frontend/XErrors";
import {AutoComplete} from "@chilibase/frontend/auto-complete";
import {FormFooter, FormHeader, FormBaseModif} from "@chilibase/frontend/form";
import {InputTextarea} from "@chilibase/frontend/input-textarea";
import type {XObject} from "@chilibase/frontend/XObject";

export class CarForm extends FormBaseModif {

    constructor(props: FormProps) {
        super(props, "Car");
    }

    createNewObject(): XObject {
        return {carBoolean: false, rideList: [], version: 0};
    }

    // overrides method in XFormBase
    async validate(object: XObject): Promise<XErrors> {
        const errors: XErrors = {};
        if (object.vin && object.vin.length < 3) {
            errors.vin = "Length must be at least 3.";
        }
        return errors;
    }

    render() {
        return (
            <div>
                <FormHeader form={this} label="Car"/>
                <div className="x-form-row">
                    <div className="x-form-col">
                        <InputDecimal form={this} field="id" label="ID" readOnly={true}/>
                        <div className="x-form-inline-row">
                            <InputText form={this} field="vin" label="Vin"/>
                            <Checkbox form={this} field="carBoolean" label="Car boolean" inline={true}/>
                        </div>
                        <InputText form={this} field="brandString" label="Brand string"/>
                        <InputTextarea form={this} field="comment" label="Comment" rows={2} autoResize={true}/>
                    </div>
                    <div className="x-form-col">
                        <InputText form={this} field="color" label="Color"/>
                        <div className="x-form-inline-row">
                            <InputDecimal form={this} field="year" label="Year"/>
                            <InputDecimal form={this} field="price" label="Price" inline={true}/>
                        </div>
                        <InputDate form={this} field="carDate" label="Car date"/>
                        <InputDate form={this} field="carDatetime" label="Car datetime"/>
                        <div className="x-form-inline-row">
                            <InputDate form={this} field="modifDate" label="Modified" readOnly={true}/>
                            <InputText form={this} field="modifXUser.name" labelStyle={{width:'0rem'}} inputStyle={{width:'10rem'}} readOnly={true}/>
                        </div>
                    </div>
                    <div className="x-form-col">
                        <InputDecimal form={this} field="brandAssoc.id" label="ID Brand"/>
                        <Dropdown form={this} assocField="brandAssoc" displayField="brand" label="Brand assoc Dropdown"/>
                        <AutoComplete form={this} assocField="brandAssoc" displayField="brand" AssocForm={BrandForm} label="Brand assoc AutoComplete"/>
                    </div>
                </div>
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

(CarForm as any).assocList = (): string[] => {
    return ["modifXUser", "brandAssoc", "rideList.country"];
}
