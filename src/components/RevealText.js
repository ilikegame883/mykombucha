import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Typography from "@mui/material/Typography";

const RevealText = ({ text = "N/A", maxLength }) => {
  const MAX_DESC_LENGTH = maxLength;

  const router = useRouter();

  const [revealText, setRevealText] = useState(false);

  useEffect(() => {
    //set revealText back to false when route changes
    setRevealText(false);
  }, [router.query]);

  const handleRevealText = () => {
    setRevealText(!revealText);
  };

  if (text.length <= MAX_DESC_LENGTH) {
    return (
      <Typography variant="subtitle2" fontWeight="400">
        {text}
      </Typography>
    );
  }
  if (!revealText) {
    return (
      <Typography variant="subtitle2" fontWeight="400">
        {`${text.substring(0, MAX_DESC_LENGTH)}...`}
        <Typography
          variant="caption"
          color="secondary"
          onClick={handleRevealText}
          sx={{ cursor: "pointer" }}
        >
          {`${" "}See More`}
        </Typography>
      </Typography>
    );
  } else {
    return (
      <Typography variant="subtitle2" fontWeight="400">
        {text}
        <Typography
          variant="caption"
          color="secondary"
          onClick={handleRevealText}
          sx={{ cursor: "pointer" }}
        >
          {`${" "}See Less`}
        </Typography>
      </Typography>
    );
  }
};

export default RevealText;
