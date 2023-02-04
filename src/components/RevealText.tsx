import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Typography from "@mui/material/Typography";

interface RevealTextProps {
  text?: string;
  maxLength: number;
}
const RevealText = ({ text = "N/A", maxLength }: RevealTextProps) => {
  const [revealText, setRevealText] = useState(false);
  const router = useRouter();

  const MAX_DESC_LENGTH = maxLength;

  useEffect(() => {
    //set revealText back to false when route changes
    setRevealText(false);
  }, [router.query]);

  const handleRevealText = () => {
    setRevealText(!revealText);
  };

  const revealBtn = (
    <Typography
      variant="caption"
      color="secondary"
      onClick={handleRevealText}
      sx={{ cursor: "pointer" }}
    >
      {revealText ? `${" "}See Less` : `${" "}See More`}
    </Typography>
  );

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
        {revealBtn}
      </Typography>
    );
  } else {
    return (
      <Typography variant="subtitle2" fontWeight="400">
        {text}
        {revealBtn}
      </Typography>
    );
  }
};

export default RevealText;
