import { externalReferencesReducer }
from "../container/Content/components/ExternalReferences/externalReferencesReducer"
import * as types from "../globals/constants/types"
import * as mocks from "./mocks/mockPayloads";


jest.mock('uuid', () => ({ v4: () => mocks.ID }));


describe('external references reducer', () => {
    it('should return the initial state', () => {
        expect(externalReferencesReducer(undefined,
            {})).toEqual([])
    })

    it('should handle ADD_EXTERNAL_REFERENCE', () => {
        expect(
            externalReferencesReducer([], {
                type: types.ADD_EXTERNAL_REFERENCE,
                payload: {id: mocks.ID}
            })
        ).toEqual([mocks.EMPTY_EXTERNAL_REFERENCE_MOCK])
    })
    it('should handle UPDATE_EXTERNAL_REFERENCE', () => {
        const pair = {name: 'link', value: 'https://www.google.com/'}
        expect(
            externalReferencesReducer([{
                link: '',
                id: mocks.ID
            }], {
                type: types.UPDATE_EXTERNAL_REFERENCE,
                payload: {id: mocks.ID, pair: pair}
            })
        ).toEqual([{
            link: 'https://www.google.com/',
            id: mocks.ID
        }])
    })
    it('should handle DELETE_EXTERNAL_REFERENCE', () => {
        expect(
            externalReferencesReducer([mocks.EMPTY_EXTERNAL_REFERENCE_MOCK], {
                type: types.DELETE_EXTERNAL_REFERENCE,
                payload: mocks.ID
            })
        ).toEqual([])
    })
})

