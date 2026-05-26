import {TextField} from "@chilibase/frontend/text-field";
import {SourceCodeLinkForm} from "./SourceCodeLinkForm";
import {SourceCodeLinkEntity} from "./SourceCodeLinkEntity";
import type {FormProps} from "@chilibase/frontend/form";
import {NumberField} from "@chilibase/frontend/number-field";
import {FormBase, FormFooter, FormHeader} from "@chilibase/frontend/form";
import {FormCol, FormRow} from "@chilibase/frontend/form-layout";

export class BrandForm extends FormBase {

    constructor(props: FormProps) {
        super(props, "Brand");
    }

    render() {
        return (
            <div>
                <FormHeader form={this} label="Brand"/>
                <FormRow>
                    <FormCol>
                        <NumberField form={this} field="id" label="ID" readOnly={true}/>
                        <TextField form={this} field="brand" label="Brand"/>
                    </FormCol>
                </FormRow>
                <FormFooter form={this}/>
                <SourceCodeLinkForm sourceCodeFile="BrandForm.tsx"/>
                <SourceCodeLinkEntity sourceCodeFile="brand.entity.ts"/>
            </div>
        );
    }
}
