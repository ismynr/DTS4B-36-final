import { Outlet } from 'react-router-dom';
// @mui
import { styled } from '@mui/material/styles';
import { Box } from '@mui/material';
// components
import AccountPopover from './AccountPopover';
import Logo from '../../components/logo';

// ----------------------------------------------------------------------

const StyledHeader = styled('header')(({ theme }) => ({
  top: 0,
  left: 0,
  lineHeight: 0,
  width: '100%',
  position: 'relative',
  padding: theme.spacing(3, 3, 0),
  [theme.breakpoints.up('sm')]: {
    padding: theme.spacing(5, 5, 0),
  },
}));

// ----------------------------------------------------------------------

export default function SimpleLayout() {
  return (
    <>
      <StyledHeader>
        <Box sx={{ mt:-2, display: 'flex', position: 'relative', alignItems: 'right',justifyContent: 'right', }}>
        <AccountPopover />
        </Box>
        <Outlet />
      </StyledHeader>

      
    </>
  );
}
