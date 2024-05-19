import { memo } from "react";

export default memo(
  //@NOTE Типизация
  //@ts-expect-error
  ({ options = [], ...rest }) => (
  <select {...rest}>
    {options.map(
      //@NOTE Типизация
      //@ts-expect-error
      ({ id, title }) => (
      <option key={id} value={id}>
        {title}
      </option>
    ))}
  </select>
));
