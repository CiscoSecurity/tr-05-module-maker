import * as actions from "../container/Content/components/ConfigurationSpec/configurationSpecActions"
import * as types from "../globals/constants/types"


jest.mock('uuid', () => ({ v4: () => '00000000-0000-0000-0000-000000000000' }));


describe('configuration spec actions', () => {
    it('should create an action to add configuration spec', () => {
        const expectedAction = {
            type: types.ADD_CONF_SPEC,
            payload:   {
                "key": "",
                "type": "",
                "label": "",
                "tooltip": "",
                "subtype": "",
                "required": false,
                "group": "",
                "options": [],
                "id": '00000000-0000-0000-0000-000000000000'
            }
        }
        expect(actions.addConfSpec()).toEqual(expectedAction)
    })
    it('should create an action to update configuration spec', () => {
        const payload = {
            conf_spec_id: 'a5eaf78a-efd8-46d5-83b0-921436601b35',
            pair: {value: 'key', label: 'url'}
        }
        const expectedAction = {
            type: types.UPDATE_CONF_SPEC,
            payload: payload
        }
        expect(actions.updateConfSpec(payload.conf_spec_id, payload.pair)).toEqual(expectedAction)
    })
    it('should create an action to delete configuration spec', () => {
        const id = 'a5eaf78a-efd8-46d5-83b0-921436601b35'
        const expectedAction = {
            type: types.DELETE_CONF_SPEC,
            payload: {conf_spec_id: id}
        }
        expect(actions.deleteConfSpec(id)).toEqual(expectedAction)
    })
})

