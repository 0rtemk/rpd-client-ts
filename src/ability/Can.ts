import { createContextualCan } from '@casl/react';
import CaslContext from './CaslContext';

const Can = createContextualCan(CaslContext.Consumer);

export default Can;