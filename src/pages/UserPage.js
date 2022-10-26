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
  TableContainer
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
  { id: 'songTitle', label: 'Title', alignRight: false },
  { id: 'songDuration', label: 'Duration', alignRight: false },
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

  useEffect(() => {
    fetchFeaturedSongs(params?.name, params?.id);
    console.log(featuredSongs);
  }, []);

  let numberSongs = 0;

  return (
    <>
      <Helmet>
        <title> {featuredSongs.listname} </title>
      </Helmet>

      <Container>

    <Card sx={{ m: 2, display: 'flex' }}>
    <CardMedia
        component="img"
        sx={{ width: 151 }}
        image={featuredSongs.image}
        alt="album cover"
      />
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center'  }}>
        <CardContent sx={{ flex: '1 0 auto',}}>
          <Typography component="div" variant="h5">
          {featuredSongs.listname}
          </Typography>
          <Typography component="div" variant="h7">
          {featuredSongs.firstnam}
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
                    const { music_id, song, duration, media_url, perma_url } = row;
                    const newPremaUrl = perma_url.replace('https://www.jiosaavn.com', '');
                    numberSongs++;

                    return (
                      <TableRow hover key={music_id} tabIndex={-1}>
                      <TableCell align="left">{numberSongs}</TableCell>
                      <TableCell align="left">{song}</TableCell>
                      <TableCell align="left">{duration}</TableCell>
                      <TableCell align="left">
                      <Button to={newPremaUrl} size="medium" variant="text" component={RouterLink}>
                        Lyric
                      </Button>
                      </TableCell>
                      <TableCell align="left">
                        <Button to={'/'+media_url} size="medium" variant="text" component={RouterLink}>
                          mp3
                        </Button>
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
