import { Link as RouterLink } from 'react-router-dom';
import PropTypes from 'prop-types';
// @mui
import { Box, Card, CardActionArea, Link, Typography, Stack } from '@mui/material';
import { styled } from '@mui/material/styles';

// ----------------------------------------------------------------------

const StyledProductImg = styled('img')({
  top: 0,
  width: '100%',
  height: '100%',
  objectFit: 'cover',
  position: 'absolute',
});

// ----------------------------------------------------------------------

ShopProductCard.propTypes = {
  product: PropTypes.object,
};

export default function ShopProductCard({ product }) {
  const { title, image, perma_url, type } = product;
  const newUrl = perma_url.replace('https://www.jiosaavn.com', '');

  return (
    <CardActionArea component={RouterLink} to={newUrl}> 
    <Card>
      <Box sx={{ pt: '100%', position: 'relative' }}>
        
        <StyledProductImg alt={title} src={image} />
      </Box>

      <Stack spacing={2} sx={{ p: 3 }}>
        <Link color="inherit" underline="hover">
          <Typography variant="subtitle2" noWrap>
            {title}
          </Typography>
        </Link>
      </Stack>
    </Card>
    </CardActionArea>
  );
}
