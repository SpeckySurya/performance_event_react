import ArrowBackOutlinedIcon from "@mui/icons-material/ArrowBackOutlined";
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
} from "@mui/material";
import { useFormik } from "formik";
import "./EditSpeakerForm.css";

import { useContext, useEffect, useState } from "react";
import { ManageSpeakerValidation } from "../../schemas/ManageSpeakerValidation";
import SpeakerService from "../../services/SpeakerService";
import MyContext from "../../context/MyContext";
import { useLocation, useNavigate } from "react-router-dom";
import SnackbarComponent from "../../components/SnackbarComponent/SnackbarComponent";

function EditSpeakerForm() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [popUpMsg, setPopUpmsg] = useState("");
  const { context } = useContext(MyContext);
  const navigate = useNavigate();
  const location = useLocation();
  const [snackbar, setSnackbar] = useState(null);

  const speakerInitialValue = {
    name: location.state.speaker.name,
    designation: location.state.speaker.designation,
    aboutSpeaker: location.state.speaker.aboutSpeaker,
    email: location.state.speaker.email,
    linkdinUrl: location.state.speaker.linkdinUrl,
    twitterUrl: location.state.speaker.twitterUrl,
    youtubeUrl: location.state.speaker.youtubeUrl,
  };

  useEffect(() => {
    context.breadCrumb.updatePages([
      { name: "Speakers", route: () => navigate("/dashboard/speakers") },
      {
        name: "Edit Speaker",
      },
    ]);
  }, []);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
  };

  const { values, errors, handleBlur, handleChange, handleSubmit, touched } =
    useFormik({
      initialValues: speakerInitialValue,
      validationSchema: ManageSpeakerValidation,
      onSubmit: (values) => {
        setLoading(true);
        const request = new FormData();
        for (let entry in speakerInitialValue) {
          request.append(entry, values[entry]);
        }
        request.append("picture", selectedFile);

        const speakerService = new SpeakerService();

        speakerService
          .updateSpeaker(location.state.speaker.id, request)
          .then((response) => {
            setLoading(false);
            setSnackbar(
              <SnackbarComponent message="Speaker updated" severity="success" />
            );
            setTimeout(() => {
              navigate("/dashboard/speakers");
            }, 1500);
          })
          .catch((error) => {
            alert(error);
            setLoading(false);
          });
      },
    });

  return (
    <>
      {snackbar}
      <Box px={2}>
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
            <h3 className="ManageSpeakerh3">Update Speaker</h3>
            <form onSubmit={handleSubmit}>
              <Grid container spacing={1}>
                <Grid xs={12} sm={12} item>
                  <InputLabel>Speaker Name</InputLabel>
                  <TextField
                    type="text"
                    name="name"
                    id="name"
                    placeholder="Enter Speaker Name"
                    variant="outlined"
                    value={values?.name}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    fullWidth
                  />
                  {errors.name && touched.name ? (
                    <p className="configationformerro">{errors.name}</p>
                  ) : null}
                </Grid>

                <Grid xs={12} sm={12} item>
                  <InputLabel>Speaker Designation</InputLabel>
                  <TextField
                    type="text"
                    name="designation"
                    id="designation"
                    placeholder="Enter Speaker Designation"
                    variant="outlined"
                    value={values?.designation}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    fullWidth
                  />
                  {errors.designation && touched.designation ? (
                    <p className="configationformerro">{errors.designation}</p>
                  ) : null}
                </Grid>

                <Grid xs={12} sm={12} item>
                  <InputLabel>About Speaker</InputLabel>
                  <TextField
                    type="text-area"
                    name="aboutSpeaker"
                    id="aboutSpeaker"
                    placeholder="Enter Speaker Details"
                    variant="outlined"
                    value={values?.aboutSpeaker}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    fullWidth
                  />
                  {errors.aboutSpeaker && touched.aboutSpeaker ? (
                    <p className="configationformerro">{errors.aboutSpeaker}</p>
                  ) : null}
                </Grid>
                <Grid xs={12} sm={12} item>
                  <InputLabel>Speaker Email</InputLabel>
                  <TextField
                    type="text"
                    name="email"
                    id="email"
                    placeholder="Enter Speaker Email"
                    variant="outlined"
                    value={values?.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    fullWidth
                  />
                  {errors.email && touched.email ? (
                    <p className="configationformerro">{errors.email}</p>
                  ) : null}
                </Grid>

                <Grid xs={12} sm={12} item>
                  <InputLabel>Upload Photo</InputLabel>
                  <label className="msgforimage">
                    Image size should be less then 2MB
                  </label>
                  <TextField
                    type="file"
                    name="picture"
                    id="picture"
                    variant="outlined"
                    value={values?.picture}
                    onChange={handleFileChange}
                    onBlur={handleBlur}
                    fullWidth
                  />
                  <img
                    style={{ width: "100px", margin: "10px" }}
                    src={location.state.speaker?.picture}
                  />
                  {errors.picture && touched.picture ? (
                    <p className="configationformerro">{errors.picture}</p>
                  ) : null}
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
                  <InputLabel>Twiter url</InputLabel>
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

export default EditSpeakerForm;
