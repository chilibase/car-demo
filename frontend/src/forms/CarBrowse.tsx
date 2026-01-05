import {
    LazyColumn,
    LazyDataTable,
    type SearchBrowseProps
} from "@chilibase/frontend/lazy-data-table";
import {CarForm} from "./CarForm";
import {SourceCodeLinkForm} from "./SourceCodeLinkForm";
import {SourceCodeLinkEntity} from "./SourceCodeLinkEntity";

export const CarBrowse = (props: SearchBrowseProps) => {

    return (
        <div>
            <LazyDataTable entity="Car" label="Cars" rows={30} formFooterHeight={'4.43rem'} sortField="id"
                           EditForm={CarForm} removeRow={true}
                           searchBrowseParams={props.searchBrowseParams}>
                <LazyColumn field="id" header="ID" width="5rem"/>
                <LazyColumn field="vin" header="Vin" width="7rem"/>
                <LazyColumn field="year" header="Year"/>
                <LazyColumn field="brandString" header="Brand string" width="8rem"/>
                <LazyColumn field="brandAssoc.brand" header="Brand assoc" dropdownInFilter={true} width="8rem"/>
                <LazyColumn field="color" header="Color" width="7rem"/>
                <LazyColumn field="price" header="Price"/>
                <LazyColumn field="carDate" header="Car Date"/>
                <LazyColumn field="carDatetime" header="Car Datetime"/>
                <LazyColumn field="carBoolean" header="Car Boolean"/>
            </LazyDataTable>
            <SourceCodeLinkForm sourceCodeFile="CarBrowse.tsx"/>
            <SourceCodeLinkEntity sourceCodeFile="car.entity.ts"/>
        </div>
    );
}
