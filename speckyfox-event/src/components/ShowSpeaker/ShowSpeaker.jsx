import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { useContext, useEffect, useState } from "react";

import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Stack,
  Typography,
} from "@mui/material";

import SpeakerService from "../../services/SpeakerService";
import { findRoleFromToken } from "../../utils/TokenDecoder";
import ManageSpeaker from "../ManageSpeaker/ManageSpeaker";
import PopupAlert from "../PopupAlert/PopupAlert";
import MyContext from "../../context/MyContext";
import SnackbarComponent from "../SnackbarComponent/SnackbarComponent";
import { useNavigate } from "react-router-dom";
import Role from "../../utils/Role";
/**
 *
 * This component is a ShowSpeaker it will show the speaker.
 *
 * @returns ShowSpeaker
 */
const ShowSpeaker = () => {
  const role = findRoleFromToken();

  const speakerService = new SpeakerService();
  const [speakers, setSpeakers] = useState([]);
  const [dialog, setDialog] = useState({ open: false, action: null });
  const [selectedSpeaker, setSelectedSpeaker] = useState(null);
  const [opendilog, setOpendilog] = useState(false);
  const [popUpMsg, setPopUpmsg] = useState("");
  const { context } = useContext(MyContext);
  const [snackbar, setSnackbar] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const handleClose = () => {
    setOpendilog(false);
  };
  const [speakerId, setSpeakerId] = useState(-1);

  function intialSetup() {
    speakerService
      .getAllSpeakers()
      .then((response) => {
        setSpeakers(response.data);
      })
      .catch((error) => {
        alert(error);
      })
      .finally(() => {
        setLoading(false);
      });
  }

  useEffect(() => {
    intialSetup();
  }, []);

  useEffect(() => {
    context.breadCrumb.updatePages([{ name: "Speakers" }]);
  }, []);

  useEffect(() => {
    if (dialog.action === "Yes") {
      speakerService
        .deleteSpeaker(speakerId)
        .then((response) => {
          setPopUpmsg("Speaker Deleted Successfully!");
          setSnackbar(
            <SnackbarComponent message="Speaker deleted" severity="success" />
          );
          intialSetup();
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
    navigate("/dashboard/speakers/edit-speaker", {
      state: { speaker: speaker },
    });
  }

  useEffect(() => {
    setTimeout(() => {
      setSnackbar(null);
    }, 3000);
  }, [snackbar]);

  return (
    <>
      {snackbar}

      <div style={{ margin: "auto" }}>
        <PopupAlert
          control={{
            dialog: dialog,
            setDialog: (dialog) => setDialog({ ...dialog, open: open }),
          }}
          title="Alert"
          content={"Do you really want to delete ?"}
          action={{ first: "Yes", second: "No" }}
        />
        <Stack flexWrap={"wrap"} direction={"row"} justifyContent={"center"}>
          {loading ? (
            <CircularProgress sx={{ color: "lightgray" }} />
          ) : (
            speakers.map((speaker) => {
              return (
                <>
                  <Card
                    key={speaker.id}
                    sx={{
                      width: 310,
                      m: 1,
                      position: "relative",
                      overflow: "visible",
                      paddingTop: "50px",
                      marginTop: "120px",
                    }}
                  >
                    <CardMedia
                      component="img"
                      height="155"
                      image={speaker.picture}
                      alt={speaker.name}
                      sx={{
                        position: "absolute",
                        width: "50%",
                        borderRadius: "50%",
                        top: -100,
                      }}
                    />
                    <CardContent>
                      <Typography variant="h6" component="div">
                        {speaker.name}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {speaker.designation}
                      </Typography>
                    </CardContent>
                    {role !== Role.VIEWER && (
                      <CardActions>
                        {role !== Role.EDITOR && (
                          <Button
                            variant="outlined"
                            color="error"
                            style={{ width: "50%" }}
                            startIcon={<DeleteIcon />}
                            onClick={() => onDelete(speaker.id)}
                          >
                            Delete
                          </Button>
                        )}
                        <Button
                          variant="outlined"
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
            })
          )}
        </Stack>
      </div>
    </>
  );
};

export default ShowSpeaker;
