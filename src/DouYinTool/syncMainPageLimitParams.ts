import { TypeByHandleLimitParams } from "../type";

export function syncMainPageLimitParams(params: TypeByHandleLimitParams) {
    window.douyinCore.limitParams = params;
    return true;
}