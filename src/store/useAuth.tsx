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
    userRole: string;
    updateAbility: (roleIndex?: number) => void;
    updateUserName: (name: userName | undefined) => void;
}

const useAuth = create<useAuthState>()(immer((set) => ({
    ability: buildAbilityFor('anonymous'),
    userName: undefined,
    userRole: "anonymous",
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
        
        state.userRole = role;
        state.ability = buildAbilityFor(role);
      })
    },
    updateUserName: (name) => {
        set((state) => {
            let userName = undefined;
            if(name)
                userName = `${name.surname} ${name.name} ${name.patronymic}`;
            else
                userName = "Неизвестно";
            state.userName = userName;
        })
    }
})));

export default useAuth;