import {UserCarDemoForm} from "./UserCarDemoForm.tsx";
import {Column, LazyDataTable, type SearchBrowseProps} from "@chilibase/frontend/lazy-data-table";

// readonly version used for demo - use UserBrowse/UserForm from lib
export const UserCarDemoBrowse = (props: SearchBrowseProps) => {

    return (
        <LazyDataTable entity="User" label="Users" rows={30}
                       EditForm={UserCarDemoForm} onAddRow={false} removeRow={false}
                       searchBrowseParams={props.searchBrowseParams}>
            <Column field="id" header="ID"/>
            <Column field="username" header="Username" width="17rem"/>
            <Column field="name" header="Name" width="17rem"/>
            <Column field="enabled" header="Enabled"/>
            <Column field="admin" header="Admin"/>
        </LazyDataTable>
    );
}
