import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import UploadFileOutlinedIcon from "@mui/icons-material/UploadFileOutlined";
import {
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
import styled from "styled-components";
import ContentService from "../../services/ContentService";
import EventService from "../../services/EventService";
import "./UploadVideoAndPdf.css";
import MyContext from "../../context/MyContext";
import { useNavigate } from "react-router-dom";
import SnackbarComponent from "../SnackbarComponent/SnackbarComponent";

function UploadVideoAndPdf() {
  const [uploadFile, setUploadFile] = useState("");
  const [loading, setLoading] = useState(false);
  const [uploadVideo, setUploadVideo] = useState("");
  const [events, setEvents] = useState([]);
  const [pastEvents, setPastEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(-1);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [open, setOpen] = useState(false);
  const [uploadAction, setUploadAction] = useState("Upload");
  const { context } = useContext(MyContext);
  const navigate = useNavigate();
  const [snackbar, setSnackbar] = useState(null);

  useEffect(() => {
    context.breadCrumb.updatePages([
      { name: "Events", route: () => navigate("/dashboard/events") },
      {
        name: "Upload Event Data",
        route: () => navigate("/dashboard/events/upload-event-data"),
      },
    ]);
  }, []);

  const handleClose = () => {
    setOpen(false);
  };

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
    const eventService = new EventService();
    eventService
      .getAllEvents()
      .then((response) => {
        setEvents(response.data);
        const currentDate = new Date();
        const pastEvents = response.data.filter((event) => {
          const eventDate = new Date(event.events.date);
          return eventDate < currentDate;
        });
        setPastEvents(pastEvents);
      })
      .catch((error) => alert(error));
  }, []);

  const fundisplayfileandvideo = (e) => {
    e.preventDefault();
    if (uploadFile && uploadVideo && selectedEvent !== -1) {
      setLoading(true);
      const event = pastEvents.find(
        (event) => event.events.id === selectedEvent
      );
      const formData = new FormData();

      formData.append("title", event.events.title);
      formData.append("eventId", event.events.id);
      formData.append("eventVideo", uploadVideo);
      formData.append("eventPPT", uploadFile);

      const eventService = new EventService();
      eventService
        .uploadPastEventData(formData)
        .then((response) => {
          setLoading(false);
          setLoading(false);
          setSelectedEvent(-1);
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
          setSelectedEvent(-1);
        });
    }
  };

  const handleEventChange = (e) => {
    const name = e.target.name;
    if (name === "ppt-File") {
      setUploadFile(e.target.files[0]);
    } else if (name === "video-file") {
      setUploadVideo(e.target.files[0]);
    } else {
      const eventId = e.target.value;
      if (eventId === -1) {
        setSelectedEvent(eventId);
        setSelectedUsers([]);
        return;
      }
      setSelectedEvent(eventId);
      const contentService = new ContentService();
      contentService
        .getEventDataInfo(eventId)
        .then((response) => {
          setUploadAction("Update");
        })
        .catch((error) => {
          if (error.code === "ERR_BAD_RESPONSE") {
            setUploadAction("Upload");
          }
        });
      const obj = pastEvents.find((event) => event.events.id === eventId);
      const userList = obj.events.users.map(
        (user) => `${user.firstName} ${user.lastName}`
      );
      setSelectedUsers(userList);
    }
  };

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
                value={selectedEvent}
                onChange={handleEventChange}
                required
              >
                <MenuItem value={-1}>
                  <Typography fontStyle={"italic"}>None</Typography>
                </MenuItem>
                {pastEvents.map((event) => (
                  <MenuItem key={event.events.id} value={event.events.id}>
                    {event.events.title}
                  </MenuItem>
                ))}
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
                  onChange={handleEventChange}
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
                  onChange={handleEventChange}
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
                {uploadFile && uploadVideo && selectedEvent !== -1 ? (
                  <BootstrapButton onClick={fundisplayfileandvideo}>
                    {loading ? (
                      <CircularProgress size={20} color={"error"} />
                    ) : (
                      "Submit"
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
