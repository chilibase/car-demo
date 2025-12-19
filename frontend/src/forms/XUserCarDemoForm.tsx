import type { XFormProps } from "@chilibase/frontend/XFormBase";
import { XFormBaseModif } from "@chilibase/frontend/XFormBaseModif";
import { XFormHeader } from "@chilibase/frontend/XFormHeader";
import type { XUser } from "@chilibase/frontend/XUser";
import {XInputDecimal} from "@chilibase/frontend/XInputDecimal";
import {XInputText} from "@chilibase/frontend/XInputText";
import { XCheckbox } from "@chilibase/frontend/XCheckbox";
import {XInputDate} from "@chilibase/frontend/XInputDate";
import {XFormFooter} from "@chilibase/frontend/XFormFooter";

// readonly version used for demo - use XUserBrowse/XUserForm from lib
export class XUserCarDemoForm extends XFormBaseModif {

    constructor(props: XFormProps) {
        super(props, "XUser");
    }

    // @ts-ignore
    formReadOnly(object: XUser, field: string): boolean {
        return true; // always readonly
    }

    render() {
        return (
            <div>
                <XFormHeader label="User"/>
                <div className="x-form-row">
                    <div className="x-form-col">
                        <XInputDecimal form={this} field="id" label="ID" readOnly={true} labelStyle={{width:'14rem'}}/>
                        <XInputText form={this} field="username" label="Username" size={30} labelStyle={{width:'14rem'}}/>
                        <XInputText form={this} field="name" label="Name" size={30} labelStyle={{width:'14rem'}}/>
                        <XCheckbox form={this} field="enabled" label="Enabled" labelStyle={{width:'14rem'}}/>
                        <XCheckbox form={this} field="admin" label="Admin" labelStyle={{width:'14rem'}}/>
                        <XInputDate form={this} field="modifDate" label="Modified at" readOnly={true} labelStyle={{width:'14rem'}}/>
                        <XInputText form={this} field="modifXUser.name" label="Modified by" size={20} labelStyle={{width:'14rem'}}/>
                    </div>
                </div>
                <XFormFooter form={this}/>
            </div>
        );
    }
}
