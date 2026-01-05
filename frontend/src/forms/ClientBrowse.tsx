import {
    LazyColumn,
    LazyDataTable,
    type SearchBrowseProps
} from "@chilibase/frontend/lazy-data-table";
import {SourceCodeLinkForm} from "./SourceCodeLinkForm";
import {SourceCodeLinkEntity} from "./SourceCodeLinkEntity";
import {ClientForm} from "./ClientForm";

export const ClientBrowse = (props: SearchBrowseProps) => {

    return (
        <div>
            <LazyDataTable entity="Client" label="Clients" rows={30} formFooterHeight={'4.43rem'} sortField="id"
                           EditForm={ClientForm} removeRow={true}
                           searchBrowseParams={props.searchBrowseParams}>
                <LazyColumn field="id" header="ID" width="5rem"/>
                <LazyColumn field="name" header="Name" width="15rem"/>
                <LazyColumn field="birthDate" header="Birth date"/>
                <LazyColumn field="contact" header="Contact" width="10rem"/>
            </LazyDataTable>
            <SourceCodeLinkForm sourceCodeFile="ClientBrowse.tsx"/>
            <SourceCodeLinkEntity sourceCodeFile="client.entity.ts"/>
        </div>
    );
}
