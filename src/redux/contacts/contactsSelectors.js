import { createSelector } from '@reduxjs/toolkit';
import { selectFilter } from '../filter/filterSelectors';

export const selectContacts = (state) => state.contacts.items;
export const selectContactsIsLoading = (state) => state.contacts.isLoading;
export const selectContactsError = (state) => state.contacts.error;

export const selectFilteredContacts = createSelector(
  [selectContacts, selectFilter],
  (contacts, filter) => {
    const normalizedFilter = filter.toLowerCase().trim();
    return contacts.filter((contact) =>
      contact.name.toLowerCase().includes(normalizedFilter)
    );
  }
);
