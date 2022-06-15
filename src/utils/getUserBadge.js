import React from "react";
import MilitaryTechIcon from "@mui/icons-material/MilitaryTech";
import DiamondIcon from "@mui/icons-material/Diamond";
import { Typography } from "@mui/material";

const getUserBadge = (rating_total, align = "none") => {
  let label;
  let badgeColor;
  if (rating_total <= 10) {
    label = "Bronze Badge";
    badgeColor = "#CD7F32";
  }
  if (11 <= rating_total >= 25) {
    label = "Silver Badge";
    badgeColor = "#C0C0C0";
  }
  if (26 <= rating_total >= 50) {
    label = "Gold Badge";
    badgeColor = "#D4AF37";
  }
  if (51 <= rating_total) {
    label = "Platinum Badge";
    badgeColor = "#EAFAFD";
  }
  return {
    label,
    value:
      badgeColor !== "#EAFAFD" ? (
        <MilitaryTechIcon
          sx={{
            color: badgeColor,
          }}
        />
      ) : (
        <DiamondIcon sx={{ color: badgeColor }} />
      ),

    info: (
      <React.Fragment>
        <Typography color="inherit" fontWeight="600" variant="body1">
          Badge Rating System:
        </Typography>
        <Typography color="inherit" component="ul">
          <Typography color="inherit" component="li" variant="body2">
            Bronze = less than 10 ratings
          </Typography>
          <Typography color="inherit" component="li" variant="body2">
            Silver = over 10 ratings
          </Typography>
          <Typography color="inherit" component="li" variant="body2">
            Gold = over 25 ratings
          </Typography>
          <Typography color="inherit" component="li" variant="body2">
            Platinum = over 50 ratings
          </Typography>
        </Typography>
      </React.Fragment>
    ),
  };
};

export default getUserBadge;
