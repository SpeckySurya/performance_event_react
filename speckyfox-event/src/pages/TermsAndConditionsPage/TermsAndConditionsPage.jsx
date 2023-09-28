import { ExpandLess, ExpandMore } from "@mui/icons-material";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import {
  Box,
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

const TermsAndConditionsPage = () => {
  const tcData = [
    {
      heading: {
        title: "Use of the Website",
        content: "",
      },
      subHeading: [
        {
          title: "Compliance",
          content:
            "You agree to use Speckyfox Event in compliance with all applicable laws and regulations.",
        },
      ],
    },
    {
      heading: {
        title: "User Accounts",
        content: "",
      },
      subHeading: [
        {
          title: "Registration",
          content:
            "Some features of our website may require you to create a user account. You are responsible for maintaining the confidentiality of your account information and password.",
        },
        {
          title: "Accuracy of Information",
          content:
            "You agree to provide accurate, current, and complete information when creating your user account and to update your information as necessary.",
        },
      ],
    },
    {
      heading: {
        title: "Intellectual Property",
        content: "",
      },
      subHeading: [
        {
          title: "Ownership",
          content:
            "All content, text, graphics, logos, images, and other materials on Speckyfox Event are the property of Speckyfox Technologies Pvt. Ltd. and are protected by intellectual property laws.",
        },
        {
          title: "Use of Content",
          content:
            "You may only use the content on our website for personal, non-commercial purposes. Any other use, including reproduction, modification, distribution, or public display, is prohibited without our prior written consent.",
        },
      ],
    },
    {
      heading: {
        title: "User Content",
        content: "",
      },
      subHeading: [
        {
          title: "Submission",
          content:
            "If you submit content, such as comments or reviews, to our website, you grant Speckyfox Technologies Pvt. Ltd. a non-exclusive, royalty-free, perpetual, and worldwide license to use, reproduce, modify, and display that content.",
        },
        {
          title: "Responsibility",
          content:
            "You are solely responsible for any content you submit to our website, and it must not violate the rights of third parties or any applicable laws.",
        },
      ],
    },
    {
      heading: {
        title: "Privacy",
        content: "",
      },
      subHeading: [
        {
          title: "Privacy Policy",
          content:
            "Your use of Speckyfox Event is governed by our Privacy Policy, which outlines how we collect, use, and protect your personal information. By using our website, you consent to our data practices as described in the Privacy Policy.",
        },
      ],
    },
    {
      heading: {
        title: "Disclaimers",
        content: "",
      },
      subHeading: [
        {
          title: "No Warranty",
          content:
            'Speckyfox Event is provided "as is" and without warranties of any kind, either express or implied. We do not guarantee the accuracy, reliability, or availability of our website.',
        },
        {
          title: "Limitation of Liability",
          content:
            "Speckyfox Technologies Pvt. Ltd. shall not be liable for any direct, indirect, incidental, special, or consequential damages arising from your use of our website.",
        },
      ],
    },
    {
      heading: {
        title: "Termination",
        content: "",
      },
      subHeading: [
        {
          title: "Termination",
          content:
            "We reserve the right to terminate or suspend your access to Speckyfox Event at our discretion, without notice, for any reason, including if you violate these Terms.",
        },
      ],
    },
    {
      heading: {
        title: "Changes to Terms",
        content: "",
      },
      subHeading: [
        {
          title: "Updates",
          content:
            "We may update these Terms from time to time to reflect changes in our practices or for other operational, legal, or regulatory reasons. The updated Terms will be posted on our website.",
        },
      ],
    },
    {
      heading: {
        title: "Governing Law",
        content: "",
      },
      subHeading: [
        {
          title: "Jurisdiction",
          content:
            "These Terms are governed by and construed in accordance with the laws of [Your Jurisdiction], without regard to its conflict of law principles.",
        },
      ],
    },
  ];

  return (
    <Box margin="auto" maxWidth={"50%"} minWidth={"320px"}>
      <Typography m={2} variant="h2" fontWeight="bold">
        Terms and Conditions
      </Typography>
      <Typography m={2} variant="h4">
        Welcome to Speckyfox Event
      </Typography>
      <Typography m={2}>
        A website owned and operated by Speckyfox Technologies Pvt. Ltd. These
        Terms and Conditions ("Terms") govern your use of our website. By
        accessing or using Speckyfox Event, you agree to comply with and be
        bound by these Terms. If you do not agree to these Terms, please do not
        use our website.
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
        {tcData.map((item, index) => {
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
          If you have any questions or concerns about this Terms and Conditions,
          please contact us by
          <Link to={"https://speckyfox.com/contact-us"}> click here</Link>
        </Typography>
        <Typography py={2}>
          Thank you for using Speckyfox Event. We hope you find our website
          informative and useful.
        </Typography>
      </Box>
    </Box>
  );
};

export default TermsAndConditionsPage;
