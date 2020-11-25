import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import ConfigurationSpec from "../../container/Content/components/ConfigurationSpec/ConfigurationSpec";
import React from "react";
import configureStore from 'redux-mock-store';
import toJson from "enzyme-to-json";
import * as mocks from "../mocks/mockPayloads"


const mockStore = configureStore([]);


describe('ConfigurationSpec', () => {
    it('should render ConfigurationSpec without ConfigurationSpecItems', () => {
        const store = mockStore({
            configuration_spec: [],
        });

        const wrapper = mount(
            <Provider store={store}>
                <ConfigurationSpec/>
            </Provider>);
        expect(wrapper.find('ConfigurationSpecItem')).toHaveLength(0);
        expect(toJson(wrapper)).toMatchSnapshot();
    })

    it('should render ConfigurationSpec with several ConfigurationSpecItems', () => {
        const store = mockStore({
            configuration_spec: [
                mocks.EMPTY_CONF_SPEC_MOCK,
                mocks.FILLED_CONF_SPEC_MOCK
            ]
        });

        const wrapper = mount(
            <Provider store={store}>
                <ConfigurationSpec/>
            </Provider>);
        expect(wrapper.find('ConfigurationSpecItem')).toHaveLength(2);
        expect(toJson(wrapper)).toMatchSnapshot();
    })
});
