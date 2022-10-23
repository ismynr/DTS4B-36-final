import React, { useEffect } from 'react';

import Song from '../components/Song';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';



import useSongStore, { selectFeaturedSongs, selectFetchFeaturedSongs } from '../store/song';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

const FeaturedSongsList = () => {
const featuredSongs = useSongStore(selectFeaturedSongs);
  const fetchFeaturedSongs = useSongStore(selectFetchFeaturedSongs);

  useEffect(() => {
    if (featuredSongs.length == 0) {
        fetchFeaturedSongs();
    }
  }, []);

  return (
    <div className="color-list">
      <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
          {featuredSongs.map((item) => (
            <Grid item xs={2}>
              <Song key={item.music_id} item={item} />
            </Grid>
            ))}
      </Grid>
    </div>
  );
};

export default FeaturedSongsList;
