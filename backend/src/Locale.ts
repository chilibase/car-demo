import {CBUtils} from "@chilibase/backend/utils";
import {localeSk} from "./locale/cb-sk.js";
import {localeEn} from "@chilibase/backend/locale";

export function setLocale() {
    // here we use simple way, set the language you need
    // TODO - nestjs supports packages i18n and @nestjs/i18n, use these packages
    //CBUtils.setLocaleOptions(localeSk.sk);
    CBUtils.setLocaleOptions(localeEn.en); // use english for messages used on backend
}
