
// eslint-disable-next-line import/prefer-default-export
import decodeJWT from "@/helpers/parserJWT";
import {getToken} from "@/helpers/helpers";

export const Obuchenie = () => decodeJWT(getToken()).roles === 'ROLE_APP_Recruiting_Obuchenie'
export const Admin = () => decodeJWT(getToken()).roles === 'ROLE_APP_Recruiting_Admin'
export const Expert = () => decodeJWT(getToken()).roles === 'ROLE_APP_Recruiting_Expert'
export const Audit = () => decodeJWT(getToken()).roles === 'ROLE_APP_Recruiting_it_audit'
