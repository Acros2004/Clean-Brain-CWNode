import { enqueueSnackbar } from "notistack";

export default (message) =>{
  enqueueSnackbar(message, { variant: "info",autoHideDuration: 5000 })}

