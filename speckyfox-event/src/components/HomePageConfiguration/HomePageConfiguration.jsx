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
import { useEffect, useState } from "react";
import HomeConfigService from "../../services/HomeConfigService";

function HomePageConfiguration(props) {
  const [initialValues, setInitialValues] = useState({
    linkedinUrl: "",
    twitterUrl: "",
    facebookUrl: "",
    websiteUrl: "",
    contactUrl: "",
    youtubeUrl: "",
    footerText: "",
  });
  const [banner, setBanner] = useState(null);
  const [logo, setLogo] = useState(null);
  const handleBannerChange = (event) => {
    const file = event.target.files[0];
    setBanner(file);
  };
  const handleLogoChange = (event) => {
    const file = event.target.files[0];
    setLogo(file);
  };

  useEffect(() => {
    const homeConfiService = new HomeConfigService();
    homeConfiService.getHomeConfig().then((response) => {
      console.log(response.data);
      setInitialValues({
        contactUrl: response.data.contactUrl,
        facebookUrl: response.data.facebookUrl,
        linkedinUrl: response.data.linkdinUrl,
        twitterUrl: response.data.twitterUrl,
        websiteUrl: response.data.websiteUrl,
        youtubeUrl: response.data.youtubeUrl,
        footerText: response.data.footerText,
      });
    });
  }, []);

  const { values, errors, handleBlur, handleChange, handleSubmit, touched } =
    useFormik({
      initialValues: initialValues,
      validationSchema: HomePageConfigationSchema,
      onSubmit: (values) => {
        const request = new FormData();
        for (let entry in initialValues) {
          request.append(entry, values[entry]);
        }
        request.append("banner", banner);
        request.append("logo", logo);
        for (const obj of request) {
          console.log(obj[0], obj[1]);
        }
        const homeConfigService = new HomeConfigService();
        homeConfigService
          .updateHomeConfig(request)
          .then((response) => {
            alert("Homepage details saved");
          })
          .catch((error) => {
            alert(error);
          });
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
                    name="logo"
                    id="logo"
                    accept=".jpg, .jpeg, .png"
                    variant="outlined"
                    onChange={handleLogoChange}
                    onBlur={handleBlur}
                    fullWidth
                  />
                </Grid>
                <Grid xs={12} sm={12} item>
                  <InputLabel>Upload Banner</InputLabel>
                  <TextField
                    type="file"
                    name="banner"
                    id="banner"
                    accept=".jpg, .jpeg, .png"
                    variant="outlined"
                    onChange={handleBannerChange}
                    onBlur={handleBlur}
                    fullWidth
                  />
                </Grid>
                <Grid xs={12} sm={12} item>
                  <InputLabel>LinkedIn url</InputLabel>
                  <TextField
                    type="text"
                    name="linkedinUrl"
                    id="linkedinUrl"
                    placeholder="Upload LinkedIn url"
                    variant="outlined"
                    fullWidth
                    value={initialValues.linkedinUrl}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />

                  {errors.linkedinUrl && touched.linkedinUrl ? (
                    <p className="configationformerro">{errors.linkedinUrl}</p>
                  ) : null}
                </Grid>
                <Grid xs={12} sm={12} item>
                  <InputLabel>Twiter url</InputLabel>
                  <TextField
                    type="text"
                    name="twitterUrl"
                    id="twitterUrl"
                    placeholder="Upload Twiter url"
                    variant="outlined"
                    fullWidth
                    value={initialValues.twitterUrl}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  {errors.twitterUrl && touched.twitterUrl ? (
                    <p className="configationformerro">{errors.twitterUrl}</p>
                  ) : null}
                </Grid>
                <Grid xs={12} sm={12} item>
                  <InputLabel>Facebook url</InputLabel>
                  <TextField
                    type="text"
                    name="facebookUrl"
                    id="facebookUrl"
                    placeholder="Upload Facebook url"
                    variant="outlined"
                    value={initialValues.facebookUrl}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    fullWidth
                  />
                  {errors.facebookUrl && touched.facebookUrl ? (
                    <p className="configationformerro">{errors.facebookUrl}</p>
                  ) : null}
                </Grid>
                <Grid xs={12} sm={12} item>
                  <InputLabel>Website url</InputLabel>
                  <TextField
                    type="text"
                    name="websiteUrl"
                    id="websiteUrl"
                    placeholder="Upload Website url"
                    variant="outlined"
                    value={initialValues.websiteUrl}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    fullWidth
                  />
                  {errors.websiteUrl && touched.websiteUrl ? (
                    <p className="configationformerro">{errors.websiteUrl}</p>
                  ) : null}
                </Grid>
                <Grid xs={12} sm={12} item>
                  <InputLabel>Contact url</InputLabel>
                  <TextField
                    type="text"
                    name="contactUrl"
                    id="contactUrl"
                    placeholder="Upload content url"
                    variant="outlined"
                    value={initialValues.contactUrl}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    fullWidth
                  />
                  {errors.contactUrl && touched.contactUrl ? (
                    <p className="configationformerro">{errors.contactUrl}</p>
                  ) : null}
                </Grid>
                <Grid xs={12} sm={12} item>
                  <InputLabel>Youtube url</InputLabel>
                  <TextField
                    type="text"
                    name="youtubeUrl"
                    id="youtubeUrl"
                    placeholder="Upload Youtube url"
                    variant="outlined"
                    value={initialValues.youtubeUrl}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    fullWidth
                  />
                  {errors.youtubeUrl && touched.youtubeUrl ? (
                    <p className="configationformerro">{errors.youtubeUrl}</p>
                  ) : null}
                </Grid>
                <Grid xs={12} sm={12} item>
                  <InputLabel>Footer Text</InputLabel>
                  <TextField
                    type="text"
                    name="footerText"
                    id="footerText"
                    s
                    placeholder="Upload Footer Text url"
                    variant="outlined"
                    value={initialValues.footerText}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    fullWidth
                  />
                  {errors.footerText && touched.footerText ? (
                    <p className="configationformerro">{errors.footerText}</p>
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
    </>
  );
}

export default HomePageConfiguration;
