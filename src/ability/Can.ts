import { createContextualCan } from '@casl/react';
import CaslContext from '../context/CaslContext';

const Can = createContextualCan(CaslContext.Consumer);

export default Can;