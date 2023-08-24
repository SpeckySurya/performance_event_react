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

import SpeakerService from "../../services/SpeakerService";

const ShowSpeaker = () => {
  const speakerService = new SpeakerService();
  const [speakers, setSpeakers] = useState([]);

  useEffect(() => {
    speakerService.getAllSpeakers().then((response) => {
      setSpeakers(response.data);
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

  return (
    <Stack marginTop={"20vh"} flexWrap={"wrap"} direction={"row"} spacing={5}>
      {speakers.map((speaker) => {
        return (
          <Box marginBottom={20}>
            <Card key={speaker.id} sx={{ width: 300 }}>
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
            </Card>
          </Box>
        );
      })}
    </Stack>
  );
};

export default ShowSpeaker;
