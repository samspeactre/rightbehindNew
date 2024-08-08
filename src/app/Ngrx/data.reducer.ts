import {
  createFeatureSelector,
  createReducer,
  createSelector,
  on,
} from '@ngrx/store';
import * as CryptoJS from 'crypto-js';
import {
  addCurrenLocation,
  addRental,
  addSell,
  addUserData,
  removeUserData,
  updateUserData,
} from './data.action';

const secureKey =
  '99812f7e870613bf1b2b8b5803e5483094900d86f36b0cb46890345f36d65ac0';

const encryptData = (data: any): string => {
  const encryptedData = CryptoJS.AES.encrypt(
    JSON.stringify(data),
    secureKey
  ).toString();
  return encryptedData;
};

const decryptData = (encryptedData: any): any => {
  const decryptedData = CryptoJS.AES.decrypt(encryptedData, secureKey).toString(
    CryptoJS.enc.Utf8
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
  })
);

export interface RentalState {
  rent: any;
}

const initialStateRental: RentalState = {
  rent: null,
};

export const RentalReducer = createReducer(
  initialStateRental,
  on(addRental, (state, { data }) => {
    return { ...state, rent: data };
  })
);

export interface SellState {
  rent: any;
}

const initialStateSell: SellState = {
  rent: null,
};

export const SellReducer = createReducer(
  initialStateSell,
  on(addSell, (state, { data }) => {
    return { ...state, rent: data };
  })
);

// location
export interface LocationState {
  location: any;
}

const initialStateLocation: LocationState = {
  location: null,
};

export const LocationReducer = createReducer(
  initialStateLocation,
  on(addCurrenLocation, (state, { data }) => {
    return { ...state, location: data };
  })
);

// Selectors for user state
export const selectUserState = createFeatureSelector<UserState>('user');
export const selectUser = createSelector(
  selectUserState,
  (state) => state.user
);

// Selectors for loader state
export const selectRentalState = createFeatureSelector<RentalState>('rent');
export const selectRental = createSelector(
  selectRentalState,
  (state) => state.rent
);

// Selectors for loader state
export const selectSellState = createFeatureSelector<SellState>('sell');
export const selectSell = createSelector(
  selectSellState,
  (state) => state.rent
);

// Selectors for location state
export const selectLocationState =
  createFeatureSelector<LocationState>('location');
export const selectLocation = createSelector(
  selectLocationState,
  (state) => state.location
);
