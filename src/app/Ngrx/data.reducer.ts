import {
  createFeatureSelector,
  createReducer,
  createSelector,
  on,
} from '@ngrx/store';
import * as CryptoJS from 'crypto-js';
import { addUserData, removeUserData, setSearchState, toggleLoader, updateUserData } from './data.action';
const secureKey =
  '99812f7e870613bf1b2b8b5803e5483094900d86f36b0cb46890345f36d65ac0';
const encryptData = (data: any): string => {
  const encryptedData = CryptoJS.AES.encrypt(
    JSON.stringify(data),
    secureKey,
  ).toString();
  return encryptedData;
};
const decryptData = (encryptedData: any): any => {
  const decryptedData = CryptoJS.AES.decrypt(encryptedData, secureKey).toString(
    CryptoJS.enc.Utf8,
  );
  return JSON.parse(decryptedData);
};

export interface UserState {
  user: any;
}
export const initialStateUser: UserState = {
  user: localStorage.getItem('userDetails')
    ? decryptData(localStorage.getItem('userDetails'))
    : null,
};
export const userReducer = createReducer(
  initialStateUser,
  on(addUserData, updateUserData, (state, { user }) => {
    const updatedUser = { ...state.user, ...user };
    const encryptedUser = encryptData(updatedUser);
    localStorage.setItem('userDetails', encryptedUser);
    return { ...state, user: updatedUser };
  }),
  on(removeUserData, (state) => {
    localStorage.removeItem('userDetails');
    return { ...state, user: null };
  }),
);
export interface LoaderState {
  loader: boolean;
}
const initialStateLoader: LoaderState = {
  loader: false,
};

export const LoaderReducer = createReducer(
  initialStateLoader,
  on(toggleLoader, (state, { show }) => {
    return { ...state, loader: show };
  }),
);

export interface SearchState {
  search: boolean;
}
const initialStateSearch: SearchState = {
  search: false,
};

export const searchStateReducer = createReducer(
  initialStateSearch,
  on(setSearchState, (state, { search }) => {
    return { ...state, search: search };
  }),
);

// Selectors for user state
export const selectUserState = createFeatureSelector<UserState>('user');
export const selectUser = createSelector(
  selectUserState,
  (state) => state.user,
);


// Selectors for loader state
export const selectLoaderState = createFeatureSelector<LoaderState>('loader');
export const selectLoader = createSelector(
  selectLoaderState,
  (state) => state.loader,
);
// Selectors for set search state
export const selectSearchState = createFeatureSelector<SearchState>('search');
export const selectSearch = createSelector(
  selectSearchState,
  (state) => state.search,
);
