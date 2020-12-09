import * as actions from "../container/Content/components/visibilityActions"
import * as types from "../globals/constants/types"


describe('visibility actions', () => {
    it('should create an action to show ModalForPush', () => {
        const expectedAction = {
            type: types.SHOW_MODAL_FOR_PUSH
        }
        expect(actions.showModalForPush()).toEqual(expectedAction)
    })

    it('should create an action to hide ModalForPush', () => {
        const expectedAction = {
            type: types.HIDE_MODAL_FOR_PUSH
        }
        expect(actions.hideModalForPush()).toEqual(expectedAction)
    })

    it('should create an action to show ModalForPull', () => {
        const expectedAction = {
            type: types.SHOW_MODAL_FOR_PULL
        }
        expect(actions.showModalForPull()).toEqual(expectedAction)
    })

    it('should create an action to hide ModalForPull', () => {
        const expectedAction = {
            type: types.HIDE_MODAL_FOR_PULL
        }
        expect(actions.hideModalForPull()).toEqual(expectedAction)
    })

    it('should create an action to show alert', () => {
        const expectedAction = {
            type: types.SHOW_ALERT,
            payload: {title: 'Test title', message: 'Test message'}
        }
        expect(actions.showAlert(
            'Test title', 'Test message'
            )).toEqual(expectedAction)
    })

    it('should create an action to hide alert', () => {
        const expectedAction = {
            type: types.HIDE_ALERT
        }
        expect(actions.hideAlert()).toEqual(expectedAction)
    })

    it('should create an action to show loader', () => {
        const expectedAction = {
            type: types.SHOW_LOADER,
        }
        expect(actions.showLoader()).toEqual(expectedAction)
    })

    it('should create an action to hide loader', () => {
        const expectedAction = {
            type: types.HIDE_LOADER
        }
        expect(actions.hideLoader()).toEqual(expectedAction)
    })

    it('should create an action to show confirm box', () => {
        const expectedAction = {
            type: types.SHOW_CONFIRM_BOX,
            payload: {title: 'Test title', message: 'Test message'}
        }
        expect(actions.showConfirmBox(
            'Test title', 'Test message'
        )).toEqual(expectedAction)
    })

    it('should create an action to hide confirm box', () => {
        const expectedAction = {
            type: types.HIDE_CONFIRM_BOX
        }
        expect(actions.hideConfirmBox()).toEqual(expectedAction)
    })

    it('should create an action to show ModalForPatch', () => {
        const expectedAction = {
            type: types.SHOW_MODAL_FOR_PATCH
        }
        expect(actions.showModalForPatch()).toEqual(expectedAction)
    })

    it('should create an action to hide ModalForPatch', () => {
        const expectedAction = {
            type: types.HIDE_MODAL_FOR_PATCH
        }
        expect(actions.hideModalForPatch()).toEqual(expectedAction)
    })

})
