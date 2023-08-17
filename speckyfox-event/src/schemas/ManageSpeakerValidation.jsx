import * as Yup from "yup";
export const ManageSpeakerValidation = Yup.object({
  name: Yup.string().min(4).max(50).required("Please enter Speaker Name"),
  designation: Yup.string()
    .min(4)
    .max(50)
    .required("Please enter Speaker Designation"),
  aboutSpeaker: Yup.string()
    .min(4)
    .max(1000)
    .required("Write something About speaker"),
  email: Yup.string().email().required("Please Enter Speaker Email"),

  linkedinUrl: Yup.string().url().required("Please enter LinkedIn url"),
  twitterUrl: Yup.string().url().required("Please enter Twiter url"),
  youtubeUrl: Yup.string().url().required("Please enter Youtube url"),

  // UploadBanner: Yup.string().required(" Please Upload Banner"),
});
