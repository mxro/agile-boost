import {graphqlUtils } from './';

it('Provides a root type', () => expect(graphqlUtils.rootTypes()).not.toBeUndefined());