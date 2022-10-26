import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
// @mui
import { Stack, IconButton, InputAdornment, TextField, Divider, Box, Typography } from '@mui/material';
import { LoadingButton } from '@mui/lab';
// components
import Iconify from '../../../components/iconify';
// firebase
import { sendPasswordResetEmail, signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../../config/firebase';

// ----------------------------------------------------------------------

export default function LoginForm() {
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleClick = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const email = data.get('email');
    const password = data.get('password');
    
    try {
      // kita pakai fungsi ini untuk login
      await signInWithEmailAndPassword(auth, email, password);
      navigate('/home', { replace: true });
    } catch (error) {
      setErrorMessage(error.message);
    }
  };

  return (
    <>
      <Box component="form" onSubmit={handleClick} noValidate>
        <Stack spacing={3}>
          <TextField 
            name="email"
            required
            id="email" 
            label="Email address" />

          <TextField
            name="password"
            required
            id="password"
            label="Password"
            type={showPassword ? 'text' : 'password'}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                    <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        </Stack>
        
        <br />
        <Typography variant="body2" color='red'>{errorMessage}</Typography>
        <Divider sx={{ my: 3 }}/>
        
        <LoadingButton 
          fullWidth 
          size="large" 
          type="submit" 
          variant="contained" 
        >
          Login
        </LoadingButton>
      </Box>
    </>
  );
}
