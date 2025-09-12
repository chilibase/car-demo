import {
    XLazyColumn,
    XLazyDataTable,
    type XSearchBrowseProps
} from "@chilibase/frontend/XLazyDataTable";
import {SourceCodeLinkForm} from "./SourceCodeLinkForm";
import {SourceCodeLinkEntity} from "./SourceCodeLinkEntity";
import {ClientForm} from "./ClientForm";

export const ClientBrowse = (props: XSearchBrowseProps) => {

    return (
        <div>
            <XLazyDataTable entity="Client" label="Clients" rows={30} formFooterHeight={'4.43rem'}
                            EditForm={ClientForm} removeRow={true}
                            searchBrowseParams={props.searchBrowseParams}>
                <XLazyColumn field="id" header="ID" width="5rem"/>
                <XLazyColumn field="name" header="Name" width="15rem"/>
                <XLazyColumn field="birthDate" header="Birth date"/>
                <XLazyColumn field="contact" header="Contact" width="10rem"/>
            </XLazyDataTable>
            <SourceCodeLinkForm sourceCodeFile="ClientBrowse.tsx"/>
            <SourceCodeLinkEntity sourceCodeFile="client.entity.ts"/>
        </div>
    );
}
