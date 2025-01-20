"use client"
import React from "react";
import Box from "@mui/material/Box";
import Rating from "@mui/material/Rating";
import Typography from "@mui/material/Typography";

function RatingComponent({ parameterName, value, onRatingChange,isDisabled }) {
  return (
    <Box sx={{ "& > legend": { mt: 2 } }}>
      <Typography component="legend">{parameterName}</Typography>
      <Rating
        max={10}
        size="large"
        disabled={isDisabled}
        precision={0.5}
        value={value}
        onChange={(event, newValue) => {
          onRatingChange(parameterName, newValue);
        }}
      />
    </Box>
  );
}

export default RatingComponent;
