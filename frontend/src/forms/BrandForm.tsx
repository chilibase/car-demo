import {InputText} from "@chilibase/frontend/input-text";
import {SourceCodeLinkForm} from "./SourceCodeLinkForm";
import {SourceCodeLinkEntity} from "./SourceCodeLinkEntity";
import {XFormBase, type XFormProps} from "@chilibase/frontend/XFormBase";
import {InputDecimal} from "@chilibase/frontend/input-decimal";
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
                        <InputDecimal form={this} field="id" label="ID" readOnly={true}/>
                        <InputText form={this} field="brand" label="Brand"/>
                    </div>
                </div>
                <XFormFooter form={this}/>
                <SourceCodeLinkForm sourceCodeFile="BrandForm.tsx"/>
                <SourceCodeLinkEntity sourceCodeFile="brand.entity.ts"/>
            </div>
        );
    }
}
