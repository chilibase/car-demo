import {InputText} from "@chilibase/frontend/input-text";
import {SourceCodeLinkForm} from "./SourceCodeLinkForm";
import {SourceCodeLinkEntity} from "./SourceCodeLinkEntity";
import {InputDecimal} from "@chilibase/frontend/input-decimal";
import {FormFooter, FormHeader, FormBaseModif} from "@chilibase/frontend/form";
import type {XObject} from "@chilibase/frontend/XObject";
import {InputDate} from "@chilibase/frontend/input-date";
import type {FormProps} from "@chilibase/frontend/form";

export class ClientForm extends FormBaseModif {

    constructor(props: FormProps) {
        super(props, "Client");
    }

    createNewObject(): XObject {
        return {version: 0};
    }

    render() {
        return (
            <div>
                <FormHeader form={this} label="Client"/>
                <div className="x-form-row">
                    <div className="x-form-col">
                        <InputDecimal form={this} field="id" label="ID" readOnly={true}/>
                        <InputText form={this} field="name" label="Name"/>
                        <InputDate form={this} field="birthDate" label="Birth date"/>
                        <InputText form={this} field="contact" label="Contact"/>
                        <InputText form={this} field="address" label="Address" inputStyle={{width:'25rem'}}/>
                        <InputDate form={this} field="modifDate" label="Modified at" readOnly={true}/>
                        <InputText form={this} field="modifXUser.name" label="Modified by" readOnly={true} inputStyle={{width: '12.5rem'}}/>
                    </div>
                </div>
                <FormFooter form={this}/>
                <SourceCodeLinkForm sourceCodeFile="ClientForm.tsx"/>
                <SourceCodeLinkEntity sourceCodeFile="client.entity.ts"/>
            </div>
        );
    }
}

(ClientForm as any).assocList = (): string[] => {
    return ["modifXUser"];
}
