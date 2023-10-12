import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import UploadFileOutlinedIcon from "@mui/icons-material/UploadFileOutlined";
import {
  Button,
  Card,
  CardContent,
  CircularProgress,
  Grid,
  Input,
  InputLabel,
  Stack,
  Typography,
} from "@mui/material";
import FormControl from "@mui/material/FormControl";
import InputAdornment from "@mui/material/InputAdornment";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import React, { useContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";
import MyContext from "../../context/MyContext";
import ContentService from "../../services/ContentService";
import EventService from "../../services/EventService";
import SnackbarComponent from "../SnackbarComponent/SnackbarComponent";
import "./UploadVideoAndPdf.css";

function UploadVideoAndPdf() {
  const [uploadFile, setUploadFile] = useState("");
  const [loading, setLoading] = useState(false);
  const [uploadVideo, setUploadVideo] = useState("");
  const [uploadAction, setUploadAction] = useState("Upload");
  const { context } = useContext(MyContext);
  const navigate = useNavigate();
  const [snackbar, setSnackbar] = useState(null);
  const location = useLocation();

  useEffect(() => {
    context.breadCrumb.updatePages([
      { name: "Events", route: () => navigate("/dashboard/events") },
      {
        name: "Upload Event Data",
      },
    ]);
  }, []);

  const BootstrapButtonDisabled = styled(Button)({
    backgroundColor: "gray",
    width: "100%",
    cursor: "default",
    color: "black",
    "&:hover": {
      backgroundColor: "gray",
    },
  });

  const BootstrapButton = styled(Button)({
    backgroundColor: "#ff970a",
    width: "100%",
    color: "white",
    "&:hover": {
      backgroundColor: "#f7542b",
    },
  });

  useEffect(() => {
    const contentService = new ContentService();
    contentService
      .getEventDataInfo(location?.state?.event?.events.id)
      .then((response) => {
        setUploadAction("Update");
      })
      .catch((error) => {
        if (error.code === "ERR_BAD_RESPONSE") {
          setUploadAction("Upload");
        }
      });
  }, []);

  const fundisplayfileandvideo = (e) => {
    e.preventDefault();
    if (uploadFile && uploadVideo) {
      setLoading(true);
      const formData = new FormData();

      formData.append("title", location.state.event.events.title);
      formData.append("eventId", location.state.event.events.id);
      formData.append("eventVideo", uploadVideo);
      formData.append("eventPPT", uploadFile);

      const eventService = new EventService();
      eventService
        .uploadPastEventData(formData)
        .then((response) => {
          setLoading(false);
          setSnackbar(
            <SnackbarComponent message="Data uploaded" severity="success" />
          );
          setTimeout(() => {
            navigate("/dashboard/events");
          }, 1500);
        })
        .catch((error) => {
          alert(error);
          setLoading(false);
        });
    }
  };

  function handleUploadPPT(e) {
    setUploadFile(e.target.files[0]);
  }

  function handleUploadVideo(e) {
    setUploadVideo(e.target.files[0]);
  }

  return (
    <>
      {snackbar}
      <Stack>
        <Card
          style={{
            margin: "auto",
            padding: "20px",
            border: "1px solid #ccc",
            borderRadius: "5px",
            boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
            backgroundColor: "#fff",
            maxWidth: "400px",
          }}
        >
          <CardContent>
            <h1 className="uploadpdfh3">Upload or Update Files</h1>
            <FormControl fullWidth>
              <InputLabel id="select-event-label">Select Event</InputLabel>
              <Select
                labelId="select-event-label"
                label="Select Event"
                value={location?.state?.event?.events.id}
                required
                disabled
              >
                <MenuItem value={location?.state?.event?.events.id}>
                  <Typography fontStyle={"italic"}>
                    {location?.state?.event?.events.title}
                  </Typography>
                </MenuItem>
              </Select>
              <Typography p={1} color={"crimson"}>
                {uploadAction === "Update"
                  ? "Warning : Video and PPT are already added to the event. If you upload new PPT and Video it will replace the existing Video and PPT."
                  : null}
              </Typography>
            </FormControl>
            <Grid spacing={2}>
              <Grid xs={12} sm={6} item>
                <InputLabel className="uploadvideotext">Upload PPT</InputLabel>
                <Input
                  style={{ paddingLeft: "10px" }}
                  className="uploadpdf"
                  type="file"
                  inputProps={{
                    accept:
                      "application/vnd.ms-powerpoint, application/vnd.openxmlformats-officedocument.presentationml.presentation",
                  }}
                  name="ppt-File"
                  id="ppt-File"
                  variant="outlined"
                  onChange={handleUploadPPT}
                  fullWidth
                  required
                  endAdornment={
                    <InputAdornment
                      position="end"
                      style={{ paddingRight: "15px" }}
                    >
                      <UploadFileOutlinedIcon />
                    </InputAdornment>
                  }
                />
              </Grid>

              <Grid xs={12} sm={6} item>
                <InputLabel className="uploadvideotext">
                  Upload Video
                </InputLabel>
                <Input
                  style={{ paddingLeft: "10px" }}
                  className="uploadvideo"
                  type="file"
                  inputProps={{ accept: "video/mp4,video/x-m4v,video/*" }}
                  name="video-file"
                  id="video-file"
                  onChange={handleUploadVideo}
                  variant="outlined"
                  fullWidth
                  required
                  endAdornment={
                    <InputAdornment
                      position="end "
                      style={{ paddingRight: "15px" }}
                    >
                      <CloudUploadIcon />
                    </InputAdornment>
                  }
                />
              </Grid>
              <Grid xs={12} sm={12} marginY={2} item>
                {uploadFile && uploadVideo ? (
                  <BootstrapButton onClick={fundisplayfileandvideo}>
                    {loading ? (
                      <CircularProgress size={20} color={"error"} />
                    ) : (
                      uploadAction
                    )}
                  </BootstrapButton>
                ) : (
                  <BootstrapButtonDisabled onClick={fundisplayfileandvideo}>
                    {uploadAction}
                  </BootstrapButtonDisabled>
                )}
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Stack>
    </>
  );
}
export default UploadVideoAndPdf;
