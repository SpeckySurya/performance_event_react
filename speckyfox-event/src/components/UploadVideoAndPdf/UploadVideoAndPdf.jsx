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
} from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { Typography } from "@mui/material";
import { useState, useEffect } from "react";
import EventService from "../../services/EventService";
import { event } from "jquery";
import "./UploadVideoAndPdf.css";
import InputAdornment from "@mui/material/InputAdornment";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";

import UploadFileOutlinedIcon from "@mui/icons-material/UploadFileOutlined";

function UploadVideoAndPdf() {
  const [uploadFile, setuploadFile] = useState("");
  const [uploadVideo, setuploadVideo] = useState("");
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState("");
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [open, setOpen] = useState(false);
  const handleClose = () => {
    setOpen(false);
  };
  useEffect(() => {
    const eventService = new EventService();
    eventService
      .getAllEvents()
      .then((response) => {
        setEvents(response.data);
      })
      .catch((error) => alert(error));
  }, [selectedEvent]);

  function fundisplayfileandvideo() {
    const event = events.find((event) => event.events.id === selectedEvent);
    const formData = new FormData();

    formData.append("title", event.events.title);
    formData.append("eventId", event.events.id);
    formData.append("eventVideo", uploadVideo);
    formData.append("eventPPT", uploadFile);
    for (let e of formData.entries()) {
      console.log(e[0], e[1]);
    }
    const eventService = new EventService();
    eventService
      .uploadPastEventData(formData)
      .then((response) => {
        setOpen(true);
      })
      .catch((error) => alert(error));
  }
  const handleEventChange = (e) => {
    const eventId = e.target.value;
    if (eventId === -1) {
      setSelectedEvent(eventId);
      setSelectedUsers([]);
      return;
    }
    setSelectedEvent(eventId);
    const obj = events.filter((event) => event.events.id === eventId)[0];
    const userList = obj.events.users.map(
      (user) => `${user.firstName} ${user.lastName}`
    );
    setSelectedUsers(userList);
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
              >
                <MenuItem value={-1}>
                  <Typography fontStyle={"italic"}>None</Typography>
                </MenuItem>
                {events.map((event) => (
                  <MenuItem key={event.events.id} value={event.events.id}>
                    {event.events.title}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <Grid spacing={1}>
              <Grid xs={12} sm={6} item>
                <InputLabel className="uploadvideotext">Upload File</InputLabel>
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
                  onChange={(e) => setuploadFile(e.target.files[0])}
                  fullWidth
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
                  onChange={(e) => setuploadVideo(e.target.files[0])}
                  variant="outlined"
                  fullWidth
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
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  fullWidth="100%"
                  onClick={fundisplayfileandvideo}
                >
                  Submit
                </Button>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Stack>
    </>
  );
}
export default UploadVideoAndPdf;
