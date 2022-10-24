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
// components

export default function UserPage() {

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
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
        <CardContent sx={{ flex: '1 0 auto',}}>
            <Typography component="div" variant="h5">
            akad
            </Typography>
            <Typography component="div" variant="h6">
            4:18
            </Typography>
            <Typography component="div" variant="h7">
                Payung Teduh - Ruang Tunggu
            </Typography>
          
        </CardContent>
      </Box>
      
    </Card>
        <Card>
            <Box sx={{ m:1, }}>
                <Text variant="h7">
                    {`
                    Betapa bahagianya hatiku
                    Saat ku duduk berdua denganmu
                    Berjalan bersamamu
                    Menarilah denganku

                    Namun, bila hari ini adalah yang terakhir
                    Namun, ku tetap bahagia
                    Selalu kusyukuri
                    Begitulah adanya

                    Namun, bila kau ingin sendiri
                    Cepat, cepatlah sampaikan kepadaku
                    Agar ku tak berharap
                    Dan buat kau bersedih

                    Bila nanti saatnya t'lah tiba
                    Ku ingin kau menjadi istriku
                    Berjalan bersamamu dalam terik dan hujan
                    Berlarian ke sana, kemari, dan tertawa

                    Namun, bila saat berpisah t'lah tiba
                    Izinkan ku menjaga dirimu
                    Berdua menikmati pelukan di ujung waktu
                    Sudilah kau temani diriku

                    Namun, bila kau ingin sendiri
                    Cepat, cepatlah sampaikan kepadaku
                    Agar ku tak berharap
                    Dan buat kau bersedih
                    
                    Bila nanti saatnya t'lah tiba
                    Ku ingin kau menjadi istriku
                    Berjalan bersamamu dalam terik dan hujan
                    Berlarian ke sana, kemari, dan tertawa

                    Namun, bila saat berpisah t'lah tiba
                    Izinkan ku menjaga dirimu
                    Berdua menikmati pelukan di ujung waktu
                    Sudilah kau temani diriku
                    
                    Sudilah kau menjadi temanku
                    Sudilah kau menjadi
                    Istriku
                    `}
                </Text>
            </Box>
        </Card>
        <Box component="span" sx={{ display: 'flex', p: 2, border: '2', justifyContent:'right'}}>
        <Button to="/1" size="medium" variant="text" component={RouterLink}>
              Back
            </Button>
    </Box>
      </Container>
    </>
  );
}
