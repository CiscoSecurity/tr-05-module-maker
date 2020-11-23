import { capabilitiesReducer } from "../container/Content/components/Capabilities/capabilitiesReducer"
import * as types from "../globals/constants/types"
import * as mocks from "./mocks/mockPayloads"


describe('capabilities reducer', () => {
    it('should return the initial state', () => {
        expect(
            capabilitiesReducer(undefined, {})
        ).toEqual([])
    })

    it('should handle ADD_CAPABILITY', () => {
        const api = 'health'
        expect(
            capabilitiesReducer([], {
                type: types.ADD_CAPABILITY,
                payload: {id: api}
            })
        ).toEqual([{id: 'health'}])
    })

    it('should handle UPDATE_CAPABILITY_DESCR', () => {
        const api = mocks.UPDATE_CAPABILITY_DESCR_MOCK
        expect(
            capabilitiesReducer([{id: api.id}], {
                type: types.UPDATE_CAPABILITY_DESCR,
                payload: api
            })
        ).toEqual([api])
    })

    it('should handle DELETE_CAPABILITY', () => {
        const api = 'health'
        expect(
            capabilitiesReducer([{id: api}], {
                type: types.DELETE_CAPABILITY,
                payload: api
            })
        ).toEqual([])
    })
})
