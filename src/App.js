import logo from './logo.svg';
import './App.css';
import FeaturedSongsList from "./containers/FeaturedSongsList";
import TopCarts from "./components/TopCarts";

function App() {
  return (
    <div className="App">
      <h1>Top Chart Playlist</h1>
      <TopCarts/>
      <h1>New Releases</h1>
      <FeaturedSongsList/>
    </div>
  );
}

export default App;
