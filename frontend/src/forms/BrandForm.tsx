import {InputText} from "@chilibase/frontend/input-text";
import {SourceCodeLinkForm} from "./SourceCodeLinkForm";
import {SourceCodeLinkEntity} from "./SourceCodeLinkEntity";
import type {FormProps} from "@chilibase/frontend/form";
import {InputDecimal} from "@chilibase/frontend/input-decimal";
import {FormBase, FormFooter, FormHeader} from "@chilibase/frontend/form";

export class BrandForm extends FormBase {

    constructor(props: FormProps) {
        super(props, "Brand");
    }

    render() {
        return (
            <div>
                <FormHeader form={this} label="Brand"/>
                <div className="x-form-row">
                    <div className="x-form-col">
                        <InputDecimal form={this} field="id" label="ID" readOnly={true}/>
                        <InputText form={this} field="brand" label="Brand"/>
                    </div>
                </div>
                <FormFooter form={this}/>
                <SourceCodeLinkForm sourceCodeFile="BrandForm.tsx"/>
                <SourceCodeLinkEntity sourceCodeFile="brand.entity.ts"/>
            </div>
        );
    }
}
