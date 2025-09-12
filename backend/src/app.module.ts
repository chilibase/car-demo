import {DynamicModule, Module} from '@nestjs/common';
import {AppController} from './app.controller.js';
import {AppService} from './app.service.js';
import {XLibModule} from '@chilibase/backend/x-lib.module';
import {TypeOrmModule, TypeOrmModuleOptions} from "@nestjs/typeorm";
import {XBrowseMeta} from "@chilibase/backend/x-browse-meta.entity";
import {XColumnMeta} from "@chilibase/backend/x-column-meta.entity";
import {MulterModule} from "@nestjs/platform-express";
import {EntityClassOrSchema} from "@nestjs/typeorm/dist/interfaces/entity-class-or-schema.type.js";
import {AuthModule} from "@chilibase/backend/auth.module";
import {APP_GUARD} from "@nestjs/core";
import {JwtAuthGuard} from "@chilibase/backend/jwt-auth.guard";
import {XAuth, XEnvVar} from "@chilibase/backend/XEnvVars";
import {XUtils} from "@chilibase/backend/XUtils";
import {XAdvancedConsoleLogger} from "@chilibase/backend/XAdvancedConsoleLogger";
import {XFile} from "@chilibase/backend/x-file.entity";
import {XOptimisticLockingSubscriber} from "@chilibase/backend/XOptimisticLockingSubscriber";
import {XEnumEnum} from "@chilibase/backend/x-enum-enum.entity";
import {XEnum} from "@chilibase/backend/x-enum.entity";
import {XParam} from "@chilibase/backend/x-param.entity";
import {PostSubscriber} from "./PostSubscriber.js";
import {XUser} from "@chilibase/backend/x-user.entity";
import {Brand} from "./model/brand.entity.js";
import {Country} from "./model/country.entity.js";
import {Car} from "./model/car.entity.js";
import {Ride} from "./model/ride.entity.js";
import {CarReservation} from "./model/car-reservation.entity.js";
import {Client} from "./model/client.entity.js";
import {ConnectionOptions, parse} from "pg-connection-string";

const entities: EntityClassOrSchema[] = [XBrowseMeta, XColumnMeta, XFile, XUser, XEnumEnum, XEnum, XParam,
  Brand, Country, Car, Ride, Client, CarReservation
];
// const entities: EntityClassOrSchema[] = [XUser,
//   Brand, Country, Car, Ride, Client, CarReservation
// ];

// kedze metoda pouziva environment variables, musi byt zavolana az po inicializacii modulu ConfigModule
function createTypeOrmModuleOptions(entities: EntityClassOrSchema[]): TypeOrmModuleOptions {

  // zatial pouzijeme tento parseDatabaseUrl (pridali sme dependeciu na ts-parse-database-url)
  const dbConfig: ConnectionOptions = parse(XUtils.getEnvVarValue(XEnvVar.X_DATABASE_URL));
  // TODO - schema from dbConfig
  //const schema: string = dbConfig.options?.schema;
  const schema: string = "car_demo";
  //console.log(dbConfig);

  const typeOrmModuleOptions: TypeOrmModuleOptions = {
    type: "postgres",
    host: dbConfig.host,
    port: parseInt(dbConfig.port, 10),
    username: dbConfig.user,
    password: dbConfig.password,
    database: dbConfig.database,
    schema: schema, // 'schema' je atribut z X_DATABASE_URL
    entities: entities,
    subscribers: [XOptimisticLockingSubscriber, PostSubscriber],
    synchronize: false,
    // logging: true sme nahradili custom loggerom - rozumne loguje parameter typu Buffer
    //logging: true,
    logger: new XAdvancedConsoleLogger(XUtils.getEnvVarValueBoolean(XEnvVar.X_LOG_SQL))
  };
  XUtils.setSchema(schema);
  return typeOrmModuleOptions;
}

@Module({})
export class AppModule {
  // pouzivame metodku forRoot() + DynamicModule aby sme vedeli if-ovat pridavanie autorizacnych modulov
  static forRoot(configModule: DynamicModule): DynamicModule {

    const appModuleMetadata: DynamicModule = {
      imports: [
        configModule,
        // TypeOrmModule.forFeature(entities) je potrebny aby sme mohli injektovat Repository (vid carRepository v AppService)
        // TypeOrmModule.forRoot(typeOrmModuleOptions), TypeOrmModule.forFeature(entities) mozme presunut aj do XLibModule, zatial ich nechame tu
        TypeOrmModule.forRoot(createTypeOrmModuleOptions(entities)),
        TypeOrmModule.forFeature(entities),
        XLibModule.forRoot(),
        MulterModule.register(/*{dest: 'uploads/'}*/) // globalne nastavenie ako spracovavat subory, zatial nastavujeme na metodach controllera
      ],
      controllers: [AppController],
      providers: [
        AppService
      ],
      exports: [TypeOrmModule], // zevraj treba aby bola DB pristupna vo vsetkych moduloch, funguje vsak aj bez tohto
      module: AppModule
    };
    // ak nemame vypnutu autorizaciu, pridame autorizacne moduly
    if (XUtils.getEnvVarValue(XEnvVar.X_AUTH) !== XAuth.OFF) {
      appModuleMetadata.imports.push(AuthModule);
      appModuleMetadata.providers.push(
          {
            provide: APP_GUARD,
            useClass: JwtAuthGuard
            //useClass: MsEntraIdAuthGuard // docasne na testovanie
          }
          //MsEntraIdStrategy // docasne na testovanie
      );
    }
    return appModuleMetadata;
  }
}
