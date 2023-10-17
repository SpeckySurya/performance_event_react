import { ExpandLess, ExpandMore } from "@mui/icons-material";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import {
  Box,
  Button,
  Collapse,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  ListSubheader,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./PrivacyPage.css";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

/**
 *
 * This page used to show privacy policy
 *
 * @returns Privacy Page Component
 */

const PrivacyPage = () => {
  const privacyData = [
    {
      heading: {
        title: "Information We Collect",
        content:
          "We may collect the following types of information when you visit our website",
      },
      subHeading: [
        {
          title: "Personal Information",
          content:
            "We may collect personal information such as your name, email address, phone number, and job title when you voluntarily provide it to us through forms.",
        },
      ],
    },
    {
      heading: {
        title: "How We Use Your Information",
        content: "We use the information we collect for the following purposes",
      },
      subHeading: [
        {
          title: "To Provide Services",
          content:
            "We use your personal information to provide you with the services offered on Speckyfox Event, including event registration and updates on IT technologies.",
        },
        {
          title: "Communication",
          content:
            "We may use your contact information to communicate with you, respond to your inquiries, and provide important updates and announcements related to our events and services.",
        },
        {
          title: "Analytics",
          content:
            " We use usage information to analyze and improve our website's performance and user experience.",
        },
      ],
    },
    {
      heading: {
        title: "Information Sharing",
        content:
          "We do not sell, rent, or trade your personal information to third parties. However, we may share your information with",
      },
      subHeading: [
        {
          title: "Service Providers",
          content:
            "We may share your information with third-party service providers who assist us in delivering our services and maintaining our website.",
        },
        {
          title: "Legal Requirements",
          content:
            "We may disclose your information when required by law, court order, or governmental authority.",
        },
      ],
    },
    {
      heading: {
        title: "Your Choices",
        content:
          "You have the following choices regarding your personal information:",
      },
      subHeading: [
        {
          title: "Access and Update",
          content:
            "You can request access to and update your personal information by contacting us using the information provided below.",
        },
        {
          title: "Marketing Communications",
          content:
            "You can opt out of receiving marketing communications from us by following the instructions in the communication or by contacting us.",
        },
      ],
    },
    {
      heading: {
        title: "Security",
        content:
          "We implement reasonable security measures to protect your personal information from unauthorized access, disclosure, alteration, or destruction. However, no method of transmission over the internet or electronic storage is completely secure, and we cannot guarantee absolute security.",
      },
      subHeading: [
        {
          title: "Security",
          content:
            "We implement reasonable security measures to protect your personal information from unauthorized access, disclosure, alteration, or destruction. However, no method of transmission over the internet or electronic storage is completely secure, and we cannot guarantee absolute security.",
        },
      ],
    },
    {
      heading: {
        title: "Changes to this Privacy Policy",
        content:
          "We may update this Privacy Policy to reflect changes in our practices or for other operational, legal, or regulatory reasons. We will post the revised Privacy Policy on our website, and the date of the last update will be indicated at the top of the policy.",
      },
      subHeading: [
        {
          title: "Changes to this Privacy Policy",
          content:
            "We may update this Privacy Policy to reflect changes in our practices or for other operational, legal, or regulatory reasons. We will post the revised Privacy Policy on our website, and the date of the last update will be indicated at the top of the policy.",
        },
      ],
    },
  ];

  return (
    <>
      <Link to={"/"}>
        <Button className="privacyPolicybackButton">
          <ArrowBackIcon />
        </Button>
      </Link>
      <Box margin="auto" maxWidth={"50%"} minWidth={"320px"}>
        <Typography m={2} variant="h2" fontWeight="bold">
          Privacy Policy
        </Typography>
        <Typography m={2} variant="h4">
          Welcome to Speckyfox Event
        </Typography>
        <Typography m={2}>
          A website owned and operated by Speckyfox Technologies Pvt. Ltd. At
          Speckyfox, we are committed to protecting your privacy and ensuring
          the security of your personal information. This Privacy Policy
          outlines our practices regarding the collection, use, and disclosure
          of your personal data when you use our website, Speckyfox Event.
          Please take a moment to review this Privacy Policy to understand how
          we handle your personal information. By accessing or using our
          website, you consent to the practices described in this Privacy
          Policy.
        </Typography>
        <List
          sx={{ width: "100%", bgcolor: "background.paper" }}
          component="nav"
          subheader={
            <ListSubheader
              sx={{ textAlign: "end" }}
              component="div"
              id="nested-list-subheader"
            >
              Last Updated: 27 September 2023
            </ListSubheader>
          }
        >
          {privacyData.map((item, index) => {
            const [open, setOpen] = useState(false);
            return (
              <>
                <ListItemButton onClick={() => setOpen(!open)}>
                  <ListItemIcon>{index + 1}</ListItemIcon>
                  <ListItemText primary={item.heading.title} />
                  {open ? <ExpandLess /> : <ExpandMore />}
                </ListItemButton>
                <Collapse in={open} timeout="auto" unmountOnExit>
                  {item?.subHeading?.map((e) => {
                    const [open2, setOpen2] = useState(false);
                    return (
                      <List component="div" disablePadding>
                        <ListItemButton
                          sx={{ pl: 4 }}
                          onClick={() => setOpen2(!open2)}
                        >
                          <ListItemIcon>
                            <CheckCircleOutlineIcon />
                          </ListItemIcon>
                          <ListItemText primary={e.title} />
                          {open2 ? <ExpandLess /> : <ExpandMore />}
                        </ListItemButton>
                        <Collapse in={open2} timeout={"auto"} unmountOnExit>
                          <ListItemText sx={{ pl: 4 }} primary={e.content} />
                        </Collapse>
                      </List>
                    );
                  })}
                </Collapse>
              </>
            );
          })}
        </List>
        <Box>
          <Typography variant="h4" py={2}>
            Contact Us
          </Typography>
          <Typography>
            If you have any questions or concerns about this Privacy Policy or
            our data practices, please contact us by
            <Link to={"https://speckyfox.com/contact-us"}> click here</Link>
          </Typography>
          <Typography py={2}>
            Thank you for trusting Speckyfox Event with your personal
            information. We are dedicated to protecting your privacy and
            ensuring a secure and enjoyable experience on our website.
          </Typography>
        </Box>
      </Box>
    </>
  );
};

export default PrivacyPage;
