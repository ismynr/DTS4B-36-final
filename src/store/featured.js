import axios from 'axios';
import produce from 'immer';
import create from 'zustand';
import { persist } from 'zustand/middleware';

const initialChart = "";
const initialNewRelease = "";
const initialFeaturedPlaylists = "";
const BASE_URL = 'https://jio-saavn-api-unof.herokuapp.com/';

const useFeaturedStore = create(
  persist(
    (set) => ({
      chart: initialChart,
      newRelease: initialNewRelease,
      featuredPlaylists: initialFeaturedPlaylists,
      fetchChart: async () => {
        const { data: axiosData} = await axios.get(`${BASE_URL}featured/?query=chart`);
        set(produce((state) => {
          state.chart = axiosData;
        }));
      },
      fetchNewRelease: async () => {
        const { data: axiosData} = await axios.get(`${BASE_URL}featured/?query=new-release`);
        set(produce((state) => {
          state.newRelease = axiosData;
        }));
      },
      fetchFeaturedPlaylists: async () => {
        const { data: axiosData} = await axios.get(`${BASE_URL}featured/?query=featured-playlists`);
        set(produce((state) => {
          state.featuredPlaylists = axiosData;
        }));
      },
    })
  )
);

export const selectChart = (state) => state.chart;
export const selectFetchChart = (state) => state.fetchChart;

export const selectNewRelease = (state) => state.newRelease;
export const selectFetchNewRelease = (state) => state.fetchNewRelease;

export const selectFeaturedPlaylist = (state) => state.featuredPlaylists;
export const selectFetchFeaturedPlaylist = (state) => state.fetchFeaturedPlaylists;

export default useFeaturedStore;
