import * as Yup from "yup";
export const HomePageConfigationSchema = Yup.object({
  LinkedInurl: Yup.string().url().required("Please enter LinkedIn url"),
  Twiternurl: Yup.string().url().required("Please enter Twiter url"),
  Facebookurl: Yup.string().url().required("Please enter Facebook url"),
  Websiteurl: Yup.string().url().required("Please enter Website url"),
  Contenturl: Yup.string().url().required("Please enter Content url"),
  Youtubeurl: Yup.string().url().required("Please enter Youtube url"),
  FooterText: Yup.string().required("Please enter Footer Text"),
  UploadBanner: Yup.string().required("Upload Banner"),
  UploadLogo: Yup.string().required("upload Logo"),
});
