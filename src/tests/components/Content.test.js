import { Provider } from 'react-redux';
import Content from "../../container/Content/Content";
import React from "react";
import configureStore from 'redux-mock-store';
import toJson from "enzyme-to-json";
import { mount } from "enzyme";


const mockStore = configureStore([]);


describe('Content', () => {
    it('should render Content', () => {
        const store = mockStore({
            other_inputs: {},
            properties: {},
            capabilities: [],
            external_references: [],
            configuration_spec: [],
        });

        const wrapper = mount(
            <Provider store={store}>
                <Content/>
            </Provider>);
        expect(toJson(wrapper)).toMatchSnapshot();
    })
});
