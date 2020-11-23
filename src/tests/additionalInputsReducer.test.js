import {additionalInputsReducer} from "../container/Content/additionalInputsReducer"
import * as types from "../globals/constants/types"
import * as mocks from "./mocks/mockPayloads"


describe('additional inputs reducer', () => {
    it('should return the initial state', () => {
        expect(additionalInputsReducer(undefined,
            {})).toEqual({})
    })

    it('should handle UPDATE_SINGLE_INPUT', () => {
        expect(
            additionalInputsReducer({}, {
                type: types.UPDATE_SINGLE_INPUT,
                payload: mocks.UPDATE_SINGLE_INPUT_MOCK
            })
        ).toEqual({
                title: 'Test'
            }
        )
    })

    it('should handle UPDATE_FlAGS', () => {
        expect(
            additionalInputsReducer({}, {
                type: types.UPDATE_FlAGS,
                payload: mocks.UPDATE_FlAGS_MOCK
            })
        ).toEqual({
                flags: mocks.UPDATE_FlAGS_MOCK
            }
        )
    })

    it('should handle LOAD_FILE', () => {
        const image = mocks.LOAD_FILE_MOCK
            expect(
                additionalInputsReducer({}, {
                    type: types.LOAD_FILE,
                    payload: image
                })
            ).toEqual({
                    logo: image
                }
            )
        })

    it('should handle DELETE_LOGO', () => {
        expect(
            additionalInputsReducer({logo: mocks.LOAD_FILE_MOCK}, {
                type: types.DELETE_LOGO
            })
        ).toEqual({})
    })
})

