import {
    XLazyColumn,
    XLazyDataTable,
    type XSearchBrowseProps
} from "@chilibase/frontend/XLazyDataTable";
import {SourceCodeLinkForm} from "./SourceCodeLinkForm.tsx";
import {SourceCodeLinkEntity} from "./SourceCodeLinkEntity";
import {CarReservationForm} from "./CarReservationForm";
import {ClientForm} from "./ClientForm";
import type {CarReservation} from "../model/car-reservation.entity.ts";
import {UtilsCommon} from "common/UtilsCommon.ts";

export const CarReservationBrowse = (props: XSearchBrowseProps) => {

    const onUpravit = (selectedRow: CarReservation) => {
        const id = selectedRow.id;
        console.log(id);
        UtilsCommon.test();
    }

    return (
        <div>
            <XLazyDataTable entity="CarReservation" label="Car reservations" rows={30} formFooterHeight={'4.43rem'}
                            editFormElement={<CarReservationForm/>} removeRow={true}
                            appButtonsForRow={[{
                                key: "uprava",
                                label: "Upraviť",
                                onClick: onUpravit
                            }]}
                            searchBrowseParams={props.searchBrowseParams}>
                <XLazyColumn field="id" header="ID" width="5rem"/>
                <XLazyColumn field="client.name" header="Client" width="15rem"
                             autoFilter={true}
                             autoComplete={{
                                 assocField: "client", field: "name", ValueForm: ClientForm,
                                 lazyLoadMaxRows: 15, scrollHeight: "25rem"
                             }}/>
                <XLazyColumn field="dateFrom" header="Date from"/>
                <XLazyColumn field="dateTo" header="Date to"/>
                <XLazyColumn field="car.id" header="Car ID" width="5rem"/>
                <XLazyColumn field="car.brandAssoc.brand" header="Car brand" width="10rem"/>
                <XLazyColumn field="car.color" header="Car color" width="10rem"/>
                <XLazyColumn field="price" header="Price"/>
            </XLazyDataTable>
            <SourceCodeLinkForm sourceCodeFile="CarReservationBrowse.tsx"/>
            <SourceCodeLinkEntity sourceCodeFile="car-reservation.entity.ts"/>
        </div>
    );
}
