import Stack from "@mui/material/Stack";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";
import {
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  ToggleButton,
  Typography,
} from "@mui/material";
import PageviewIcon from "@mui/icons-material/Pageview";
import NotificationsActiveIcon from "@mui/icons-material/NotificationsActive";
import DownloadIcon from "@mui/icons-material/Download";
import PlayCircleFilledWhiteIcon from "@mui/icons-material/PlayCircleFilledWhite";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardDoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight";
import HighlightAltIcon from "@mui/icons-material/HighlightAlt";
import CheckIcon from "@mui/icons-material/Check";
import ClearIcon from "@mui/icons-material/Clear";
import "./DashboardEventView.css";
import { useState } from "react";

const EventPaper = styled(Paper)(() => ({
  width: 400,
  height: 300,
  minHeight: 300,
  border: "solid 1px whitesmoke",
  borderRadius: 10,
  boxShadow: "rgba(0, 0, 0, 0.04) 0px 3px 5px",
  background: "whitesmoke",
  position: "relative",
}));

const CustomPaper = styled(Paper)(() => ({
  width: "50%",
  padding: 10,
  border: "1px #F5F5F5 solid",
}));
const CustomPaper2 = styled(Paper)(() => ({
  padding: 10,
  border: "1px #F5F5F5 solid",
  width: 100,
}));

