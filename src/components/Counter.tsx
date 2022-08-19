import React, { useState, useEffect } from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import init, { add } from 'thermo-wasm';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

// const add = (a: number, b: number) => a + b;

function Counter() {
  const [left, setLeft] = useState(0);
  const [right, setRight] = useState(0);
  const [result, setResult] = useState(0);

  useEffect(() => {
    init().then(() => {
      console.log('thermo-wasm initialized');
    });
    setLeft(0);
    setRight(0);
    setResult(0);
  }, []);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setResult(add(left, right));
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    switch (e.target.name) {
      case 'left':
        setLeft(Number(e.target.value));
        break;
      case 'right':
        setRight(Number(e.target.value));
        break;
      default:
      // do nothing
    }
  };

  return (
    <Box sx={{ flexGrow: 1 }} margin={3}>
      <Grid container spacing={2}>
        <Grid item xs={9}>
          <Item>
            <Box
              component="form"
              sx={{
                '& > :not(style)': { m: 1, width: '25ch' },
              }}
              noValidate
              autoComplete="off"
              onSubmit={handleSubmit}
            >
              <TextField
                id="outlined-basic"
                label="Left"
                name="left"
                variant="outlined"
                type="number"
                value={left}
                onChange={handleChange}
              />
              <TextField
                id="outlined-basic"
                label="Right"
                name="right"
                variant="outlined"
                type="number"
                value={right}
                onChange={handleChange}
              />
              <Button variant="contained" type="submit">
                Add
              </Button>
            </Box>
          </Item>
        </Grid>
        <Grid item xs={3}>
          <Item>
            <Typography color="green" variant="h5">
              {result}
            </Typography>
          </Item>
        </Grid>
        <Grid item xs={4}>
          <Item>xs=4</Item>
        </Grid>
        <Grid item xs={8}>
          <Item>xs=8</Item>
        </Grid>
      </Grid>
    </Box>
  );
}

export default Counter;
