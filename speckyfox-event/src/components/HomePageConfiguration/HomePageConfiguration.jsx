import {
  Card,
  Grid,
  CardContent,
  TextField,
  InputLabel,
  Button,
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from "@mui/material";
import { useFormik } from "formik";
import "./HomePageConfiguration.css";

import { HomePageConfigationSchema } from "../../schemas/Homepagevalidation";
import { useEffect, useState } from "react";
import HomeConfigService from "../../services/HomeConfigService";
const homeConfigService = new HomeConfigService();

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

  useEffect(() => {
    homeConfigService
      .getHomeConfigById()
      .then((data) => {
        const apiData = data.data;
        setInitialValues({
          linkedinUrl: apiData.linkdinUrl,
          twitterUrl: apiData.twitterUrl,
          facebookUrl: apiData.facebookUrl,
          websiteUrl: apiData.websiteUrl,
          contactUrl: apiData.contactUrl,
          youtubeUrl: apiData.youtubeUrl,
          footerText: apiData.footerText,
        });
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  const [banner, setBanner] = useState(null);
  const [logo, setLogo] = useState(null);
  const [open, setOpen] = useState(false);
  const [popUpMsg, setPopUpmsg] = useState("");
  const handleClose = () => {
    setOpen(false);
  };
  const handleBannerChange = (event) => {
    const file = event.target.files[0];
    setBanner(file);
  };
  const handleLogoChange = (event) => {
    const file = event.target.files[0];
    setLogo(file);
  };

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

        homeConfigService
          .getHomeConfigById()
          .then((response) => {
            homeConfigService
              .updateHomeConfig(request)
              .then((response) => {
                setOpen(true);
                setPopUpmsg("Homepage details updated");
              })
              .catch((error) => {
                alert(error);
              });
          })
          .catch((error) => {
            if (
              "HomepageConfigurationService.notFound" ===
              error.response.data.message
            ) {
              homeConfigService
                .saveHomeConfig(request)
                .then((response) => {
                  setOpen(true);
                  setPopUpmsg("Homepage details saved");
                })
                .catch((error) => {
                  alert(error);
                });
            } else {
              alert("Something went wrong");
            }
          });
      },
    });

  return (
    <>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Success</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {popUpMsg}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} autoFocus>
            Close
          </Button>
        </DialogActions>
      </Dialog>
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
                    value={values?.linkedinUrl}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />

                  {errors.linkedinUrl && touched.linkedinUrl ? (
                    <p className="configationformerro">{errors.linkedinUrl}</p>
                  ) : null}
                </Grid>
                <Grid xs={12} sm={12} item>
                  <InputLabel>Twitter url</InputLabel>
                  <TextField
                    type="text"
                    name="twitterUrl"
                    id="twitterUrl"
                    placeholder="Upload Twiter url"
                    variant="outlined"
                    fullWidth
                    value={values?.twitterUrl}
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
                    value={initialValues?.facebookUrl}
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
                    value={values?.websiteUrl}
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
                    value={values?.contactUrl}
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
                    value={values?.youtubeUrl}
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
                    placeholder="Upload Footer Text url"
                    variant="outlined"
                    value={values?.footerText}
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
                    fullWidth
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
