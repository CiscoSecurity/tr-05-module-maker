import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import Capabilities from "../../container/Content/components/Capabilities/Capabilities";
import React from "react";
import configureStore from 'redux-mock-store';
import toJson from "enzyme-to-json";


const mockStore = configureStore([]);


describe('Capabilities', () => {
    it('should render Capabilities with 1 Capability', () => {
        const store = mockStore({
            capabilities: [{id: 'health'}],
        });

        const wrapper = mount(
            <Provider store={store}>
                <Capabilities/>
            </Provider>);
        expect(wrapper.find('Capability')).toHaveLength(1);
        expect(toJson(wrapper)).toMatchSnapshot();
    })

    it('should render Capabilities with several inner entities', () => {
        const store = mockStore({
            capabilities: [{id: 'health'}, {id: 'respond'}]
        });

        const wrapper = mount(
            <Provider store={store}>
                <Capabilities/>
            </Provider>);
        expect(wrapper.find('Capability')).toHaveLength(2);
        expect(toJson(wrapper)).toMatchSnapshot();
    })
});
