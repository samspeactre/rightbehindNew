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

export const toggleLoader = createAction(
  '[Loader] Toggle Loader',
  props<{ show: boolean }>(),
);export const collectionSearching = createAction(
  '[Searching] Collection Searching',
  props<{ searching: boolean }>(),
);
export const setCategoryName = createAction(
  '[CategoryName] Set Category Name',
  props<{ name: string }>(),
);
export const setSearchState = createAction(
  '[searchState] Set Search State',
  props<{ search: boolean }>(),
);
export const setPopupIdState = createAction(
  '[searchState] Set PopUp Id State',
  props<{ id: number }>(),
);
export const toggleSideBar = createAction(
  '[SideBar] Toggle Side Bar',
  props<{ open: boolean }>(),
);