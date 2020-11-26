import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import ExternalReferences from "../../container/Content/components/ExternalReferences/ExternalReferences";
import React from "react";
import configureStore from 'redux-mock-store';
import toJson from "enzyme-to-json";
import * as mocks from "../mocks/mockPayloads"


const mockStore = configureStore([]);


describe('ExternalReferences', () => {
    it('should render ExternalReferences without CustomInputs', () => {
        const store = mockStore({
            external_references: [],
        });

        const wrapper = mount(
            <Provider store={store}>
                <ExternalReferences/>
            </Provider>);
        expect(wrapper.find('CustomInput')).toHaveLength(0);
        expect(toJson(wrapper)).toMatchSnapshot();
    })

    it('should render ExternalReferences with several CustomInputs', () => {
        const store = mockStore({
            external_references:
                mocks.EXTERNAL_REFERENCES
        });

        const wrapper = mount(
            <Provider store={store}>
                <ExternalReferences/>
            </Provider>);
        expect(wrapper.find('CustomInput')).toHaveLength(2);
        expect(toJson(wrapper)).toMatchSnapshot();
    })
});
