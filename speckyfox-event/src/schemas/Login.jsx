import * as Yup from "yup";

export const loginschema = Yup.object({
  loginpass: Yup.string().min(4).max(15).required("password"),
  loginemail: Yup.string().email().required("Email"),
});
