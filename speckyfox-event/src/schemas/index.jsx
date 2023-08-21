import * as Yup from "yup";

export const sinUpSchema = Yup.object({
  First_name: Yup.string().min(3).max(15).required("Enter your First name"),
  Last_name: Yup.string().min(3).max(15).required("Enter your Last name"),
  Company_name: Yup.string().min(3).max(30).required("Enter your Company name"),
  Designation_name: Yup.string()
    .min(3)
    .max(18)
    .required("Enter your Designation"),
  Mobile_number: Yup.string()
    .min(10)
    .max(10)
    .required("Enter your Mobile number"),
  email: Yup.string().email().required("Enter your email"),
});
