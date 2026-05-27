import {
    Column,
    LazyDataTable,
    type SearchBrowseProps
} from "@chilibase/frontend/lazy-data-table";
import {SourceCodeLinkForm} from "./SourceCodeLinkForm.tsx";
import {SourceCodeLinkEntity} from "./SourceCodeLinkEntity";
import {CarReservationForm} from "./CarReservationForm";
import {ClientForm} from "./ClientForm";
import type {CarReservation} from "../model/car-reservation.entity.ts";
import {UtilsCommon} from "../common/UtilsCommon.ts";
import {CBUtilsCommon} from "@chilibase/frontend/common";

export const CarReservationBrowse = (props: SearchBrowseProps) => {

    const onAlert = (selectedRow: CarReservation) => {
        const id = selectedRow.id;
        console.log(id);
        alert(`Selected row id = ${id}, day of week: ${CBUtilsCommon.getDayName(new Date())}`);

        UtilsCommon.test();
    }

    return (
        <div>
            <LazyDataTable entity="CarReservation" label="Car reservations" rows={30} formFooterHeight={'4.43rem'} sortField="id desc"
                           editFormElement={<CarReservationForm/>} removeRow={true}
                           appButtonsForRow={[{
                               key: "alert",
                               label: "Alert",
                               onClick: onAlert
                           }]}
                           searchBrowseParams={props.searchBrowseParams}>
                <Column field="id" header="ID" width="5rem"/>
                <Column field="client.name" header="Client" width="15rem"
                            autoFilter={true}
                            autoComplete={{
                                assocField: "client", field: "name", ValueForm: ClientForm,
                                lazyLoadMaxRows: 15, scrollHeight: "25rem"
                            }}/>
                <Column field="dateFrom" header="Date from"/>
                <Column field="dateTo" header="Date to"/>
                <Column field="car.id" header="Car ID" width="5rem"/>
                <Column field="car.brandAssoc.brand" header="Car brand" width="10rem"/>
                <Column field="car.color" header="Car color" width="10rem"/>
                <Column field="price" header="Price"/>
            </LazyDataTable>
            <SourceCodeLinkForm sourceCodeFile="CarReservationBrowse.tsx"/>
            <SourceCodeLinkEntity sourceCodeFile="car-reservation.entity.ts"/>
        </div>
    );
}
