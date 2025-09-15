// TODO - presunut do lib-ky
import type {XUser} from "@chilibase/frontend/XUser";

// fieldy na sychronizaciu (zatial len username)
export interface XPostLoginRequest {
    username?: string;
}

export interface XPostLoginResponse {
    xUser?: XUser;
}
