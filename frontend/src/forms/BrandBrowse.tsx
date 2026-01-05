import {
    LazyColumn,
    LazyDataTable,
    type SearchBrowseProps
} from "@chilibase/frontend/lazy-data-table";
import {BrandForm} from "./BrandForm";
import {SourceCodeLinkForm} from "./SourceCodeLinkForm";
import {SourceCodeLinkEntity} from "./SourceCodeLinkEntity";

export const BrandBrowse = (props: SearchBrowseProps) => {

    return (
        <div>
            <LazyDataTable entity="Brand" label="Brands" rows={30} formFooterHeight={'4.43rem'}
                           EditForm={BrandForm} removeRow={true}
                           searchBrowseParams={props.searchBrowseParams}>
                <LazyColumn field="id" header="ID" width="5rem"/>
                <LazyColumn field="brand" header="Brand" width="15rem"/>
            </LazyDataTable>
            <SourceCodeLinkForm sourceCodeFile="BrandBrowse.tsx"/>
            <SourceCodeLinkEntity sourceCodeFile="brand.entity.ts"/>
        </div>
    );
}
