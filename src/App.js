// routes
import Router from './routes';
// theme
import ThemeProvider from './theme';
// components
import ScrollToTop from './components/scroll-to-top';
import { StyledChart } from './components/chart';
import FeaturedSongsList from "./containers/FeaturedSongsList";

// ----------------------------------------------------------------------

export default function App() {
  return (
    // <FeaturedSongsList/>
    <ThemeProvider>
      <ScrollToTop />
      <StyledChart />
      <Router />
    </ThemeProvider>
  );
}
