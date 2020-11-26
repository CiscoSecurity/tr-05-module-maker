import * as actions from "../container/Content/components/Properties/propertiesActions"
import * as types from "../globals/constants/types"


describe('properties actions', () => {
    it('should create an action to toggle auth-type', () => {
        const expectedAction = {
            type: types.TOGGLE_AUTH_TYPE,
        }
        expect(actions.toggleAuthType()).toEqual(expectedAction)
    })

    it('should create an action to update supported API', () => {
        const api = 'health'
        const expectedAction = {
            type: types.UPDATE_SUPPORTED_API,
            payload: api
        }
        expect(actions.updateSupportedAPI(api)).toEqual(expectedAction)
    })

    it('should create an action to update auth-type', () => {
        const type = 'basic'
        const expectedAction = {
            type: types.UPDATE_AUTH_TYPE,
            payload: type
        }
        expect(actions.updateAuthType(type)).toEqual(expectedAction)
    })
})
