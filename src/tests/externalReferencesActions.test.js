import * as actions from "../container/Content/components/ExternalReferences/externalReferencesActions"
import * as types from "../globals/constants/types"


jest.mock('uuid', () => ({ v4: () => '00000000-0000-0000-0000-000000000000' }));


describe('external references actions', () => {
    it('should create an action to add external reference', () => {
        const id = '00000000-0000-0000-0000-000000000000'
        const expectedAction = {
            type: types.ADD_EXTERNAL_REFERENCE,
            payload: {id: id}
        }
        expect(actions.addExternalReference()).toEqual(expectedAction)
    })
    it('should create an action to update external reference', () => {
        const id = '00000000-0000-0000-0000-000000000000'
        const pair = {value: 'https://www.google.com/', label: 'Google'}
        const expectedAction = {
            type: types.UPDATE_EXTERNAL_REFERENCE,
            payload: {id: id, pair: pair}
        }
        expect(actions.updateExternalReference(id, pair)).toEqual(expectedAction)
    })
    it('should create an action to delete external reference', () => {
        const id = '00000000-0000-0000-0000-000000000000'
        const expectedAction = {
            type: types.DELETE_EXTERNAL_REFERENCE,
            payload: id
        }
        expect(actions.deleteExternalReference(id)).toEqual(expectedAction)
    })
})

