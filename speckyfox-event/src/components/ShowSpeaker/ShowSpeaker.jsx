import React, { useEffect, useState } from "react";
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  IconButton,
  Stack,
  Box,
} from "@mui/material";
import { Edit, Delete } from "@mui/icons-material";
import SpeakerService from "../../services/SpeakerService";

const ShowSpeaker = () => {
  const speakerService = new SpeakerService();
  const [speakers, setSpeakers] = useState([]);

  useEffect(() => {
    speakerService.getAllSpeakers().then((response) => {
      setSpeakers(response.data);
      console.log(response.data);
    });
  }, []);

  function onDelete(speakerId) {
    alert(speakerId);
    speakerService
      .deleteSpeaker(speakerId)
      .then((response) => {
        alert("Speaker deleted !");
      })
      .catch((error) => {
        alert(error);
      });
  }

  function onEdit() {
    console.log("edited");
  }

  return (
    <Stack marginTop={"10vh"} flexWrap={"wrap"} direction={"row"} spacing={5}>
      {speakers.map((speaker) => {
        return (
          <Box marginBottom={3}>
            <Card key={speaker.id} sx={{ width: 200 }}>
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
              <IconButton
                sx={{ color: "green" }}
                onClick={() => onEdit(speaker.id)}
              >
                <Edit />
              </IconButton>
              <IconButton
                sx={{ color: "red" }}
                onClick={() => onDelete(speaker.id)}
              >
                <Delete />
              </IconButton>
            </Card>
          </Box>
        );
      })}
    </Stack>
  );
};

export default ShowSpeaker;
