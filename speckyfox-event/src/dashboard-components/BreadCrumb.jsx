import HomeIcon from "@mui/icons-material/Home";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Chip from "@mui/material/Chip";
import { emphasize, styled } from "@mui/material/styles";
import * as React from "react";

const StyledBreadcrumb = styled(Chip)(({ theme }) => {
  const backgroundColor =
    theme.palette.mode === "light"
      ? theme.palette.grey[100]
      : theme.palette.grey[800];
  return {
    backgroundColor,
    height: theme.spacing(3),
    color: theme.palette.text.primary,
    fontWeight: theme.typography.fontWeightRegular,
    "&:hover, &:focus": {
      backgroundColor: emphasize(backgroundColor, 0.06),
    },
    "&:active": {
      boxShadow: theme.shadows[1],
      backgroundColor: emphasize(backgroundColor, 0.12),
    },
  };
});

function handleClick(event, page) {
  event.preventDefault();
  page?.route();
}

export default function Breadcrumb({ pages }) {
  return (
    <div role="presentation">
      <Breadcrumbs aria-label="breadcrumb">
        {pages?.map((page) => (
          <StyledBreadcrumb
            component="a"
            href="#"
            label={page.name}
            icon={page?.icon}
            onClick={(e) => handleClick(e, page)}
          />
        ))}
        {/* <StyledBreadcrumb
          label="Accessories"
          deleteIcon={<ExpandMoreIcon />}
          onDelete={handleClick}
        /> */}
      </Breadcrumbs>
    </div>
  );
}
