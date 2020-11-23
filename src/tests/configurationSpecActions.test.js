import * as actions from "../container/Content/components/ConfigurationSpec/configurationSpecActions"
import * as types from "../globals/constants/types"
import * as mocks from "./mocks/mockPayloads";


jest.mock('uuid', () => ({ v4: () => mocks.ID }));


describe('configuration spec actions', () => {
    it('should create an action to add configuration spec', () => {
        const expectedAction = {
            type: types.ADD_CONF_SPEC,
            payload: mocks.EMPTY_CONF_SPEC_MOCK
        }
        expect(actions.addConfSpec()).toEqual(expectedAction)
    })
    it('should create an action to update configuration spec', () => {
        const payload = {
            conf_spec_id: mocks.ID,
            pair: {name: 'key', value: 'url'}
        }
        const expectedAction = {
            type: types.UPDATE_CONF_SPEC,
            payload: payload
        }
        expect(actions.updateConfSpec(payload.conf_spec_id, payload.pair)).toEqual(expectedAction)
    })
    it('should create an action to delete configuration spec', () => {
        const id = mocks.ID
        const expectedAction = {
            type: types.DELETE_CONF_SPEC,
            payload: {conf_spec_id: id}
        }
        expect(actions.deleteConfSpec(id)).toEqual(expectedAction)
    })
})

