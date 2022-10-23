import axios from 'axios';
import produce from 'immer';
import create from 'zustand';
import { persist } from 'zustand/middleware';

const initialSong = [];
const initialFeaturedSongs = [];
const BASE_URL = 'https://jio-saavn-api-unof.herokuapp.com/';

const useSongStore = create(
  persist(
    (set) => ({
      songs: initialSong,
      featuredSongs: initialFeaturedSongs,
      fetchFeaturedSongs: async () => {
        const { data: axiosData } = await axios.get(`${BASE_URL}result/?query=https://www.jiosaavn.com/featured/weekly-top-songs/8MT-LQlP35c_`);

        set(produce((state) => {
          state.featuredSongs = axiosData.songs;
        }));
      },
    })
  )
);

export const selectFeaturedSongs = (state) => state.featuredSongs;
export const selectFetchFeaturedSongs = (state) => state.fetchFeaturedSongs;

export default useSongStore;
