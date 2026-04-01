import { FormBaseModif, FormHeader, FormFooter, type FormProps } from "@chilibase/frontend/form";
import type { User } from "@chilibase/frontend/administration";
import {InputDecimal} from "@chilibase/frontend/input-decimal";
import {InputText} from "@chilibase/frontend/input-text";
import {Checkbox} from "@chilibase/frontend/checkbox";
import {InputDate} from "@chilibase/frontend/input-date";
import {FormCol, FormRow} from "@chilibase/frontend/form-layout";

// readonly version used for demo - use XUserBrowse/XUserForm from lib
export class UserCarDemoForm extends FormBaseModif {

    constructor(props: FormProps) {
        super(props, "User");
    }

    // @ts-ignore
    formReadOnly(entityRow: User, field: string): boolean {
        return true; // always readonly
    }

    render() {
        return (
            <div>
                <FormHeader label="User"/>
                <FormRow>
                    <FormCol>
                        <InputDecimal form={this} field="id" label="ID" readOnly={true} labelStyle={{width:'14rem'}}/>
                        <InputText form={this} field="username" label="Username" size={30} labelStyle={{width:'14rem'}}/>
                        <InputText form={this} field="name" label="Name" size={30} labelStyle={{width:'14rem'}}/>
                        <Checkbox form={this} field="enabled" label="Enabled" labelStyle={{width:'14rem'}}/>
                        <Checkbox form={this} field="admin" label="Admin" labelStyle={{width:'14rem'}}/>
                        <InputDate form={this} field="modifDate" label="Modified at" readOnly={true} labelStyle={{width:'14rem'}}/>
                        <InputText form={this} field="modifUser.name" label="Modified by" size={20} labelStyle={{width:'14rem'}}/>
                    </FormCol>
                </FormRow>
                <FormFooter form={this}/>
            </div>
        );
    }
}
