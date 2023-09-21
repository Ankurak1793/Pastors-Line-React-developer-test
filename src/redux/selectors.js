import { createSelector } from 'reselect';

const selectModalState = state => state;

export const selectContactsA = createSelector(
  [selectModalState],
  modalState => modalState.contactsA
);

export const selectContactsB = createSelector(
  [selectModalState],
  modalState => modalState.contactsB
);