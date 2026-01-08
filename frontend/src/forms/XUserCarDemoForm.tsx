import { FormBaseModif, FormHeader, FormFooter, type FormProps } from "@chilibase/frontend/form";
import type { XUser } from "@chilibase/frontend/XUser";
import {InputDecimal} from "@chilibase/frontend/input-decimal";
import {InputText} from "@chilibase/frontend/input-text";
import {Checkbox} from "@chilibase/frontend/checkbox";
import {InputDate} from "@chilibase/frontend/input-date";

// readonly version used for demo - use XUserBrowse/XUserForm from lib
export class XUserCarDemoForm extends FormBaseModif {

    constructor(props: FormProps) {
        super(props, "XUser");
    }

    // @ts-ignore
    formReadOnly(object: XUser, field: string): boolean {
        return true; // always readonly
    }

    render() {
        return (
            <div>
                <FormHeader label="User"/>
                <div className="x-form-row">
                    <div className="x-form-col">
                        <InputDecimal form={this} field="id" label="ID" readOnly={true} labelStyle={{width:'14rem'}}/>
                        <InputText form={this} field="username" label="Username" size={30} labelStyle={{width:'14rem'}}/>
                        <InputText form={this} field="name" label="Name" size={30} labelStyle={{width:'14rem'}}/>
                        <Checkbox form={this} field="enabled" label="Enabled" labelStyle={{width:'14rem'}}/>
                        <Checkbox form={this} field="admin" label="Admin" labelStyle={{width:'14rem'}}/>
                        <InputDate form={this} field="modifDate" label="Modified at" readOnly={true} labelStyle={{width:'14rem'}}/>
                        <InputText form={this} field="modifXUser.name" label="Modified by" size={20} labelStyle={{width:'14rem'}}/>
                    </div>
                </div>
                <FormFooter form={this}/>
            </div>
        );
    }
}
