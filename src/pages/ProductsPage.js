import { Helmet } from 'react-helmet-async';
// import { useState } from 'react';
// @mui
import { styled, alpha } from '@mui/material/styles';
import { Box, Card, Container, Stack, Typography, OutlinedInput, InputAdornment } from '@mui/material';
// components
import { ProductSort, ProductList } from '../sections/products';
import Iconify from '../components/iconify';
// mock
import ALBUMS from '../_mock/album';

// ----------------------------------------------------------------------

const StyledSearch = styled(OutlinedInput)(({ theme }) => ({
  width: 240,
  transition: theme.transitions.create(['box-shadow', 'width'], {
    easing: theme.transitions.easing.easeInOut,
    duration: theme.transitions.duration.shorter,
  }),
  '&.Mui-focused': {
    width: 320,
    boxShadow: theme.customShadows.z8,
  },
  '& fieldset': {
    borderWidth: `1px !important`,
    borderColor: `${alpha(theme.palette.grey[400], 0.32)} !important`,
  },
}));

// ----------------------------------------------------------------------


export default function AlbumsPage() {

  return (
    <>
      <Helmet>
        <title> Music App </title>
      </Helmet>

      <Container>
          <Typography variant="h3" sx={{ p: 2 }}>
            Albums
          </Typography>
        <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ mb: 5 }}>
          <Stack direction="row" spacing={1} flexShrink={0} sx={{ my: 1 }}>
            <StyledSearch
            placeholder="Search..."
            startAdornment={
              <InputAdornment position="start">
                <Iconify icon="eva:search-fill" sx={{ color: 'text.disabled', width: 15, height: 15 }} />
              </InputAdornment>
            }
          />
          </Stack>
          <ProductSort />
        </Stack>
        <Card sx={{ p: 3 }}>
        <ProductList products={ALBUMS} />
        </Card>
        <Box sx={{ p: 1 }}/>
      </Container>
    </>
  );
}
