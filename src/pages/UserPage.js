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
} from '@mui/material';
// components
import Scrollbar from '../components/scrollbar';
// sections
import { UserListHead } from '../sections/user';
// mock
import SONGLIST from '../_mock/songList';

// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: 'number', label: '#', alignRight: false },
  { id: 'songTitle', label: 'Title', alignRight: false },
  { id: 'songDuration', label: 'Duration', alignRight: false },
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


  return (
    <>
      <Helmet>
        <title> Payung Teduh - Ruang Tunggu </title>
      </Helmet>

      <Container>


    <Card sx={{ m: 2, display: 'flex' }}>
    <CardMedia
        component="img"
        sx={{ width: 151 }}
        image="/assets/images/products/product_1.jpg"
        alt="album cover"
      />
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center'  }}>
        <CardContent sx={{ flex: '1 0 auto',}}>
          <Typography component="div" variant="h5">
          Payung Teduh - Ruang Tunggu
          </Typography>
          <Typography component="div" variant="h7">
          2017
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
                  {filteredUsers.slice().map((row) => {
                    const { number, id, songTitle, songDuration, } = row;

                    return (
                      <TableRow hover key={id} tabIndex={-1}>
                      <TableCell align="left">{number}</TableCell>
                      <TableCell align="left">{songTitle}</TableCell>
                      <TableCell align="left">{'3:15'}</TableCell>
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
