import * as React from "react";
import { Slider, Box, Typography, Stack } from "@mui/material";

const marks = [
  {
    value: 0,
    label: "0",
  },
  {
    value: 1,
    label: "1",
  },
  {
    value: 2,
    label: "2",
  },
  {
    value: 3,
    label: "3",
  },
  {
    value: 4,
    label: "4",
  },
  {
    value: 5,
    label: "5",
  },
];

function valuetext(value) {
  return `${value} Rating`;
}

const RatingSlider = ({ rating, handleSliderChange }) => {
  return (
    <Box>
      <Stack alignItems="center" mb={2}>
        <Typography
          variant="h5"
          color="text.primary"
          align="center"
          fontWeight="700"
        >
          Rate this Kombucha
        </Typography>
        <Typography variant="caption" color="text.primary" align="center">
          Click or drag the slider to your rating
        </Typography>
      </Stack>
      <Slider
        value={typeof rating === "number" ? rating : 0}
        aria-label="Always visible"
        onChange={handleSliderChange}
        defaultValue={1}
        getAriaValueText={valuetext}
        step={0.25}
        marks={marks}
        max={5}
        min={0}
        valueLabelDisplay="auto"
      />
    </Box>
  );
};

export default RatingSlider;
