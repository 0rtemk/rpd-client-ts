import { AbilityBuilder, Ability, AbilityClass } from "@casl/ability";

type Actions = "get";
type Subjects = "auth" | "lk" | "rop_interface" | "teacher_interface" | "change_templates";
export type UserRole = "anonymous" | "teacher" | "rop" | "admin";

export type AppAbility = Ability<[Actions, Subjects]>;
const AppAbilityClass = Ability as AbilityClass<AppAbility>;

const defineRulesFor = (role: UserRole) => {
    const { can, rules } = new AbilityBuilder(AppAbilityClass);
    
    if (role === "anonymous") {
        can("get", "auth")
    }
    if (role === "teacher") {
        can("get", "teacher_interface")
        can("get", "lk")
    }
    else if (role === "rop") {
        can("get", "rop_interface")
        can("get", "lk")
    }
    else if (role === "admin") {
        can("get", "change_templates")
        can("get", "lk")
    }

    return rules;
};

export const buildAbilityFor = (role: UserRole): AppAbility => {
    console.log("building for: ", role);
    return new AppAbilityClass(defineRulesFor(role), {});
};