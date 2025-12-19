import {XUserCarDemoForm} from "./XUserCarDemoForm.tsx";
import {XLazyColumn, XLazyDataTable, type XSearchBrowseProps} from "@chilibase/frontend/XLazyDataTable";

// readonly version used for demo - use XUserBrowse/XUserForm from lib
export const XUserCarDemoBrowse = (props: XSearchBrowseProps) => {

    return (
        <XLazyDataTable entity="XUser" label="Users" rows={30}
                        EditForm={XUserCarDemoForm} onAddRow={false} removeRow={false}
                        searchBrowseParams={props.searchBrowseParams}>
            <XLazyColumn field="id" header="ID"/>
            <XLazyColumn field="username" header="Username" width="17rem"/>
            <XLazyColumn field="name" header="Name" width="17rem"/>
            <XLazyColumn field="enabled" header="Enabled"/>
            <XLazyColumn field="admin" header="Admin"/>
        </XLazyDataTable>
    );
}
