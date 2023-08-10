import {
  Card,
  Grid,
  CardContent,
  TextField,
  InputLabel,
  Button,
  Box,
} from "@mui/material";
import { useFormik } from "formik";
import "./ManageSpeaker.css";

import { ManageSpeakerValidation } from "../../schemas/ManageSpeakerValidation";

const initialValues = {
  SpeakerTwiternurl: "",

  SpeakerName: "",
  SpeakerDesignation: "",
  SpeakerLinkedInurl: "",
  AboutSpeaker: "",
  SpeakerEmail: "",
  SpeakerPhoto: "",

  SpeakerYoutubeurl: "",
};
function ManageSpeaker(props) {
  const { values, errors, handleBlur, handleChange, handleSubmit, touched } =
    useFormik({
      initialValues: initialValues,
      validationSchema: ManageSpeakerValidation,
      onSubmit: (values) => {
        console.log("values ourab", values);
        const request = new FormData();
        for (let entry in initialValues) {
          console.log(entry);
          console.log(values[entry]);
          request.append(entry, values[entry]);
        }
      },
    });

  return (
    <>
      <Box px={2}>
        <Card
          style={{
            margin: "40px auto",
            padding: "40px",
            border: "1px solid #ccc",
            borderRadius: "5px",
            boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
            backgroundColor: "#fff",
            maxWidth: "600px",
          }}
        >
          <CardContent>
            <h3 className="ManageSpeakerh3">Manage Speaker</h3>
            <form onSubmit={handleSubmit}>
              <Grid container spacing={1}>
                <Grid xs={12} sm={12} item>
                  <InputLabel>Speaker Name</InputLabel>
                  <TextField
                    type="text"
                    name="SpeakerName"
                    id="SpeakerName"
                    // label="Speaker Name"
                    placeholder="Enter Speaker Name"
                    variant="outlined"
                    value={values.SpeakerName}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    fullWidth
                  />
                  {errors.SpeakerName && touched.SpeakerName ? (
                    <p className="configationformerro">{errors.SpeakerName}</p>
                  ) : null}
                </Grid>

                <Grid xs={12} sm={12} item>
                  <InputLabel>Speaker Designation</InputLabel>
                  <TextField
                    type="text"
                    name="SpeakerDesignation"
                    id="SpeakerDesignation"
                    // label="Speaker Designation"
                    placeholder="Enter Speaker Designation"
                    variant="outlined"
                    value={values.SpeakerDesignation}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    fullWidth
                  />
                  {errors.SpeakerDesignation && touched.SpeakerDesignation ? (
                    <p className="configationformerro">
                      {errors.SpeakerDesignation}
                    </p>
                  ) : null}
                </Grid>

                <Grid xs={12} sm={12} item>
                  <InputLabel>About Speaker</InputLabel>
                  <TextField
                    type="text"
                    name="AboutSpeaker"
                    id="AboutSpeaker"
                    // label="About Speaker"
                    placeholder="Enter Speaker Details"
                    variant="outlined"
                    value={values.AboutSpeaker}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    fullWidth
                  />
                  {errors.AboutSpeaker && touched.AboutSpeaker ? (
                    <p className="configationformerro">{errors.AboutSpeaker}</p>
                  ) : null}
                </Grid>
                <Grid xs={12} sm={12} item>
                  <InputLabel>Speaker Email</InputLabel>
                  <TextField
                    type="text"
                    name="SpeakerEmail"
                    id="SpeakerEmail"
                    // label="Speaker Email"
                    placeholder="Enter Speaker Email"
                    variant="outlined"
                    value={values.SpeakerEmail}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    fullWidth
                  />
                  {errors.SpeakerEmail && touched.SpeakerEmail ? (
                    <p className="configationformerro">{errors.SpeakerEmail}</p>
                  ) : null}
                </Grid>

                <Grid xs={12} sm={12} item>
                  <InputLabel>Upload Photo</InputLabel>
                  <TextField
                    type="file"
                    name="SpeakerPhoto"
                    id="SpeakerPhoto"
                    variant="outlined"
                    value={values.SpeakerPhoto}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    fullWidth
                  />
                  {errors.SpeakerPhoto && touched.SpeakerPhoto ? (
                    <p className="configationformerro">{errors.SpeakerPhoto}</p>
                  ) : null}
                </Grid>

                <Grid xs={12} sm={12} item>
                  <InputLabel>LinkedIn url</InputLabel>
                  <TextField
                    type="text"
                    name="Speaker LinkedInurl"
                    id="SpeakerLinkedInurl"
                    // label="LinkedIn url"
                    placeholder="Upload LinkedIn url"
                    variant="outlined"
                    fullWidth
                    value={values.SpeakerLinkedInurl}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />

                  {errors.SpeakerLinkedInurl && touched.SpeakerLinkedInurl ? (
                    <p className="configationformerro">
                      {errors.SpeakerLinkedInurl}
                    </p>
                  ) : null}
                </Grid>
                <Grid xs={12} sm={12} item>
                  <InputLabel>Twiter url</InputLabel>
                  <TextField
                    type="text"
                    // label="Twiter url"
                    name="SpeakerTwiternurl"
                    id="SpeakerTwiternurl"
                    placeholder="Upload Twiter url"
                    variant="outlined"
                    fullWidth
                    value={values.SpeakerTwiternurl}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  {errors.SpeakerTwiternurl && touched.SpeakerTwiternurl ? (
                    <p className="configationformerro">
                      {errors.SpeakerTwiternurl}
                    </p>
                  ) : null}
                </Grid>

                <Grid xs={12} sm={12} item>
                  <InputLabel>Youtube url</InputLabel>
                  <TextField
                    type="text"
                    name="SpeakerYoutubeurl"
                    id="SpeakerYoutubeurl"
                    // label="Youtube url"
                    placeholder="Upload Youtube url"
                    variant="outlined"
                    value={values.SpeakerYoutubeurl}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    fullWidth
                  />
                  {errors.SpeakerYoutubeurl && touched.SpeakerYoutubeurl ? (
                    <p className="configationformerro">
                      {errors.SpeakerYoutubeurl}
                    </p>
                  ) : null}
                </Grid>

                <Grid xs={12} sm={12} marginY={2} item>
                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    fullWidth="100%"
                  >
                    Submit
                  </Button>
                </Grid>
              </Grid>
            </form>
          </CardContent>
        </Card>
      </Box>
      {/* <Footer /> */}
    </>
  );
}

export default ManageSpeaker;
