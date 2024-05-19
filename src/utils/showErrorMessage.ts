import { VariantType, enqueueSnackbar } from "notistack";

export default (error: string) => {
  const variant: VariantType = 'error';
  return enqueueSnackbar(error, { variant });
}
