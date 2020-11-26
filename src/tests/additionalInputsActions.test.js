import * as actions from "../container/Content/additionalInputsActions"
import * as types from "../globals/constants/types"
import * as mocks from "./mocks/mockPayloads"


describe('additional inputs actions', () => {
    it('should create an action to update single input', () => {
        const data = mocks.UPDATE_SINGLE_INPUT_MOCK
        const expectedAction = {
            type: types.UPDATE_SINGLE_INPUT,
            payload: data
        }
        expect(actions.updateSingleInput(data)).toEqual(expectedAction)
    })

    it('should create an action to update flags', () => {
        const list = mocks.UPDATE_FlAGS_MOCK
        const expectedAction = {
            type: types.UPDATE_FlAGS,
            payload: list
        }
        expect(actions.updateFlags(list)).toEqual(expectedAction)
    })

    it('should create an action to update logo', () => {
        const image = mocks.LOAD_FILE_MOCK
        const expectedAction = {
            type: types.LOAD_FILE,
            payload: image
        }
        expect(actions.onFileLoaded(image)).toEqual(expectedAction)
    })

    it('should create an action to delete logo', () => {
        const expectedAction = {
            type: types.DELETE_LOGO,
        }
        expect(actions.deleteLogo()).toEqual(expectedAction)
    })
})
