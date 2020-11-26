import { shallow } from 'enzyme';
import Header from "../../container/Content/components/Header/Header";
import React from "react";
import toJson from 'enzyme-to-json';


describe('Header', () => {
    it('should render a header', () => {
        const wrapper = shallow(<Header/>);
        expect(toJson(wrapper)).toMatchSnapshot();
    })
});
