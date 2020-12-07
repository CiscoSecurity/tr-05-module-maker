import { SAVE_PATCH_BASE } from "globals/constants/types";

export const savePatchBase = (id, json, url) => ({
    type: SAVE_PATCH_BASE,
    payload: {id: id, json: json, url: url}
})