export default function DashboardEventView() {
  const [active, setActive] = useState(false);
  const [agendaVisible, setAgendaVisible] = useState("-65%");

  function handleViewDescriptionClick(e) {
    e.stopPropagation();
    setAgendaVisible("0");
  }

  function handleEventPaperClick(e) {
    e.stopPropagation();
    setAgendaVisible("-65%");
  }

  function handleAgendaBoxClick(e) {
    e.stopPropagation();
  }

  return (
    <Box>
      <EventPaper
        onClick={handleEventPaperClick}
        variant="outlined"
        sx={{ overflow: "hidden" }}
      >
        <Box
          onClick={handleAgendaBoxClick}
          className="blur-box"
          sx={{ bottom: agendaVisible, zIndex: 99 }}
        >
          <Typography p={1} sx={{ textAlign: "center", fontWeight: 600 }}>
            Agenda
          </Typography>
          <List className="agenda-admin-event">
            <ListItemButton>
              <ListItemIcon sx={{ fontSize: 12 }}>
                <HighlightAltIcon />
              </ListItemIcon>
              <ListItemText primary="Inbox" />
            </ListItemButton>
            <ListItemButton>
              <ListItemIcon>
                <HighlightAltIcon />
              </ListItemIcon>
              <ListItemText primary="Inbox" />
            </ListItemButton>
            <ListItemButton>
              <ListItemIcon>
                <HighlightAltIcon />
              </ListItemIcon>
              <ListItemText primary="Inbox" />
            </ListItemButton>
            <ListItemButton>
              <ListItemIcon>
                <HighlightAltIcon />
              </ListItemIcon>
              <ListItemText primary="Inbox" />
            </ListItemButton>
            <ListItemButton>
              <ListItemIcon>
                <HighlightAltIcon />
              </ListItemIcon>
              <ListItemText primary="Inbox" />
            </ListItemButton>
            <ListItemButton>
              <ListItemIcon>
                <HighlightAltIcon />
              </ListItemIcon>
              <ListItemText primary="Inbox" />
            </ListItemButton>
            <ListItemButton>
              <ListItemIcon>
                <HighlightAltIcon />
              </ListItemIcon>
              <ListItemText primary="Inbox" />
            </ListItemButton>
          </List>
        </Box>
        <Stack
          p={"20px"}
          height={"100%"}
          spacing={1}
          justifyContent={"space-between"}
        >
          <Stack spacing={1} direction={"row"} justifyContent={"space-between"}>
            <Stack spacing={2} width={"50%"}>
              <Stack>
                <Typography fontWeight={600}>
                  Analyzing Performance: Identifying Bottlenecks & Root Cause
                  Analysis
                </Typography>
                <Stack
                  sx={{ cursor: "pointer" }}
                  spacing={"4px"}
                  direction={"row"}
                  alignItems={"center"}
                  onClick={handleViewDescriptionClick}
                >
                  <Typography
                    py={1}
                    sx={{ fontSize: "12px", fontStyle: "italic" }}
                  >
                    View Agenda
                  </Typography>
                  <KeyboardDoubleArrowRightIcon sx={{ fontSize: "12px" }} />
                </Stack>
              </Stack>
              <Stack
                direction={"row"}
                spacing={1}
                sx={{ cursor: "pointer", alignItems: "center" }}
              >
                <Typography width={"30%"} py={1} fontSize={12}>
                  Status
                </Typography>
                <ToggleButton
                  value="check"
                  sx={{ width: "70%", height: 15 }}
                  active={active}
                  onChange={() => {
                    setActive(!active);
                  }}
                >
                  <Stack spacing={1} direction={"row"}>
                    <Typography fontSize={10}>
                      {active ? "Active" : "Inactive"}
                    </Typography>
                    {active ? (
                      <CheckIcon sx={{ fontSize: 16, color: "lightgreen" }} />
                    ) : (
                      <ClearIcon sx={{ fontSize: 16, color: "crimson" }} />
                    )}
                  </Stack>
                </ToggleButton>
              </Stack>
            </Stack>
            <Stack spacing={1} width={"40%"}>
              <Box variant="outlined" borderRadius={5} overflow={"hidden"}>
                <img
                  width={"100%"}
                  height={"100%"}
                  src="https://media.istockphoto.com/id/177427917/photo/close-up-of-red-cricket-ball-and-bat-sitting-on-grass.jpg?s=2048x2048&w=is&k=20&c=Zq0DS_ODjxvuyLUtMFgfeDOEqSF7XMt4XGNUUBWPHzE="
                  alt="banner"
                />
              </Box>
              <Stack spacing="5px">
                <Stack
                  direction={"row"}
                  alignItems={"center"}
                  justifyContent={"end"}
                  spacing={1}
                  sx={{ cursor: "pointer" }}
                >
                  <Typography
                    sx={{
                      borderRadius: 2,
                      fontSize: 10,
                      color: "#D80032",
                    }}
                  >
                    Watch Video
                  </Typography>
                  <PlayCircleFilledWhiteIcon
                    sx={{ color: "#D80032" }}
                    fontSize="10px"
                  />
                </Stack>
                <Stack
                  direction={"row"}
                  alignItems={"center"}
                  justifyContent={"end"}
                  spacing={1}
                  sx={{ cursor: "pointer" }}
                >
                  <Typography
                    sx={{
                      borderRadius: 2,
                      fontSize: 10,
                      color: "#219C90",
                    }}
                  >
                    Download PPT
                  </Typography>
                  <DownloadIcon sx={{ color: "#219C90" }} fontSize="10px" />
                </Stack>
                <Stack
                  direction={"row"}
                  alignItems={"center"}
                  justifyContent={"end"}
                  spacing={1}
                  sx={{ cursor: "pointer" }}
                >
                  <Typography
                    sx={{
                      borderRadius: 2,
                      fontSize: 10,
                      color: "#A8DF8E",
                    }}
                  >
                    Upload
                  </Typography>
                  <CloudUploadIcon sx={{ color: "#A8DF8E" }} fontSize="10px" />
                </Stack>
              </Stack>
            </Stack>
          </Stack>
          <Stack
            border={"1px #F5F5F5 solid"}
            borderRadius={2}
            direction={"row"}
            spacing={2}
          >
            <Stack
              justifyContent={"center"}
              direction={"row"}
              sx={{
                width: "50%",
              }}
            >
              <Stack
                justifyContent={"center"}
                alignItems={"center"}
                sx={{
                  borderRadius: "50%",
                  height: 60,
                  width: 60,
                }}
              >
                <Typography fontWeight={600} fontSize={35}>
                  26
                </Typography>
                <Typography fontSize={12} whiteSpace={"nowrap"}>
                  Total Participant
                </Typography>
              </Stack>
            </Stack>
            <CustomPaper2
              variant="outlined"
              sx={{ backgroundColor: "#CBFFA9" }}
            >
              <Stack alignItems={"center"} justifyContent={"center"}>
                <PageviewIcon sx={{ color: "#8EAC50" }} />
                <Typography
                  textAlign={"center"}
                  color={"#8EAC50"}
                  fontSize={10}
                >
                  Participants
                </Typography>
              </Stack>
            </CustomPaper2>
            <CustomPaper2
              variant="outlined"
              sx={{ backgroundColor: "#A6F6FF" }}
            >
              <Stack alignItems={"center"} justifyContent={"center"}>
                <NotificationsActiveIcon sx={{ color: "#6499E9" }} />
                <Typography
                  textAlign={"center"}
                  color={"#6499E9"}
                  fontSize={10}
                >
                  Notify
                </Typography>
              </Stack>
            </CustomPaper2>
          </Stack>
        </Stack>
      </EventPaper>
    </Box>
  );
}
