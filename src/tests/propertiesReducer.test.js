import { propertiesReducer }
from "../container/Content/components/Properties/propertiesReducer"
import * as types from "../globals/constants/types"


describe('properties reducer', () => {
    it('should return the initial state', () => {
        expect(
            propertiesReducer(undefined, {})
        ).toEqual({"supported-apis": []})
    })

    it('should handle TOGGLE_AUTH_TYPE', () => {
        expect(
            propertiesReducer({"supported-apis": []}, {
                type: types.TOGGLE_AUTH_TYPE,
            })
        ).toEqual({"supported-apis": [], 'auth-type': ''})

        expect(
            propertiesReducer({"supported-apis": [], 'auth-type': ''}, {
                type: types.TOGGLE_AUTH_TYPE,
            })
        ).toEqual({"supported-apis": []})
    })

    it('should handle UPDATE_SUPPORTED_API', () => {
        const api = 'health'
        expect(
            propertiesReducer({'supported-apis': []}, {
                type: types.UPDATE_SUPPORTED_API,
                payload: api
            })
        ).toEqual({'supported-apis': ['health']})

        expect(
            propertiesReducer({'supported-apis': ['health']}, {
                type: types.UPDATE_SUPPORTED_API,
                payload: api
            })
        ).toEqual({'supported-apis': []})
    })

    it('should handle UPDATE_AUTH_TYPE', () => {
        const type = 'basic'
        expect(
            propertiesReducer({'supported-apis': [], 'auth-type': 'bearer'}, {
                type: types.UPDATE_AUTH_TYPE,
                payload: type
            })
        ).toEqual({'supported-apis': [], 'auth-type': 'basic'})
    })
})
