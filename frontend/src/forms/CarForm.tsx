import {XInputText} from "@chilibase/frontend/XInputText";
import type {XFormProps} from "@chilibase/frontend/XFormBase";
import {XDropdown} from "@chilibase/frontend/XDropdown";
import {XToOneAssocButton} from "@chilibase/frontend/XToOneAssocButton";
import {BrandForm} from "./BrandForm";
import {
    XFormDataTable2,
    XFormColumn,
    XFormDropdownColumn
} from "@chilibase/frontend/XFormDataTable2";
import {XInputDecimal} from "@chilibase/frontend/XInputDecimal";
import {XInputDate} from "@chilibase/frontend/XInputDate";
import {SourceCodeLinkForm} from "./SourceCodeLinkForm";
import {SourceCodeLinkEntity} from "./SourceCodeLinkEntity";
import {XUtils} from "@chilibase/frontend/XUtils";
import {XCheckbox} from "@chilibase/frontend/XCheckbox";
import type {XErrors} from "@chilibase/frontend/XErrors";
import {XAutoComplete} from "@chilibase/frontend/XAutoComplete";
import {XFormFooter} from "@chilibase/frontend/XFormFooter";
import {XInputTextarea} from "@chilibase/frontend/XInputTextarea";
import {XFormHeader} from "@chilibase/frontend/XFormHeader";
import {XFormBaseModif} from "@chilibase/frontend/XFormBaseModif";
import type {XObject} from "@chilibase/frontend/XObject";

export class CarForm extends XFormBaseModif {

    constructor(props: XFormProps) {
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
                <XFormHeader form={this} label="Car"/>
                <div className="x-form-row">
                    <div className="x-form-col">
                        <XInputDecimal form={this} field="id" label="ID" readOnly={true}/>
                        <div className="x-form-inline-row">
                            <XInputText form={this} field="vin" label="Vin"/>
                            <XCheckbox form={this} field="carBoolean" label="Car boolean" inline={true}/>
                        </div>
                        <XInputText form={this} field="brandString" label="Brand string"/>
                        <XInputTextarea form={this} field="comment" label="Comment" rows={2} autoResize={true}/>
                    </div>
                    <div className="x-form-col">
                        <XInputText form={this} field="color" label="Color"/>
                        <div className="x-form-inline-row">
                            <XInputDecimal form={this} field="year" label="Year"/>
                            <XInputDecimal form={this} field="price" label="Price" inline={true}/>
                        </div>
                        <XInputDate form={this} field="carDate" label="Car date"/>
                        <XInputDate form={this} field="carDatetime" label="Car datetime"/>
                        <div className="x-form-inline-row">
                            <XInputDate form={this} field="modifDate" label="Modified" readOnly={true}/>
                            <XInputText form={this} field="modifXUser.name" labelStyle={{width:'0rem'}} inputStyle={{width:'10rem'}} readOnly={true}/>
                        </div>
                    </div>
                    <div className="x-form-col">
                        <XInputDecimal form={this} field="brandAssoc.id" label="ID Brand"/>
                        <XDropdown form={this} assocField="brandAssoc" displayField="brand" label="Brand assoc Dropdown"/>
                        <XAutoComplete form={this} assocField="brandAssoc" displayField="brand" AssocForm={BrandForm} label="Brand assoc AutoComplete"/>
                        <XToOneAssocButton form={this} assocField="brandAssoc" assocForm={<BrandForm/>} label="Brand assoc AssocButton" buttonLabel="Brand form"/>
                    </div>
                </div>
                <div className="x-viewport-width">
                    <XFormDataTable2 form={this} assocField="rideList" label="Ride list">
                        <XFormColumn field="id" header="ID" readOnly={true} width="5rem"/>
                        <XFormColumn field="cityFrom" header="From" width={'10rem'}/>
                        <XFormColumn field="cityTo" header="To" width={'10rem'}/>
                        <XFormColumn field="km"/>
                        <XFormColumn field="fuelPrice" header="Fuel - price"/>
                        <XFormColumn field="rideDate" header="Ride Date"/>
                        <XFormColumn field="rideDatetime" header="Ride Datetime"/>
                        <XFormColumn field="rideBoolean" header="Boolean"/>
                        <XFormColumn field="country.id" header="ID country"/>
                        <XFormDropdownColumn assocField="country" displayField="code" header="Country Drop"/>
                    </XFormDataTable2>
                </div>
                <XFormFooter form={this}/>
                <SourceCodeLinkForm sourceCodeFile="CarForm.tsx"/>
                <SourceCodeLinkEntity sourceCodeFile="car.entity.ts"/>
            </div>
        );
    }
}

(CarForm as any).assocList = (): string[] => {
    return ["modifXUser", "brandAssoc", "rideList.country"];
}

// registration is used if user opens form from editable Browse saved in DB
XUtils.registerAppForm(<CarForm/>, "Car");
