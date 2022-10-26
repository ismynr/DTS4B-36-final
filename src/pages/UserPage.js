import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { filter } from 'lodash';
import { useState } from 'react';
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
  LinearProgress,
  Link,
  Stack,
  CircularProgress
} from '@mui/material';
// components
import Scrollbar from '../components/scrollbar';
// sections
import { UserListHead } from '../sections/user';
// mock
import SONGLIST from '../_mock/songList';
import { useParams } from 'react-router-dom';
import useSongStore, { 
  selectFeaturedSongs, 
  selectFetchFeaturedSongs,
} from '../store/song';

// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: 'number', label: '#', alignRight: false },
  { id: 'image', label: 'Image', alignRight: false },
  { id: 'songTitle', label: 'Title', alignRight: false },
  { id: 'songDuration', label: 'Duration)', alignRight: false },
  { id: 'lyric', label: 'Lyric', alignRight: false },
  { id: 'media_url', label: 'Url', alignRight: false },
];

// ----------------------------------------------------------------------

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function applySortFilter(array, comparator, query) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  if (query) {
    return filter(array, (_user) => _user.name.toLowerCase().indexOf(query.toLowerCase()) !== -1);
  }
  return stabilizedThis.map((el) => el[0]);
}

export default function UserPage() {

  const [page, setPage] = useState(0);
  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('name');
  const [filterName, setFilterName] = useState('');
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - SONGLIST.length) : 0;
  const filteredUsers = applySortFilter(SONGLIST, getComparator(order, orderBy), filterName);
  const isNotFound = !filteredUsers.length && !!filterName;

  let params = useParams();

  const featuredSongs = useSongStore(selectFeaturedSongs);
  const fetchFeaturedSongs = useSongStore(selectFetchFeaturedSongs);

  let numberSongs = 0;

  useEffect(() => {
    fetchFeaturedSongs(window.location.pathname);
  }, []);

  // handling APIs is not ready
  if (featuredSongs.length < 1) {
    console.log(`ga adadata`);
    return (
      <Stack alignItems="center"><CircularProgress  /></Stack>
    );
  } else {
    console.log(featuredSongs);
    if (featuredSongs.error) {
      console.log(featuredSongs.error);
      return (
        <Stack alignItems="center"><CircularProgress  /></Stack>
      );
    } else {
      console.log('gaeror');
      const newPremaUrlSplit = featuredSongs.perma_url.replace('https://www.jiosaavn.com', '');
      const splitPremaUrl = newPremaUrlSplit.split('/');
      const splitLocationName = window.location.pathname.split('/');
      if (splitPremaUrl[3] !== splitLocationName[3]) {
        return (
          <Stack alignItems="center"><CircularProgress  /></Stack>
        );
      }
    }
    
  }

  return (
    <>
      <Helmet>
        <title> {featuredSongs.listname ?? featuredSongs.name} </title>
      </Helmet>

      <Container>

    <Card sx={{ m: 2, display: 'flex' }}>
    <CardMedia
        component="img"
        sx={{ width: 151 }}
        image={featuredSongs.image ?? 'https://i.pinimg.com/originals/16/bf/a1/16bfa1d4494404173e8d25ae0e108884.jpg'}
        alt="album cover"
      />
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center'  }}>
        <CardContent sx={{ flex: '1 0 auto',}}>
          <Typography component="div" variant="h5">
          {featuredSongs.listname ?? featuredSongs.name}
          </Typography>
          <Typography component="div" variant="h7">
          {featuredSongs.firstname ?? featuredSongs.year}
          </Typography>
          <Typography component="div" variant="h7">
          {featuredSongs.firstname ? 'Playlist':'Album'}
          </Typography>
        </CardContent>
      </Box>
      
    </Card>
        <Card>
          <Scrollbar>
            <TableContainer sx={{ display: 'flex' }}>
              <Table>
                <UserListHead
                  headLabel={TABLE_HEAD}
                  rowCount={SONGLIST.length}
                />
                <TableBody>
                  
                  {featuredSongs.songs.slice().map((row) => {
                    const { music_id, song, duration, media_url, perma_url, image } = row;
                    const newPremaUrl = perma_url.replace('https://www.jiosaavn.com', '');
                    numberSongs++;

                    return (
                      
                      <TableRow hover key={music_id} tabIndex={-1}>
                      <TableCell align="left">{numberSongs}</TableCell>
                      <TableCell align="left">
                      <CardMedia
                        component="img"
                        sx={{ width: 100 }}
                        image={image ?? 'https://i.pinimg.com/originals/16/bf/a1/16bfa1d4494404173e8d25ae0e108884.jpg'}
                        alt="album cover"
                      />
                      </TableCell>
                      <TableCell align="left">{song}</TableCell>
                      <TableCell align="left">{ (duration / 60).toFixed(2) }</TableCell>
                      <TableCell align="left">
                        <Button to={newPremaUrl} size="medium" variant="text" component={RouterLink}>
                          Lyric
                        </Button>
                      </TableCell>
                      <TableCell align="left">
                        {/* <Button to={'/'+media_url} onClick={handleRoute} size="medium" variant="text" component={RouterLink}>
                          mp3
                        </Button> */}
                        <a href={media_url} target="blank">mp3</a>
                      </TableCell>
                      </TableRow>
                    );
                  })}
                  {emptyRows > 0 && (
                    <TableRow style={{ height: 53 * emptyRows }}>
                      <TableCell colSpan={6} />
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </TableContainer>
          </Scrollbar>
        </Card>
        <Box component="span" sx={{ display: 'flex', p: 2, border: '2', justifyContent:'right'}}>
        <Button to="/" size="medium" variant="text" component={RouterLink}>
          Back
        </Button>
    </Box>
      </Container>
    </>
  );
}
