import * as actions from "../container/Content/components/Capabilities/capabilitiesActions"
import * as types from "../globals/constants/types"


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
        const api = {id: 'health', description: 'Check the health of some API'}
        const expectedAction = {
            type: types.UPDATE_CAPABILITY_DESCR,
            payload: {id: api.id, description: api.description}
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

