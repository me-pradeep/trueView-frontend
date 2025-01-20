"use client"
import React from 'react';
import Box from '@mui/material/Box';
import Rating from '@mui/material/Rating';
import Typography from '@mui/material/Typography';
import { useState } from 'react';

function RatingComponent({parameterName}) {
  const [value,setValue]=useState(0);
  return (
    <Box sx={{ '& > legend': { mt: 2 } }}>
      <Typography component="legend">{parameterName}</Typography>
      <Rating
        readOnly
        max={10}
        size="large"
        precision={0.5}
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
          console.log(newValue);
        }}
      />
    </Box>
  );
}

export default RatingComponent;