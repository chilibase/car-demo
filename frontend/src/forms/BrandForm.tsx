import {XInputText} from "@chilibase/frontend/XInputText";
import {SourceCodeLinkForm} from "./SourceCodeLinkForm";
import {SourceCodeLinkEntity} from "./SourceCodeLinkEntity";
import {XFormBase, type XFormProps} from "@chilibase/frontend/XFormBase";
import {XInputDecimal} from "@chilibase/frontend/XInputDecimal";
import {XUtils} from "@chilibase/frontend/XUtils";
import {XFormFooter} from "@chilibase/frontend/XFormFooter";
import {XFormHeader} from "@chilibase/frontend/XFormHeader";

export class BrandForm extends XFormBase {

    constructor(props: XFormProps) {
        super(props, "Brand");
    }

    render() {
        return (
            <div>
                <XFormHeader form={this} label="Brand"/>
                <div className="x-form-row">
                    <div className="x-form-col">
                        <XInputDecimal form={this} field="id" label="ID" readOnly={true}/>
                        <XInputText form={this} field="brand" label="Brand"/>
                    </div>
                </div>
                <XFormFooter form={this}/>
                <SourceCodeLinkForm sourceCodeFile="BrandForm.tsx"/>
                <SourceCodeLinkEntity sourceCodeFile="brand.entity.ts"/>
            </div>
        );
    }
}

// registration is used if user opens form from editable Browse saved in DB
XUtils.registerAppForm(<BrandForm/>, "Brand");
