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
        expect(
            actions.updateConfSpec(payload.conf_spec_id, payload.pair)
        ).toEqual(expectedAction)
    })

    it('should create an action to delete configuration spec', () => {
        const id = mocks.ID
        const expectedAction = {
            type: types.DELETE_CONF_SPEC,
            payload: {conf_spec_id: id}
        }
        expect(actions.deleteConfSpec(id)).toEqual(expectedAction)
    })

    it('should create an action to delete all options', () => {
        const id = mocks.ID
        const expectedAction = {
            type: types.DELETE_ALL_OPTIONS,
            payload: {conf_spec_id: id}
        }
        expect(actions.deleteAllOptions(id)).toEqual(expectedAction)
    })

    it('should create an action to delete option', () => {
        const id = mocks.ID
        const expectedAction = {
            type: types.DELETE_OPTION,
            payload: {
                conf_spec_id: id,
                option_id: id
            }
        }
        expect(actions.deleteOption(id, id)).toEqual(expectedAction)
    })

    it('should create an action to update option', () => {
        const id = mocks.ID
        const expectedAction = {
            type: types.UPDATE_OPTION,
            payload: {
                conf_spec_id: id,
                option_id: id,
                pair: {
                    name: 'label',
                    value: 'test'
                }
            }
        }
        expect(actions.updateOption(
            id, id, {name: 'label', value: 'test'}
            )).toEqual(expectedAction)
    })
})
