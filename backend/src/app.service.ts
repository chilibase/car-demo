import {Injectable} from '@nestjs/common';
import {DataSource} from "typeorm";
import {PersistenceService} from "@chilibase/backend/persistence";
import {FileService} from "@chilibase/backend/services";
import {UtilsCommon} from "./common/UtilsCommon.js";

@Injectable()
export class AppService {
    constructor(
        private dataSource: DataSource,
        private readonly persistenceService: PersistenceService,
        private readonly fileService: FileService,
    ) {
    }

    getHello(): string {
        return 'car-demo-backend works! ' + UtilsCommon.test();
    }
}
