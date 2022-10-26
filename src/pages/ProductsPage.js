import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link as RouterLink } from 'react-router-dom';
// @mui
import { styled, alpha } from '@mui/material/styles';
import { Box, Card, Container, Stack, Typography, OutlinedInput, InputAdornment, Button } from '@mui/material';
// components
import { ProductSort, ProductList } from '../sections/products';
import Iconify from '../components/iconify';
// mock
import ALBUMS from '../_mock/album';
import useFeaturedStore, { 
  selectChart, 
  selectFetchChart, 
  selectNewRelease, 
  selectFetchNewRelease, 
  selectFeaturedPlaylist, 
  selectFetchFeaturedPlaylist
} from '../store/featured';

import useSongStore, { 
  selectSearchSongs, 
  selectFetchSearchSongs,
} from '../store/song';

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
  const chart = useFeaturedStore(selectChart);
  const fetchChart = useFeaturedStore(selectFetchChart);

  const newRelease = useFeaturedStore(selectNewRelease);
  const fetchNewRelease = useFeaturedStore(selectFetchNewRelease);

  const featuredPlaylist = useFeaturedStore(selectFeaturedPlaylist);
  const fetchFeaturedPlaylist = useFeaturedStore(selectFetchFeaturedPlaylist);

  let searchSongTemp = [];
  const searchSong = useSongStore(selectSearchSongs);
  const fetchSearchSong = useSongStore(selectFetchSearchSongs);

  useEffect(() => {
    fetchChart();
    fetchNewRelease();
    fetchFeaturedPlaylist();
    fetchSearchSong('');
  }, []);

  const handleChange = (event) => {
    if (event.target.value.length >= 3) {
      console.log(event.target.value);
      fetchSearchSong(event.target.value);
    }
  }

  const headerResultSearch = (search) => {
    if (search.length > 1) {
      return (
        <p>
          Result of Search
        </p>
      );
    }
  }

  return (
    <>
      <Helmet>
        <title> Music App </title>
      </Helmet>

      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ mb: 5 }}>
          <Stack direction="row" spacing={1} flexShrink={0} sx={{ my: 1 }}>
            <StyledSearch
            placeholder="Search..."
            onChange={handleChange}
            startAdornment={
              <InputAdornment position="start">
                <Iconify icon="eva:search-fill" sx={{ color: 'text.disabled', width: 15, height: 15 }} />
              </InputAdornment>
            }
          />
          </Stack>
          {/* <ProductSort /> */}
        </Stack>

        {headerResultSearch(searchSong)}

        {searchSong.map((row) => {
          const { music_id, song, duration, media_url, perma_url } = row;
          const newPremaUrl = perma_url.replace('https://www.jiosaavn.com', '');

          return (
            <Button to={newPremaUrl} size="medium" variant="text" component={RouterLink}>
              {song}
            </Button>
          );
        })}

        <Typography variant="h3" sx={{ p: 2 }}>
          Top Music Cart
        </Typography>
        <Card sx={{ p: 3 }}>
        <ProductList products={chart} />
        </Card>

        <Typography variant="h3" sx={{ p: 2 }}>
          New Release
        </Typography>
        <Card sx={{ p: 3 }}>
        <ProductList products={newRelease} />
        </Card>

        <Typography variant="h3" sx={{ p: 2 }}>
          Featured Playlist
        </Typography>
        <Card sx={{ p: 3 }}>
        <ProductList products={featuredPlaylist} />
        </Card>

        <Box sx={{ p: 1 }}/>
      </Container>
    </>
  );
}
