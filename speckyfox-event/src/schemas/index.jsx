import * as Yup from "yup";
// export const sinUpSchema = Yup.object({
//   fname: Yup.string().min(3).max(10).required("please enter your first name"),
//   cname: Yup.string().min(5).max(20).required("please enter your company name"),
//   dname: Yup.string().min(5).max(10).required("please enter your designation"),
//   lname: Yup.string().min(4).max(10).required("please enter your Last name"),
//   nnumber: Yup.string().min(10).max(10).required("please enter your Last name"),
//   email: Yup.string().email().required("enter your email"),
// });

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
