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
import "./HomePageConfiguration.css";

import { HomePageConfigationSchema } from "../../schemas/Homepagevalidation";

const initialValues = {
  LinkedInurl: "",
  Twiternurl: "",
  Facebookurl: "",
  Websiteurl: "",
  Contenturl: "",
  Youtubeurl: "",
  FooterText: "",
  UploadBanner: "",
  UploadLogo: "",
};
function HomePageConfiguration(props) {
  const { values, errors, handleBlur, handleChange, handleSubmit, touched } =
    useFormik({
      initialValues: initialValues,
      validationSchema: HomePageConfigationSchema,
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
            <h3 className="HomePageConfigurationh3">Home Page Configuration</h3>
            <form onSubmit={handleSubmit}>
              <Grid container spacing={1}>
                <Grid xs={12} sm={12} item>
                  <InputLabel>Upload Logo</InputLabel>
                  <TextField
                    type="file"
                    name="UploadLogo"
                    id="UploadLogo"
                    variant="outlined"
                    value={values.UploadLogo}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    fullWidth
                  />
                  {errors.UploadLogo && touched.UploadLogo ? (
                    <p className="configationformerro">{errors.UploadLogo}</p>
                  ) : null}
                </Grid>
                <Grid xs={12} sm={12} item>
                  <InputLabel>Upload Banner</InputLabel>
                  <TextField
                    type="file"
                    name="UploadBanner"
                    id="UploadBanner"
                    variant="outlined"
                    value={values.UploadBanner}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    fullWidth
                  />{" "}
                  {errors.UploadBanner && touched.UploadBanner ? (
                    <p className="configationformerro">{errors.UploadBanner}</p>
                  ) : null}
                </Grid>
                <Grid xs={12} sm={12} item>
                  <InputLabel>LinkedIn url</InputLabel>
                  <TextField
                    type="text"
                    name="LinkedInurl"
                    id="LinkedInurl"
                    // label="LinkedIn url"
                    placeholder="Upload LinkedIn url"
                    variant="outlined"
                    fullWidth
                    value={values.LinkedInurl}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />

                  {errors.LinkedInurl && touched.LinkedInurl ? (
                    <p className="configationformerro">{errors.LinkedInurl}</p>
                  ) : null}
                </Grid>
                <Grid xs={12} sm={12} item>
                  <InputLabel>Twiter url</InputLabel>
                  <TextField
                    type="text"
                    // label="Twiter url"
                    name="Twiternurl"
                    id="Twiternurl"
                    placeholder="Upload Twiter url"
                    variant="outlined"
                    fullWidth
                    value={values.Twiternurl}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  {errors.Twiternurl && touched.Twiternurl ? (
                    <p className="configationformerro">{errors.Twiternurl}</p>
                  ) : null}
                </Grid>
                <Grid xs={12} sm={12} item>
                  <InputLabel>Facebook url</InputLabel>
                  <TextField
                    type="text"
                    // label="Facebook url"
                    name="Facebookurl"
                    id="Facebookurl"
                    placeholder="Upload Facebook url"
                    variant="outlined"
                    value={values.Facebookurl}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    fullWidth
                  />
                  {errors.Facebookurl && touched.Facebookurl ? (
                    <p className="configationformerro">{errors.Facebookurl}</p>
                  ) : null}
                </Grid>
                <Grid xs={12} sm={12} item>
                  <InputLabel>Website url</InputLabel>
                  <TextField
                    type="text"
                    name="Websiteurl"
                    id="Websiteurl"
                    // label="Website url"
                    placeholder="Upload Website url"
                    variant="outlined"
                    value={values.Websiteurl}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    fullWidth
                  />
                  {errors.Websiteurl && touched.Websiteurl ? (
                    <p className="configationformerro">{errors.Websiteurl}</p>
                  ) : null}
                </Grid>
                <Grid xs={12} sm={12} item>
                  <InputLabel>Contect url</InputLabel>
                  <TextField
                    type="text"
                    name="Contenturl"
                    id="Contenturl"
                    // label="content url"
                    placeholder="Upload content url"
                    variant="outlined"
                    value={values.Contenturl}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    fullWidth
                  />
                  {errors.Contenturl && touched.Contenturl ? (
                    <p className="configationformerro">{errors.Contenturl}</p>
                  ) : null}
                </Grid>
                <Grid xs={12} sm={12} item>
                  <InputLabel>Youtube url</InputLabel>
                  <TextField
                    type="text"
                    name="Youtubeurl"
                    id="Youtubeurl"
                    // label="Youtube url"
                    placeholder="Upload Youtube url"
                    variant="outlined"
                    value={values.Youtubeurl}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    fullWidth
                  />
                  {errors.Youtubeurl && touched.Youtubeurl ? (
                    <p className="configationformerro">{errors.Youtubeurl}</p>
                  ) : null}
                </Grid>
                <Grid xs={12} sm={12} item>
                  <InputLabel>Footer Text</InputLabel>
                  <TextField
                    type="text"
                    name="FooterText"
                    id="FooterText"
                    s
                    // label="Footer Text"
                    placeholder="Upload Footer Text url"
                    variant="outlined"
                    value={values.FooterText}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    fullWidth
                  />
                  {errors.FooterText && touched.FooterText ? (
                    <p className="configationformerro">{errors.FooterText}</p>
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

export default HomePageConfiguration;
