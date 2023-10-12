import {
  Box,
  Button,
  Card,
  CardContent,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
  InputLabel,
  TextField,
  Typography,
} from "@mui/material";
import { useFormik } from "formik";
import "./HomePageConfiguration.css";

import { useContext, useEffect, useState } from "react";
import { HomePageConfigationSchema } from "../../schemas/Homepagevalidation";
import HomeConfigService from "../../services/HomeConfigService";
import MyContext from "../../context/MyContext";
const homeConfigService = new HomeConfigService();

function HomePageConfiguration(props) {
  const [loading, setLoading] = useState(false);
  const { context } = useContext(MyContext);

  useEffect(() => {
    context.breadCrumb.updatePages([
      {
        name: "Home Configuration",
        route: () => navigate("/dashboard/home-configuration"),
      },
    ]);
  }, []);

  const [banner, setBanner] = useState(null);
  const [logo, setLogo] = useState(null);
  const [open, setOpen] = useState(false);
  const [popUpMsg, setPopUpmsg] = useState("");
  const [homepageConfig, setHomepageConfig] = useState(null);

  const [initialValues, setInitialValues] = useState({
    banner: "",
    linkdinUrl: "",
    twitterUrl: "",
    facebookUrl: "",
    websiteUrl: "",
    contactUrl: "",
    youtubeUrl: "",
    footerText: "",
  });

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

  function findHomeConfig() {
    homeConfigService
      .getHomeConfigById()
      .then((response) => {
        setHomepageConfig(response.data);
        setInitialValues({
          ...response.data,
        });
      })
      .catch((error) => {
        setHomepageConfig(null);
      });
  }

  useEffect(() => {
    findHomeConfig();
  }, []);

  const { values, errors, handleBlur, handleChange, handleSubmit, touched } =
    useFormik({
      values: initialValues,
      validationSchema: HomePageConfigationSchema,
      onSubmit: (values) => {
        setLoading(true);
        const request = new FormData();
        for (let entry in initialValues) {
          request.append(entry, values[entry]);
        }
        request.append("banner", banner);
        request.append("logo", logo);

        if (homepageConfig) {
          alert("Updating");
          homeConfigService
            .updateHomeConfig(request)
            .then((response) => {
              setOpen(true);
              setLoading(false);
              setPopUpmsg("Homepage details updated");
            })
            .catch((error) => {
              alert(error);
              setLoading(false);
            });
        } else {
          alert("Saving");
          homeConfigService
            .saveHomeConfig(request)
            .then((response) => {
              setOpen(true);
              setLoading(false);
              setPopUpmsg("Homepage details saved");
            })
            .catch((error) => {
              alert(error);
              setLoading(false);
            });
        }
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
      <Box>
        <Card
          style={{
            margin: "auto",
            padding: "40px",
            border: "1px solid #ccc",
            borderRadius: "5px",
            boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
            backgroundColor: "#fff",
            maxWidth: "600px",
          }}
        >
          <CardContent>
            <Typography variant="h5" pb={2} className="HomePageConfigurationh3">
              Home Page Configuration
            </Typography>
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
                  {homepageConfig && (
                    <Box width={"100px"} py={1}>
                      <img
                        style={{ width: "100%", height: "100%" }}
                        src={values.logo}
                      />
                    </Box>
                  )}
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
                  {homepageConfig && (
                    <Box width={"100px"} py={1}>
                      <img
                        style={{ width: "100%", height: "100%" }}
                        src={values.banner}
                      />
                    </Box>
                  )}
                </Grid>
                <Grid xs={12} sm={12} item>
                  <InputLabel>LinkedIn url</InputLabel>
                  <TextField
                    type="text"
                    name="linkdinUrl"
                    id="linkdinUrl"
                    placeholder="Upload LinkedIn url"
                    variant="outlined"
                    fullWidth
                    value={values?.linkdinUrl}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />

                  {errors.linkdinUrl && touched.linkdinUrl ? (
                    <p className="configationformerro">{errors.linkdinUrl}</p>
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
                    value={values?.facebookUrl}
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
                    {loading ? (
                      <CircularProgress size={20} color={"error"} />
                    ) : (
                      "Submit"
                    )}
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
