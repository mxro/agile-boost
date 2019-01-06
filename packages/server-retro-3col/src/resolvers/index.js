import boardResolver from './board';
import columnResolver from './column';
import entryResolver from './entry';

import { merge } from 'lodash';

export default merge(boardResolver,columnResolver,entryResolver);