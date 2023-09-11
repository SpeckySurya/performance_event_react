import { useEffect, useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  Stack,
  Button,
  CardActions,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from "@mui/material";

import SpeakerService from "../../services/SpeakerService";
import PopupAlert from "../PopupAlert/PopupAlert";
import ManageSpeaker from "../ManageSpeaker/ManageSpeaker";
import { findRoleFromToken } from "../../utils/TokenDecoder";

const ShowSpeaker = (props) => {
  const speakerService = new SpeakerService();
  const [speakers, setSpeakers] = useState([]);
  const [dialog, setDialog] = useState({ open: false, action: null });
  const [selectedSpeaker, setSelectedSpeaker] = useState(null);
  const [opendilog, setOpendilog] = useState(false);
  const [popUpMsg, setPopUpmsg] = useState("");
  const handleClose = () => {
    setOpendilog(false);
  };
  const [speakerId, setSpeakerId] = useState(-1);
  useEffect(() => {
    speakerService.getAllSpeakers().then((response) => {
      setSpeakers(response.data);
    });
  }, []);
  useEffect(() => {
    if (dialog.action === "Yes") {
      speakerService
        .deleteSpeaker(speakerId)
        .then((response) => {
          setPopUpmsg("Speaker Deleted Successfully!");
          setOpendilog(true);
        })
        .catch((error) => {
          alert(error);
        });
      setDialog({ open: false, action: null });
    }
    if (dialog.action === "No") {
      setDialog({ open: false, action: null });
    }
  }, [dialog]);

  function onDelete(speakerId) {
    setDialog({ ...dialog, open: true });
    setSpeakerId(speakerId);
  }

  function editspeakerfunction(speaker) {
    props.setUpdateSpeaker(true);
    setSelectedSpeaker(speaker);
    props.speakerInitialValue.name = speaker.name;
    props.speakerInitialValue.designation = speaker.designation;
    props.speakerInitialValue.aboutSpeaker = speaker.aboutSpeaker;
    props.speakerInitialValue.email = speaker.email;
    props.speakerInitialValue.linkdinUrl = speaker.linkdinUrl;
    props.speakerInitialValue.twitterUrl = speaker.twitterUrl;
    props.speakerInitialValue.youtubeUrl = speaker.youtubeUrl;
  }

  return (
    <>
      <Dialog
        open={opendilog}
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
      {props.updateSpeaker ? (
        <ManageSpeaker
          title="Update"
          setUpdateSpeaker={props.setUpdateSpeaker}
          speakerInitialValue={props.speakerInitialValue}
          selectedSpeaker={selectedSpeaker}
        />
      ) : (
        <div>
          <PopupAlert
            control={{
              dialog: dialog,
              setDialog: (dialog) => setDialog({ ...dialog, open: open }),
            }}
            title="Alert"
            content={"Do you really want to delete ?"}
            action={{ first: "Yes", second: "No" }}
          />
          <Stack flexWrap={"wrap"} direction={"row"}>
            {speakers.map((speaker) => {
              return (
                <>
                  <Card
                    key={speaker.id}
                    sx={{ width: 310, mt: 10, ml: "auto", mr: "auto" }}
                  >
                    <CardMedia
                      component="img"
                      height="140"
                      image={speaker.picture}
                      alt={speaker.name}
                    />
                    <CardContent>
                      <Typography variant="h6" component="div">
                        {speaker.name}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {speaker.designation}
                      </Typography>
                    </CardContent>
                    {findRoleFromToken() !== "VIEWER" && (
                      <CardActions>
                        {findRoleFromToken() !== "EDITOR" && (
                          <Button
                            variant="contained"
                            color="error"
                            style={{ width: "50%" }}
                            startIcon={<DeleteIcon />}
                            onClick={() => onDelete(speaker.id)}
                          >
                            Delete
                          </Button>
                        )}
                        <Button
                          variant="contained"
                          color="success"
                          style={{ width: "50%" }}
                          startIcon={<EditIcon />}
                          onClick={() => editspeakerfunction(speaker)}
                        >
                          Edit
                        </Button>
                      </CardActions>
                    )}
                  </Card>
                </>
              );
            })}
          </Stack>
        </div>
      )}
    </>
  );
};

export default ShowSpeaker;
