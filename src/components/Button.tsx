import { memo } from "react";

export default memo(
  //@NOTE Типизация
  //@ts-expect-error
  ({ children, ...rest }) => (
  <button {...rest}>
    {children}
  </button>
));
