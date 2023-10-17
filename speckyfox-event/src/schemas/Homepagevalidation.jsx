import * as Yup from "yup";
export const HomePageConfigationSchema = Yup.object({
  linkedinUrl: Yup.string().url().required("Please enter LinkedIn url"),
  twitterUrl: Yup.string().url().required("Please enter Twiter url"),
  facebookUrl: Yup.string().url().required("Please enter Facebook url"),
  websiteUrl: Yup.string().url().required("Please enter Website url"),
  contactUrl: Yup.string().url().required("Please enter Content url"),
  youtubeUrl: Yup.string().url().required("Please enter Youtube url"),
  footerText: Yup.string().required("Please enter Footer Text"),
});
