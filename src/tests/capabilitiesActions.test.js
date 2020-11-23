import * as actions from "../container/Content/components/Capabilities/capabilitiesActions"
import * as types from "../globals/constants/types"
import * as mocks from "./mocks/mockPayloads"


describe('capabilities actions', () => {
    it('should create an action to add capability', () => {
        const api = 'health'
        const expectedAction = {
            type: types.ADD_CAPABILITY,
            payload: {id: api}
        }
        expect(actions.addCapability(api)).toEqual(expectedAction)
    })
    it('should create an action to update capability', () => {
        const api = mocks.UPDATE_CAPABILITY_DESCR_MOCK
        const expectedAction = {
            type: types.UPDATE_CAPABILITY_DESCR,
            payload: api
        }
        expect(actions.updateCapabilityDescription(api)).toEqual(expectedAction)
    })
    it('should create an action to delete capability', () => {
        const api = 'health'
        const expectedAction = {
            type: types.DELETE_CAPABILITY,
            payload: api
        }
        expect(actions.deleteCapability(api)).toEqual(expectedAction)
    })
})

