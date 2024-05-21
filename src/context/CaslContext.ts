import { createContext } from 'react';
import { AppAbility, buildAbilityFor } from '../ability/CaslAbility';

const CaslContext = createContext<AppAbility>(
    buildAbilityFor('anonymous')
);

export default CaslContext;