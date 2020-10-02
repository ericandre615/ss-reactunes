import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import Index from '../index';

describe('Index View', () => {
  it('should match default snapshot', () => {
    const ShallowIndex = shallow(<Index />);

    expect(toJson(ShallowIndex)).toMatchSnapshot();
  });
});
