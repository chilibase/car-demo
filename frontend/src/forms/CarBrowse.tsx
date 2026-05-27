import {
    Column,
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
                <Column field="id" header="ID" width="5rem"/>
                <Column field="vin" header="Vin" width="7rem"/>
                <Column field="year" header="Year"/>
                <Column field="brandString" header="Brand string" width="8rem"/>
                <Column field="brandAssoc.brand" header="Brand assoc" dropdownInFilter={true} width="8rem"/>
                <Column field="color" header="Color" width="7rem"/>
                <Column field="price" header="Price"/>
                <Column field="carDate" header="Car Date"/>
                <Column field="carDatetime" header="Car Datetime"/>
                <Column field="carBoolean" header="Car Boolean"/>
            </LazyDataTable>
            <SourceCodeLinkForm sourceCodeFile="CarBrowse.tsx"/>
            <SourceCodeLinkEntity sourceCodeFile="car.entity.ts"/>
        </div>
    );
}
