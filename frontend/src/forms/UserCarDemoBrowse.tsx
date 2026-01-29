import {UserCarDemoForm} from "./UserCarDemoForm.tsx";
import {LazyColumn, LazyDataTable, type SearchBrowseProps} from "@chilibase/frontend/lazy-data-table";

// readonly version used for demo - use UserBrowse/UserForm from lib
export const UserCarDemoBrowse = (props: SearchBrowseProps) => {

    return (
        <LazyDataTable entity="User" label="Users" rows={30}
                       EditForm={UserCarDemoForm} onAddRow={false} removeRow={false}
                       searchBrowseParams={props.searchBrowseParams}>
            <LazyColumn field="id" header="ID"/>
            <LazyColumn field="username" header="Username" width="17rem"/>
            <LazyColumn field="name" header="Name" width="17rem"/>
            <LazyColumn field="enabled" header="Enabled"/>
            <LazyColumn field="admin" header="Admin"/>
        </LazyDataTable>
    );
}
