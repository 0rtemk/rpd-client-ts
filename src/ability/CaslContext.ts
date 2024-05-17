import { createContext } from 'react';
import { AppAbility, buildAbilityFor } from './CaslAbility';

//@NOTE Поменять роль на "anonymous" | "teacher" | "rop" | "admin" для показа изменений
const CaslContext = createContext<AppAbility>(
    buildAbilityFor('anonymous')
);

export default CaslContext;