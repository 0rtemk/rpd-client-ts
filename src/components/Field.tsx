import { memo } from "react";

export default memo(
  //@NOTE Типизация
  //@ts-expect-error
  ({ register, name, error = false, helperText = "", ...rest }) => {
    return (
      <div>
        <input {...register(name)} {...rest} />
        {error && <p>{helperText}</p>}
      </div>
    );
  }
);
