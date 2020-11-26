import * as actions from "rootActions"
import * as types from "globals/constants/types"


describe('root actions', () => {
    it('should create an action to read state from backend', () => {
        const expectedAction = {
            type: types.READ_STATE_FROM_BACKEND,
            payload: {}
        }
        expect(actions.readStateFromBackend({})).toEqual(expectedAction)
    })

    it('should create an action to pull Module Type', () => {
        const payload = {
            module_type_id: 'test_id',
            client_id: 'client_id',
            password: 'password',
            iroh_service_url: 'iroh_service_url'
        }
        const expectedAction = {
            type: types.PULL_MODULE_TYPE_REQUEST,
            payload
        }
        expect(actions.pullModuleTypeRequest(
            payload.module_type_id,
            payload.client_id,
            payload.password,
            payload.iroh_service_url
        )).toEqual(expectedAction)
    })

    it('should create an action on pull Module Type Success', () => {
        const expectedAction = {
            type: types.PULL_MODULE_TYPE_SUCCESS,
            payload: {}
        }
        expect(actions.onPullModuleTypeSuccess({})).toEqual(expectedAction)
    })

    it('should create an action on pull Module Type Error', () => {
        const expectedAction = {
            type: types.PULL_MODULE_TYPE_ERROR,
            payload: 'error'
        }
        expect(actions.onPullModuleTypeError('error')).toEqual(expectedAction)
    })

    it('should create an action to push Module Type', () => {
        const expectedAction = {
            type: types.PUSH_MODULE_TYPE_REQUEST,
            payload: {
                json: {},
                client_id: 'client_id',
                password: 'password',
                iroh_service_url: 'iroh_service_url'
            }
        }
        expect(actions.pushModuleTypeRequest(
            {},
            {
                client_id: 'client_id',
                password: 'password',
                iroh_service_url: 'iroh_service_url',
            }
        )).toEqual(expectedAction)
    })

    it('should create an action on push Module Type Success', () => {
        const expectedAction = {
            type: types.PUSH_MODULE_TYPE_SUCCESS,
            payload: {}
        }
        expect(actions.onPushModuleTypeSuccess({})).toEqual(expectedAction)
    })

    it('should create an action on push Module Type Error', () => {
        const expectedAction = {
            type: types.PUSH_MODULE_TYPE_ERROR,
            payload: 'error'
        }
        expect(actions.onPushModuleTypeError('error')).toEqual(expectedAction)
    })
})
