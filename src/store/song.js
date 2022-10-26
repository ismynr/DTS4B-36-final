import axios from 'axios';
import produce from 'immer';
import create from 'zustand';
import { persist } from 'zustand/middleware';

const initialLyrics = "";
const initialFeaturedSongs = {};
const initialSearchSongs = [];
const BASE_URL = 'https://jio-saavn-api-unof.herokuapp.com/';

const useSongStore = create(
  persist(
    (set) => ({
      lyrics: initialLyrics,
      featuredSongs: initialFeaturedSongs,
      searchSongs: initialSearchSongs,
      fetchFeaturedSongs: async (name, id) => {
        const { data: axiosData } = await axios.get(`${BASE_URL}result/?query=https://www.jiosaavn.com/featured/${name}/${id}`);
        console.log(axiosData);

        set(produce((state) => {
          state.featuredSongs = axiosData;
        }));
      },
      fetchLyricSongs: async (name, id) => {
        const { data: axiosData } = await axios.get(`${BASE_URL}song/?query=https://www.jiosaavn.com/song/${name}/${id}&lyrics=true`);

        set(produce((state) => {
          state.lyrics = axiosData;
        }));
      },
      fetchSearchSongs: async (query) => {
        if(!query) {
          set(produce((state) => {
            state.searchSongs = [];
          }));
        } else {
          const { data: axiosData } = await axios.get(`${BASE_URL}song/?query=${query}`);

          set(produce((state) => {
            state.searchSongs = axiosData;
          }));
        }
      },
    })
  )
);

export const selectFeaturedSongs = (state) => state.featuredSongs;
export const selectFetchFeaturedSongs = (state) => state.fetchFeaturedSongs;

export const selectLyricSongs = (state) => state.lyrics;
export const selectFetchLyricSongs = (state) => state.fetchLyricSongs;

export const selectSearchSongs = (state) => state.searchSongs;
export const selectFetchSearchSongs = (state) => state.fetchSearchSongs;

export default useSongStore;
