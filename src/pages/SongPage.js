import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { filter } from 'lodash';
import { useState } from 'react';
import { Text } from "react-native-web";
import { Link as RouterLink } from 'react-router-dom';
// @mui
import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Table,
  TableRow,
  TableBody,
  TableCell,
  Container,
  Typography,
  CircularProgress,
  Stack
} from '@mui/material';
import { useParams } from 'react-router-dom';
import useSongStore, { 
  selectLyricSongs,
  selectFetchLyricSongs,
} from '../store/song';
import { useNavigate} from "react-router-dom";
// components

export default function UserPage() {
  let params = useParams();
  let navigate = useNavigate();

  const lyricSongs = useSongStore(selectLyricSongs);
  const fetchLyricSongs = useSongStore(selectFetchLyricSongs);

  useEffect(() => {
    fetchLyricSongs(params?.name, params?.id);
  }, []);

  // handling APIs is not ready
  if (!lyricSongs) {
    return (
      <Stack alignItems="center"><CircularProgress  /></Stack>
    );
  } else {
    const newPremaUrlSplit = lyricSongs.perma_url.replace('https://www.jiosaavn.com', '');
    const splitPremaUrl = newPremaUrlSplit.split('/');
    const splitLocationName = window.location.pathname.split('/');
    if (splitPremaUrl[3] !== splitLocationName[3]) {
      return (
        <Stack alignItems="center"><CircularProgress  /></Stack>
      );
    }
  }

  return (
    <>
      <Helmet>
        <title> {lyricSongs.song} </title>
      </Helmet>

      <Container>


    <Card sx={{ m: 2, display: 'flex' }}>
    <CardMedia
        component="img"
        sx={{ width: 151 }}
        image={lyricSongs.image.includes('https') ? lyricSongs.image : 'https://i.pinimg.com/originals/f1/91/a4/f191a4786289ade562884722ef784cff.jpg'}
        alt="album cover"
      />
      <Box sx={{ display: 'block', flexDirection: 'column', alignItems: 'center'}}>
        <CardContent sx={{ flex: '1 0 auto'}}>
            <h2>
              {lyricSongs.song}
            </h2>
            <br/>
            <h4>
              {lyricSongs.year}
            </h4>
            <h5>
              {lyricSongs.singers}
            </h5>
        </CardContent>
      </Box>
      
    </Card>
    <Box component="span" sx={{ display: 'flex', p: 2, justifyContent:'center'}}>
      <video controls
        src={lyricSongs.media_url}
        height="50"
        width="100%">
          Sorry, browser not support <a href={lyricSongs.media_url}>download</a>
      </video>
    </Box>
    <Card>
    
        <Box sx={{ m:5, }}>
            <Text variant="h7" >
              {lyricSongs.lyrics 
              ? <div dangerouslySetInnerHTML={{ __html: lyricSongs.lyrics }} />
              :  'There is no Lyrics'}
              
            </Text>
        </Box>
    </Card>
    <Box component="span" sx={{ display: 'flex', p: 2, border: '2', justifyContent:'right'}}>
    <Button onClick={() => navigate(-1)} size="medium" variant="text" component={RouterLink}>
          Back
        </Button>
    </Box>
      </Container>
    </>
  );
}
