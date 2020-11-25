import { mount } from 'enzyme';
import { CustomAlert } from "../../container/Content/components/CustomAlert/CustomAlert";
import React from "react";
import toJson from "enzyme-to-json";


describe('CustomAlert', () => {
    it('should render CustomAlert', () => {
        const props = {title: 'Test title', message: 'Test message'}
        const wrapper = mount(<CustomAlert {...props}/>);

        expect(wrapper.find('div.alertHeader').text()).toBe('Test title');
        expect(wrapper.find('div.alertBody').text()).toBe('Test message');
        expect(toJson(wrapper)).toMatchSnapshot();
    })
});
