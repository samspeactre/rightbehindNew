import { createAction, props } from '@ngrx/store';

export const addUserData = createAction(
  '[User] Add User Data',
  props<{ user: any }>(),
);
export const updateUserData = createAction(
  '[User] Update User Data',
  props<{ user: any }>(),
);
export const removeUserData = createAction('[User] Remove User Data');

export const addRental = createAction(
  '[Rental] Add Rental',
  props<{ data: any }>(),
);
export const addSell = createAction(
  '[Sell] Add Sell',
  props<{ data: any }>(),
);