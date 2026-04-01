import {InputText} from "@chilibase/frontend/input-text";
import {SourceCodeLinkForm} from "./SourceCodeLinkForm";
import {SourceCodeLinkEntity} from "./SourceCodeLinkEntity";
import {InputDecimal} from "@chilibase/frontend/input-decimal";
import {FormFooter, FormHeader, FormBaseModif} from "@chilibase/frontend/form";
import {DateField} from "@chilibase/frontend/date-field";
import type {FormProps} from "@chilibase/frontend/form";
import {FormCol, FormRow} from "@chilibase/frontend/form-layout";

export class ClientForm extends FormBaseModif {

    constructor(props: FormProps) {
        super(props, "Client");
    }

    render() {
        return (
            <div>
                <FormHeader form={this} label="Client"/>
                <FormRow>
                    <FormCol>
                        <InputDecimal form={this} field="id" label="ID" readOnly={true}/>
                        <InputText form={this} field="name" label="Name"/>
                        <DateField form={this} field="birthDate" label="Birth date"/>
                        <InputText form={this} field="contact" label="Contact"/>
                        <InputText form={this} field="address" label="Address" inputStyle={{width:'25rem'}}/>
                        <DateField form={this} field="modifDate" label="Modified at" readOnly={true}/>
                        <InputText form={this} field="modifUser.name" label="Modified by" readOnly={true} inputStyle={{width: '12.5rem'}}/>
                    </FormCol>
                </FormRow>
                <FormFooter form={this}/>
                <SourceCodeLinkForm sourceCodeFile="ClientForm.tsx"/>
                <SourceCodeLinkEntity sourceCodeFile="client.entity.ts"/>
            </div>
        );
    }
}

(ClientForm as any).assocList = (): string[] => {
    return ["modifUser"];
}
