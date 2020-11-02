import { READ_STATE_FROM_BACKEND } from "globals/constants/types";

export const readStateFromBackend = (json) => ({
    type: READ_STATE_FROM_BACKEND,
    payload: json
})
