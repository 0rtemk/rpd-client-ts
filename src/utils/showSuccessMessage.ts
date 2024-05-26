import { VariantType, enqueueSnackbar } from "notistack";

export default (message: string) => {
  const variant: VariantType = 'success';
  return enqueueSnackbar(message, { variant });
}
