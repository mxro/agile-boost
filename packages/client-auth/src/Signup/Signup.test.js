import enzyme, { mount } from 'enzyme';
import React, { Component } from 'react';
import Signup from './Signup';
import Adapter from 'enzyme-adapter-react-16';
import { MockedProvider } from 'react-apollo/test-utils';

enzyme.configure({ adapter: new Adapter() });

it('Renders message', () => {
   const cookies = {
       get: () => "dummy"
   };

   const component = mount(<Signup cookies={cookies}></Signup>)
   
   expect(component.html()).toContain("You are already logged in");
});

it('Renders form', () => {
    const cookies = {
        get: () => null
    }

    const component = mount(<MockedProvider ><Signup cookies={cookies}></Signup></MockedProvider>)


    expect(component.find('input')).toHaveLength(2);
});