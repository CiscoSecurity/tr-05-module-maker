import * as actions from "../container/Content/components/ExternalReferences/externalReferencesActions"
import * as types from "../globals/constants/types"
import * as mocks from "./mocks/mockPayloads";


jest.mock('uuid', () => ({ v4: () => mocks.ID }));


describe('external references actions', () => {
    it('should create an action to add external reference', () => {
        const expectedAction = {
            type: types.ADD_EXTERNAL_REFERENCE,
            payload: {id: mocks.ID}
        }
        expect(actions.addExternalReference()).toEqual(expectedAction)
    })

    it('should create an action to update external reference', () => {
        const pair = {name: 'link', value: 'https://www.google.com/'}
        const expectedAction = {
            type: types.UPDATE_EXTERNAL_REFERENCE,
            payload: {id: mocks.ID, pair: pair}
        }
        expect(
            actions.updateExternalReference(mocks.ID, pair)
        ).toEqual(expectedAction)
    })

    it('should create an action to delete external reference', () => {
        const expectedAction = {
            type: types.DELETE_EXTERNAL_REFERENCE,
            payload: mocks.ID
        }
        expect(
            actions.deleteExternalReference(mocks.ID)
        ).toEqual(expectedAction)
    })
})
