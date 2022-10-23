import React from 'react';
import FeaturedSongsList from "../containers/FeaturedSongsList";
import TopCarts from "../components/TopCarts";

const Home = () => {
    return (
        <>
            <h1>Top Chart Playlist</h1>
            <TopCarts/>
            <h1>New Releases</h1>
            <FeaturedSongsList/>
        </>
    );
}

export default Home;