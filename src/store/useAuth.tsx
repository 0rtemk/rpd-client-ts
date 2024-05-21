import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';
import { AppAbility, UserRole, buildAbilityFor } from '../ability/CaslAbility';

interface userName {
    name: string;
    surname: string;
    patronymic: string;
}

interface useAuthState {
    ability: AppAbility;
    userName: string | undefined;
    updateAbility: (roleIndex?: number) => void;
    updateUserName: (name: userName | undefined) => void;
}

const useAuth = create<useAuthState>()(immer((set) => ({
    ability: buildAbilityFor('anonymous'),
    userName: undefined,
    updateAbility: (roleIndex) => {
      set((state) => {
        let role: UserRole = "anonymous";
        switch (roleIndex) {
            case 1:
                role = "admin";
                break;
            case 2:
                role = "teacher";
                break;
            case 3:
                role = "rop";
                break;
            default:
              role = "anonymous";
              break;
        };
  
        state.ability = buildAbilityFor(role);
      })
    },
    updateUserName: (name) => {
        set((state) => {
            let userName = undefined;
            if(name)
                userName = `${name.surname} ${Array.from(name.name)[0]}. ${Array.from(name.patronymic)[0]}.`;
            else
                userName = "Неизвестно";
            state.userName = userName;
        })
    }
})));

export default useAuth;