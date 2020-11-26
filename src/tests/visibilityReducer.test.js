import { visibilityReducer }
    from "../container/Content/components/visibilityReducer"
import * as types from "../globals/constants/types"


describe('visibility reducer', () => {
    const initialState = {
        modalForPush: false,
        modalForPull: false,
        loader: false,
        customAlert: null
    }

    it('should return the initial state', () => {
        expect(
            visibilityReducer(undefined, {})
        ).toEqual(initialState)
    })

    it('should handle SHOW_MODAL_FOR_PUSH', () => {
        expect(
            visibilityReducer(initialState, {
                type: types.SHOW_MODAL_FOR_PUSH,
            })
        ).toEqual({
            modalForPush: true,
            modalForPull: false,
            loader: false,
            customAlert: null
        })
    })

    it('should handle HIDE_MODAL_FOR_PUSH', () => {
        expect(
            visibilityReducer({
                modalForPush: true,
                modalForPull: false,
                loader: false,
                customAlert: null
            }, {
                type: types.HIDE_MODAL_FOR_PUSH,
            })
        ).toEqual(initialState)
    })

    it('should handle SHOW_LOADER', () => {
        expect(
            visibilityReducer(initialState, {
                type: types.SHOW_LOADER,
            })
        ).toEqual({
            modalForPush: false,
            modalForPull: false,
            loader: true,
            customAlert: null
        })
    })

    it('should handle HIDE_LOADER', () => {
        expect(
            visibilityReducer({
                modalForPush: false,
                modalForPull: false,
                loader: true,
                customAlert: null
            }, {
                type: types.HIDE_LOADER,
            })
        ).toEqual(initialState)
    })

    it('should handle SHOW_MODAL_FOR_PULL', () => {
        expect(
            visibilityReducer(initialState, {
                type: types.SHOW_MODAL_FOR_PULL,
            })
        ).toEqual({
            modalForPush: false,
            modalForPull: true,
            loader: false,
            customAlert: null
        })
    })

    it('should handle HIDE_MODAL_FOR_PULL', () => {
        expect(
            visibilityReducer({
                modalForPush: false,
                modalForPull: false,
                loader: false,
                customAlert: null
            }, {
                type: types.HIDE_MODAL_FOR_PULL,
            })
        ).toEqual(initialState)
    })

    it('should handle SHOW_ALERT', () => {
        expect(
            visibilityReducer(initialState, {
                type: types.SHOW_ALERT,
                payload: {title: 'Test title', message: 'Test message'}
            })
        ).toEqual({
            modalForPush: false,
            modalForPull: false,
            loader: false,
            customAlert: {title: 'Test title', message: 'Test message'}
        })
    })

    it('should handle HIDE_ALERT', () => {
        expect(
            visibilityReducer({
                modalForPush: false,
                modalForPull: false,
                loader: false,
                customAlert: {title: 'Test title', message: 'Test message'}
            }, {
                type: types.HIDE_ALERT,
            })
        ).toEqual(initialState)
    })
})
