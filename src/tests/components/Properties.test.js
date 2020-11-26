import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import Properties from "../../container/Content/components/Properties/Properties";
import React from "react";
import configureStore from 'redux-mock-store';
import toJson from "enzyme-to-json";


const mockStore = configureStore([]);


describe('Properties', () => {
    it('should render Properties with disabled AuthType select', () => {
        const store = mockStore({
            properties: {'supported-apis': []},
        });

        const wrapper = mount(
            <Provider store={store}>
                <Properties/>
            </Provider>);
        expect(wrapper.find('SupportedAPI')).toHaveLength(9);
        expect(wrapper.find('AuthType select').props()['disabled']).toBeTruthy();
        expect(toJson(wrapper)).toMatchSnapshot();
    })

    it('should render Properties with enabled AuthType select', () => {
        const store = mockStore({
            properties: {
                'supported-apis': [],
                'auth-type': ''
            }
        });

        const wrapper = mount(
            <Provider store={store}>
                <Properties/>
            </Provider>);
        expect(wrapper.find('SupportedAPI')).toHaveLength(9);
        expect(wrapper.find('AuthType select').props()['disabled']).toBeFalsy();
        expect(toJson(wrapper)).toMatchSnapshot();
    })
});
