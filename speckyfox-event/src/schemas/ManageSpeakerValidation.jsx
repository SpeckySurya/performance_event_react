import * as Yup from "yup";
export const ManageSpeakerValidation = Yup.object({
  SpeakerName: Yup.string()
    .min(4)
    .max(15)
    .required("Please enter Speaker Name"),
  SpeakerDesignation: Yup.string()
    .min(4)
    .max(15)
    .required("Please enter Speaker Designation"),
  AboutSpeaker: Yup.string()
    .min(4)
    .max(1000)
    .required("Write something About speaker"),
  SpeakerEmail: Yup.string().email().required("Please Enter Speaker Email"),
  SpeakerPhoto: Yup.string().required("upload Photo"),

  SpeakerLinkedInurl: Yup.string().url().required("Please enter LinkedIn url"),
  SpeakerTwiternurl: Yup.string().url().required("Please enter Twiter url"),
  SpeakerYoutubeurl: Yup.string().url().required("Please enter Youtube url"),

  // UploadBanner: Yup.string().required(" Please Upload Banner"),
});
