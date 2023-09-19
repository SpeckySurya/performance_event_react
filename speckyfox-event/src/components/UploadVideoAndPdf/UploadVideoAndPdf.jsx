import {
  Card,
  CardContent,
  Grid,
  InputLabel,
  Button,
  Stack,
  Input,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  CircularProgress,
} from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { Typography } from "@mui/material";
import { useState, useEffect } from "react";
import EventService from "../../services/EventService";
import "./UploadVideoAndPdf.css";
import InputAdornment from "@mui/material/InputAdornment";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import UploadFileOutlinedIcon from "@mui/icons-material/UploadFileOutlined";
import styled from "styled-components";

function UploadVideoAndPdf() {
  const [uploadFile, setuploadFile] = useState("");
  const [loading, setLoading] = useState(false);
  const [validate, setValidate] = useState(false);
  const [uploadVideo, setuploadVideo] = useState("");
  const [events, setEvents] = useState([]);
  const [pastEvents, setPastEvents] = useState([]); // Store past events
  const [selectedEvent, setSelectedEvent] = useState(-1);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [open, setOpen] = useState(false);

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
        const currentDate = new Date();
        // Filter out past events
        const pastEvents = response.data.filter((event) => {
          const eventDate = new Date(event.events.date);
          return eventDate < currentDate;
        });
        setEvents(pastEvents); // Set past events
        setPastEvents(pastEvents);
      })
      .catch((error) => alert(error));
  }, []);

  function fundisplayfileandvideo(e) {
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
          setOpen(true);
        })
        .catch((error) => alert(error));
    }
  }

  const handleEventChange = (e) => {
    const name = e.target.name;
    if (name === "ppt-File") {
      setuploadFile(e.target.files[0]);
    } else if (name === "video-file") {
      setuploadVideo(e.target.files[0]);
    } else {
      const eventId = e.target.value;
      if (eventId === -1) {
        setSelectedEvent(eventId);
        setSelectedUsers([]);
        return;
      }
      setSelectedEvent(eventId);
      const obj = pastEvents.filter((event) => event.events.id === eventId)[0];
      const userList = obj.events.users.map(
        (user) => `${user.firstName} ${user.lastName}`
      );
      setSelectedUsers(userList);
    }
  };

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
            Files uploaded successfully
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} autoFocus>
            Close
          </Button>
        </DialogActions>
      </Dialog>
      <Stack>
        <Card
          style={{
            margin: "40px auto",
            padding: "20px",
            border: "1px solid #ccc",
            borderRadius: "5px",
            boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
            backgroundColor: "#fff",
            maxWidth: "400px",
          }}
        >
          <CardContent>
            <h3 className="uploadpdfh3">Upload Files</h3>
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
            </FormControl>

            <Grid spacing={1}>
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
                    Submit
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
