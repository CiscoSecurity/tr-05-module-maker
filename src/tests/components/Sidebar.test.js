import {mount} from 'enzyme';
import {Provider} from 'react-redux';
import Sidebar from "../../container/Content/components/Sidebar/Sidebar";
import React from "react";
import configureStore from 'redux-mock-store';
import toJson from "enzyme-to-json";


const mockStore = configureStore([]);


describe('Sidebar', () => {
    it('should render Sidebar without modals, custom alert, loader', () => {
        const store = mockStore({
            elements_visibility: {
                modalForPush: false,
                modalForPull: false,
                customAlert: null
            }
        });

        const wrapper = mount(
            <Provider store={store}>
                <Sidebar/>
            </Provider>);

        expect(wrapper.find('CustomAlert')).toHaveLength(0);
        expect(wrapper.find('ModalForPull')).toHaveLength(0);
        expect(wrapper.find('ModalForPush')).toHaveLength(0);
        expect(toJson(wrapper)).toMatchSnapshot();
    })

    it('should render Sidebar with modalForPush', () => {
        const store = mockStore({
            elements_visibility: {
                modalForPush: true,
                modalForPull: false,
                loader: false,
                customAlert: null
            },
            configuration_spec: [],
            external_references: []
        });

        const wrapper = mount(
            <Provider store={store}>
                <Sidebar/>
            </Provider>);

        expect(wrapper.find('ModalForPush')).toHaveLength(1);
        expect(wrapper.find('ModalForPull')).toHaveLength(0);
        expect(wrapper.find('CustomAlert')).toHaveLength(0);
        expect(toJson(wrapper)).toMatchSnapshot();
    })

    it('should render Sidebar with modalForPull', () => {
        const store = mockStore({
            elements_visibility: {
                modalForPush: false,
                modalForPull: true,
                loader: false,
                customAlert: null
            },
            configuration_spec: [],
            external_references: []
        });

        const wrapper = mount(
            <Provider store={store}>
                <Sidebar/>
            </Provider>);

        expect(wrapper.find('ModalForPush')).toHaveLength(0);
        expect(wrapper.find('ModalForPull')).toHaveLength(1);
        expect(wrapper.find('CustomAlert')).toHaveLength(0);
        expect(toJson(wrapper)).toMatchSnapshot();
    })

    it('should render Sidebar with CustomAlert', () => {
        const store = mockStore({
            elements_visibility: {
                modalForPush: false,
                modalForPull: false,
                loader: false,
                customAlert: {title: 'Test title', message: 'Test message'}
            }
        });

        const wrapper = mount(
            <Provider store={store}>
                <Sidebar/>
            </Provider>);

        expect(wrapper.find('ModalForPush')).toHaveLength(0);
        expect(wrapper.find('ModalForPull')).toHaveLength(0);
        expect(wrapper.find('CustomAlert')).toHaveLength(1);
        expect(toJson(wrapper)).toMatchSnapshot();
    })
});
