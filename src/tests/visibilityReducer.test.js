import { visibilityReducer }
    from "../container/Content/components/visibilityReducer"
import * as types from "../globals/constants/types"


describe('visibility reducer', () => {
    const initialState = {
        confirmBox: null,
        isPatchActive: false,
        modalForPatch: false,
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
            confirmBox: null,
            isPatchActive: false,
            modalForPatch: false,
            modalForPush: true,
            modalForPull: false,
            loader: false,
            customAlert: null
        })
    })

    it('should handle HIDE_MODAL_FOR_PUSH', () => {
        expect(
            visibilityReducer({
                confirmBox: null,
                isPatchActive: false,
                modalForPatch: false,
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
            confirmBox: null,
            isPatchActive: false,
            modalForPatch: false,
            modalForPush: false,
            modalForPull: false,
            loader: true,
            customAlert: null
        })
    })

    it('should handle HIDE_LOADER', () => {
        expect(
            visibilityReducer({
                confirmBox: null,
                isPatchActive: false,
                modalForPatch: false,
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
            confirmBox: null,
            isPatchActive: false,
            modalForPatch: false,
            modalForPush: false,
            modalForPull: true,
            loader: false,
            customAlert: null
        })
    })

    it('should handle HIDE_MODAL_FOR_PULL', () => {
        expect(
            visibilityReducer({
                confirmBox: null,
                isPatchActive: false,
                modalForPatch: false,
                modalForPush: false,
                modalForPull: false,
                loader: false,
                customAlert: null
            }, {
                type: types.HIDE_MODAL_FOR_PULL,
            })
        ).toEqual(initialState)
    })

    it('should handle SHOW_MODAL_FOR_PATCH', () => {
        expect(
            visibilityReducer(initialState, {
                type: types.SHOW_MODAL_FOR_PATCH,
            })
        ).toEqual({
            confirmBox: null,
            isPatchActive: false,
            modalForPatch: true,
            modalForPush: false,
            modalForPull: false,
            loader: false,
            customAlert: null
        })
    })

    it('should handle HIDE_MODAL_FOR_PATCH', () => {
        expect(
            visibilityReducer({
                confirmBox: null,
                isPatchActive: false,
                modalForPatch: true,
                modalForPush: false,
                modalForPull: false,
                loader: false,
                customAlert: null
            }, {
                type: types.HIDE_MODAL_FOR_PATCH,
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
            confirmBox: null,
            isPatchActive: false,
            modalForPatch: false,
            modalForPush: false,
            modalForPull: false,
            loader: false,
            customAlert: {title: 'Test title', message: 'Test message'}
        })
    })

    it('should handle HIDE_ALERT', () => {
        expect(
            visibilityReducer({
                confirmBox: null,
                isPatchActive: false,
                modalForPatch: false,
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
