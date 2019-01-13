import CREATE_USER from './graphql/createuser';
import React from 'react';
import { MockedProvider } from 'react-apollo/test-utils';
import SignupForm from './SignupForm';
import enzyme, { mount } from 'enzyme';
import wait from 'waait';

import Adapter from 'enzyme-adapter-react-16';
enzyme.configure({ adapter: new Adapter() });

const mocks = [
    {
        request: {
            query: CREATE_USER,
            variables: {
                userInput: {sessionId: '123', username: 'test'}
            }
        },
        result: {
            data: {
                createUser: {
                    _id: "dummyid"
                }
            },
        },
    },
];


let Component;
let cookiesMap = {};

beforeEach(() => {
    const cookies = {
        set: (name, value) => {cookiesMap[name] = value;}
    }
    Component = mount(<MockedProvider mocks={mocks} addTypename={false}>
        <SignupForm sessionId="123" cookies={cookies}/>
    </MockedProvider>);

})

it('Expects a username', async () => {

    window.alert = jest.fn();
    const Form = Component.find('[type="text"]');
    Form.simulate('submit');
    expect(window.alert).toHaveBeenCalledWith('Please provide a username');
    await wait(0);

});

it('Allows creating a new user', async () => {

    const input = Component.find('[type="text"]');
    input.instance().value = "test";
    input.simulate('change', { target: { value: 'test' } });
    const form = Component.find('form');

    form.simulate('submit');
    await wait(0);


    expect(cookiesMap['sessionId']).not.toBeUndefined();
});
