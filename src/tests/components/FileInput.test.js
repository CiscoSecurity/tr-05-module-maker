import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import FileInput from "../../container/Content/components/FileInput/FileInput";
import React from "react";
import configureStore from 'redux-mock-store';
import * as mocks from "../mocks/mockPayloads"
import toJson from "enzyme-to-json";


const mockStore = configureStore([]);


describe('FileInput', () => {
    const handleLoadLocalFile = jest.fn();

    it('should render FileInput with image preview', () => {
            const store = mockStore({
                logo: mocks.LOAD_FILE_MOCK,
            });

        const wrapper = mount(
            <Provider store={store}>
                <FileInput  value={mocks.LOAD_FILE_MOCK}
                            onChange={handleLoadLocalFile}/>
            </Provider>);

        expect(wrapper.find('img')).toHaveLength(1);
        expect(toJson(wrapper)).toMatchSnapshot();
    })

    it('should render FileInput without image preview', () => {
        const store = mockStore({
            logo: mocks.LOAD_FILE_MOCK,
        });

        const wrapper = mount(
            <Provider store={store}>
                <FileInput  value={''}
                            onChange={handleLoadLocalFile}/>
            </Provider>);

        expect(wrapper.find('img')).toHaveLength(0);
        expect(toJson(wrapper)).toMatchSnapshot();
    })
});
