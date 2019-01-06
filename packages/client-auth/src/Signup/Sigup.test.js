import CREATE_USER from './graphql/createuser';
import React from 'react';
import renderer from 'react-test-renderer'
import { MockedProvider } from 'react-apollo/test-utils';
import ReactTestUtils from 'react-dom/test-utils';
import Signup from './Signup';

import wait from 'waait';

const mocks = [
  {
    request: {
      query: CREATE_USER 
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


it('Creates a user', async () => {

  const component = renderer.create(<MockedProvider mocks={mocks} addTypename={false}>
    <Signup />
  </MockedProvider>);

  //expect(component.toJSON()).toEqual('Loading...');
    ReactTestUtils.Simulate.click(component.root.findByType('button'));
  // to wait for event loop to complete - after which component should be loaded
  await wait(0);
console.log(component.toJSON());
//  expect(pre.children).toContain('Harry Potter and the Chamber of Secrets');

});