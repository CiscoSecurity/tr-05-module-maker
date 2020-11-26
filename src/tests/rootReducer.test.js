import { rootReducer } from "rootReducer"
import * as types from "globals/constants/types"
import * as mocks from "./mocks/mockPayloads";

jest.mock('uuid', () => ({ v4: () => mocks.ID }));

describe('root reducer', () => {
    it('should handle READ_STATE_FROM_BACKEND', () => {
        expect(
            rootReducer(mocks.STATE_BEFORE_UPLOADING_JSON, {
                type: types.READ_STATE_FROM_BACKEND,
                payload: mocks.JSON_FOR_OPENING_IN_APP
            })
        ).toEqual(mocks.STATE_AFTER_UPLOADING_JSON)
    })
})
