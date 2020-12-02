import { Provider } from 'react-redux';
import MarkdownEditor from "../../container/Content/components/MarkdownEditor/MarkdownEditor";
import React from "react";
import configureStore from 'redux-mock-store';
import { mount } from "enzyme";
import toJson from "enzyme-to-json";


const mockStore = configureStore([]);


describe('MarkdownEditor', () => {
    const store = mockStore({
        other_inputs: {
            tips: 'Test *tip*'
        },
    });

    it('should render Markdown in preview mode', () => {
        const wrapper = mount(
            <Provider store={store}>
                <MarkdownEditor name="tips" />
            </Provider>
        );

        expect(toJson(wrapper)).toMatchSnapshot();

        wrapper.find('button[children="Preview"]').simulate('click');

        expect(toJson(wrapper)).toMatchSnapshot();
    });
});
