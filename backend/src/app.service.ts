import {Injectable} from '@nestjs/common';
import {DataSource} from "typeorm";
import {XLibService} from "@chilibase/backend/x-lib.service";
import {XEntityMetadataService, FileService} from "@chilibase/backend/services";
import {UtilsCommon} from "./common/UtilsCommon.js";

@Injectable()
export class AppService {
    constructor(
        private dataSource: DataSource,
        private readonly xLibService: XLibService,
        private readonly fileService: FileService,
        private readonly xEntityMetadataService: XEntityMetadataService
    ) {
    }

    getHello(): string {
        return 'car-demo-backend works! ' + UtilsCommon.test();
    }
}
