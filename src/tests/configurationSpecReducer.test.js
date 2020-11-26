import { configurationSpecReducer }
from "../container/Content/components/ConfigurationSpec/configurationSpecReducer"
import * as types from "../globals/constants/types"
import * as mocks from "./mocks/mockPayloads";


jest.mock('uuid', () => ({ v4: () => mocks.ID }));


describe('configuration spec reducer', () => {
    it('should return the initial state', () => {
        expect(
            configurationSpecReducer(undefined, {})
        ).toEqual([])
    })

    it('should handle ADD_CONF_SPEC', () => {
        expect(
            configurationSpecReducer([], {
                type: types.ADD_CONF_SPEC,
                payload: mocks.EMPTY_CONF_SPEC_MOCK
            })
        ).toEqual([
                mocks.EMPTY_CONF_SPEC_MOCK
            ]
        )
    })

    it('should handle UPDATE_CONF_SPEC', () => {
        const payload = {
            conf_spec_id: mocks.ID,
            pair: {name: 'key', value: 'url'}
        }

        expect(
            configurationSpecReducer([mocks.EMPTY_CONF_SPEC_MOCK], {
                type: types.UPDATE_CONF_SPEC,
                payload: payload
            })
        ).toEqual([
                mocks.UPDATED_CONF_SPEC_MOCK
            ]
        )
    })

    it('should handle DELETE_CONF_SPEC', () => {
        expect(
            configurationSpecReducer(
                [mocks.EMPTY_CONF_SPEC_MOCK],
                {
                    type: types.DELETE_CONF_SPEC,
                    payload: {conf_spec_id: mocks.ID}
            })
        ).toEqual([])
    })

    it('should handle DELETE_ALL_OPTIONS', () => {
        expect(
            configurationSpecReducer(
                [mocks.FILLED_CONF_SPEC_MOCK],
                {
                    type: types.DELETE_ALL_OPTIONS,
                    payload: {conf_spec_id: mocks.FILLED_CONF_SPEC_MOCK.id}
                })
        ).toEqual([mocks.FILLED_CONF_SPEC_WITHOUT_OPTIONS_MOCK])
    })

    it('should handle DELETE_OPTION', () => {
        expect(
            configurationSpecReducer(
                [mocks.FILLED_CONF_SPEC_MOCK],
                {
                    type: types.DELETE_OPTION,
                    payload: {
                        conf_spec_id: mocks.FILLED_CONF_SPEC_MOCK.id,
                        option_id: mocks.FILLED_CONF_SPEC_MOCK.options[0].id
                    }
                })
        ).toEqual([mocks.FILLED_CONF_SPEC_WITHOUT_OPTIONS_MOCK])
    })

    it('should handle UPDATE_OPTION', () => {
        expect(
            configurationSpecReducer(
                [mocks.FILLED_CONF_SPEC_MOCK],
                {
                    type: types.UPDATE_OPTION,
                    payload: {
                        conf_spec_id: mocks.FILLED_CONF_SPEC_MOCK.id,
                        option_id: mocks.FILLED_CONF_SPEC_MOCK.options[0].id,
                        pair: {
                            name: 'label',
                            value: 'test label'
                        }
                    }
                })
        ).toEqual([mocks.FILLED_CONF_SPEC_MOCK_WITH_UPDATED_OPTION])
    })
})
