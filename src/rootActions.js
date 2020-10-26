import { READ_STATE_FROM_FILE } from "globals/constants/types";

export const readStateFromFile = (json) => ({
    type: READ_STATE_FROM_FILE,
    payload: json
})
