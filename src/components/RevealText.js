import React, { useState } from "react";
import { Typography } from "@mui/material";

const RevealText = ({ text = "N/A", maxLength }) => {
  const MAX_DESC_LENGTH = maxLength;

  const [seeMoreDesc, setSeeMoreDesc] = useState(false);

  const handleSeeMoreDesc = () => {
    setSeeMoreDesc(!seeMoreDesc);
  };

  if (text.length <= MAX_DESC_LENGTH) {
    return (
      <Typography variant="subtitle2" fontWeight="400">
        {text}
      </Typography>
    );
  }
  if (!seeMoreDesc) {
    return (
      <Typography variant="subtitle2" fontWeight="400">
        {`${text.substring(0, MAX_DESC_LENGTH)}...`}
        <Typography
          variant="caption"
          color="secondary"
          onClick={handleSeeMoreDesc}
          sx={{ cursor: "pointer" }}
        >
          {`${" "}See More`}
        </Typography>
      </Typography>
    );
  }
  if (seeMoreDesc) {
    return (
      <>
        <Typography variant="subtitle2" fontWeight="400">
          {text}
        </Typography>
        <Typography
          variant="caption"
          color="secondary"
          sx={{ cursor: "pointer" }}
          onClick={handleSeeMoreDesc}
        >
          {`${" "}See Less`}
        </Typography>
      </>
    );
  }
};

export default RevealText;
