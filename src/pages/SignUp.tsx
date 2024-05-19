import { useForm, Controller } from "react-hook-form";
import { AuthContext } from "../context/AuthContext";
import { useContext } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { signUpSchema } from "./validtionSchemas";
import Select from "../components/Select";
import Field from "../components/Field";
import Button from "../components/Button";

const defaultValues = {
  userName: "",
  password: "",
  role: 1,
};

const rolesList = [
  {
    id: 1,
    title: "Администратор",
  },
  {
    id: 2,
    title: "Преподаватель",
  },
  {
    id: 3,
    title: "РОП",
  },
];

export default function SignUp() {
  //@NOTE Типизация
  //@ts-expect-error
  const { handleSignUp } = useContext(AuthContext);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues,
    resolver: yupResolver(signUpSchema),
  });

  return (
    <form onSubmit={handleSubmit(handleSignUp)}>
      <h2>Создать аккаунт</h2>
      <Field
        //@NOTE Типизация
        //@ts-expect-error
        name="userName"
        register={register}
        autoComplete="off"
        placeholder="Имя пользователя"
        error={Boolean(errors.userName)}
        helperText={errors.userName?.message}
      />
      <Field
        //@NOTE Типизация
        //@ts-expect-error
        name="password"
        register={register}
        autoComplete="off"
        placeholder="Пароль"
        error={Boolean(errors.password)}
        helperText={errors.password?.message}
      />
      <Controller
        control={control}
        name="role"
        render={({ field: { onChange, value } }) => (
          <Select
            //@NOTE Типизация
            //@ts-expect-error 
            onChange={onChange} 
            value={value} 
            options={rolesList} 
          />
        )}
      />
      <Button disabled={isSubmitting} type="submit">
        Зарегистрироваться
      </Button>
    </form>
  );
}
