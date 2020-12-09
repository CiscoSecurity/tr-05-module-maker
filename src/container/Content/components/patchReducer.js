import { SAVE_PATCH_BASE } from "globals/constants/types";


export const patchReducer = (state = {}, action) => {
    switch (action.type) {
        case SAVE_PATCH_BASE:
            const json = action.payload.json;
            return {
                ...state,
                json: (({elements_visibility, ...json}) => json)(json),
                id: action.payload.id,
                url: action.payload.url
            }
        default: return state
    }
}
