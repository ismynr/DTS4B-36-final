import axios from 'axios';
import produce from 'immer';
import create from 'zustand';
import { persist } from 'zustand/middleware';

const initialLogin = {};
const BASE_URL = 'https://open-music-apii.herokuapp.com/';

const useAuthStore = create(
  persist(
    (set) => ({
      login: initialLogin,
      fetchLogin: async (username, password) => {
        try {
            const { data: axiosData } = await axios.post(`${BASE_URL}authentications`, {
                username,
                password
            });
            
            set(produce((state) => {
              state.login = axiosData;
            }));
        } catch (error) {
            if (error.response) {
                set(produce((state) => {
                    state.login = {
                        "error": true,
                        "response": error
                    };
                    throw new Error('error');
                }));
            }
            
        }
      },
    })
  )
);

export const selectLogin = (state) => state.login;
export const selectFetchLogin = (state) => state.fetchLogin;

export default useAuthStore;
