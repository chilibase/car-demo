import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module.js';
import {XExceptionFilter} from "@chilibase/backend/x-exception.filter";
import {XUtils} from "@chilibase/backend/XUtils";
import {XEnvVar, XProtocol} from "@chilibase/backend/XEnvVars";
import {readFileSync} from "fs";
import {HttpsOptions} from "@nestjs/common/interfaces/external/https-options.interface.js";
import {DynamicModule, NestApplicationOptions} from "@nestjs/common";
import {ConfigModule} from "@nestjs/config";
import {NestExpressApplication} from "@nestjs/platform-express";

async function bootstrap() {
  // vytvorenie configModule musi byt ako prve lebo modul nacitava variables zo suboru .env
  // isGlobal:true spristupnuje environment variables v kazdom module
  const configModule: DynamicModule = await ConfigModule.forRoot({isGlobal: true});

  const protocol: string = XUtils.getEnvVarValue(XEnvVar.X_PROTOCOL);
  let options: NestApplicationOptions | undefined = undefined;
  // pri volaniach na backend pouzivame ten isty ssl certifikat ako pri volani na frontend (pociatocne stiahnutie aplikacie)
  // (spolocny certifikat pre frontend i backend mame koli jednoduchosti, musia vsak mat tu istu domenu (car-demo.michalrakus.sk) aby to fungovalo (certifikat sa viaze na domenu))
  if (protocol === XProtocol.HTTPS) {
    const domain: string = XUtils.getEnvVarValue(XEnvVar.X_DOMAIN);
    const httpsOptions: HttpsOptions = {
      key: readFileSync(`/etc/node/ssl/live/${domain}/privkey.pem`),
      cert: readFileSync(`/etc/node/ssl/live/${domain}/fullchain.pem`)
    };
    options = {httpsOptions: httpsOptions};
  }
  const app = await NestFactory.create<NestExpressApplication>(AppModule.forRoot(configModule), options);
  // cross origin policy - na produkcii (zapnuty HTTPS) plati:
  // frontend aplikaciu stahujeme z url-ky "https://car-demo.michalrakus.sk" (pouziva sa default port pre https 443)
  // volania na backend maju url-ku "https://car-demo.michalrakus.sk/backend/<service>", idu na nginx a odtial su presmerovane na nodejs (docker service backend:8082)
  // tympadom netreba pridavat header pre cross origin, lebo volania na backend maju ten isty origin "https://car-demo.michalrakus.sk" (http/https, domena, port)

  // ak sme ale na localhost-e, tak volania na backend nejdu cez nginx (ak nepustame aplikaciu cez docker), idu priamo na localhost:8081
  // a maju inu url ako origin (url-ky lisia sa v porte) a odlisnu url-ku treba povolit pridanim header-a ‘Access-Control-Allow-Origin’ do http response-u,
  // inac vrati chybu: CORS header ‘Access-Control-Allow-Origin’ missing
  if (protocol === XProtocol.HTTP) {
    app.enableCors(); // prida header ‘Access-Control-Allow-Origin’ s hodnotou * (backend servis-y je mozne volat z lubovolnej stranky (vypnutie CORS security))
    // ak nechceme pouzit * ale chceme obmedzit backend volania na konkretnu frontend url-ku, tak treba pouzit:
    //app.enableCors({origin: protocol === XProtocol.HTTPS ? "https://car-demo.michalrakus.sk" : "http://localhost:3000"});
  }
  app.useGlobalFilters(new XExceptionFilter());

  // let port: any = process.env.PORT; // pouzivane na heroku
  // if (port == null || port == "") {
  //     port = process.env.X_PORT;
  // }
  const port: string = XUtils.getEnvVarValue(XEnvVar.X_PORT);
  await app.listen(port);
}
bootstrap();
