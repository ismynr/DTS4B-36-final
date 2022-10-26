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
  TableContainer,
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
        image={lyricSongs.image}
        alt="album cover"
      />
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
        <CardContent sx={{ flex: '1 0 auto',}}>
            <Typography component="div" variant="h5">
              {lyricSongs.song}
            </Typography>
            <Typography component="div" variant="h6">
              {lyricSongs.year}
            </Typography>
            <Typography component="div" variant="h7">
              {lyricSongs.singers}
            </Typography>
          
        </CardContent>
      </Box>
      
    </Card>
        <Card>
            <Box sx={{ m:1, }}>
                <Text variant="h7" >
                  <div style={{margin: "3em 3em 3em 3em"}} dangerouslySetInnerHTML={{ __html: lyricSongs.lyrics }} />
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
