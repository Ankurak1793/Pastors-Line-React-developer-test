import axios from 'axios';
import { contactsData } from "./dummyResponse.js";

export const fetchContacts = (companyId, query, page, countryId) => {
  return async (dispatch) => {
    try {
      const response = await axios.get('https://api.dev.pastorsline.com/api/contacts.json', {
        headers: {
          Authorization: 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOjU2MCwiZXhwIjoxNzI2NTY3MTc5LCJ0eXBlIjoiYWNjZXNzIiwidGltZXN0YW1wIjoxNjk1MDMxMTc5fQ.0y7NtuVDCvcPvmWbliMs1q02sov2oFC6u2Hi6H4A2W4',
        },
        params: {
          companyId: companyId || 171,
          query,
          page,
          countryId,
        },
      });
      console.log('API response::::', response.data)
      dispatch({
        type: 'FETCH_CONTACTS_SUCCESS',
        payload: response.data.total === 0 ? contactsData : response.data,
      });
    } catch (error) {
      dispatch({
        type: 'FETCH_CONTACTS_FAILURE',
        payload: error.message,
      });
    }
  };
};

export const fetchUSContacts = (companyId, query, page, countryId) => {
  return async (dispatch) => {
    try {
      const response = await axios.get('https://api.dev.pastorsline.com/api/contacts.json', {
        headers: {
          Authorization: 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOjU2MCwiZXhwIjoxNzI2NTY3MTc5LCJ0eXBlIjoiYWNjZXNzIiwidGltZXN0YW1wIjoxNjk1MDMxMTc5fQ.0y7NtuVDCvcPvmWbliMs1q02sov2oFC6u2Hi6H4A2W4',
        },
        params: {
          companyId: companyId || 171,
          query,
          page,
          countryId: countryId, // The US has a 226 ID.
        },
      });
      console.log('API response::::', response.data);
      dispatch({
        type: 'FETCH_CONTACTS_SUCCESS',
        payload: response.data.total === 0 ? contactsData : response.data,
      });
    } catch (error) {
      dispatch({
        type: 'FETCH_CONTACTS_FAILURE',
        payload: error.message,
      });
    }
  };
};

export const openModalA = () => ({ type: 'OPEN_MODAL_A' });
export const openModalB = () => ({ type: 'OPEN_MODAL_B' });
export const openModalC = (contact) => ({ type: 'OPEN_MODAL_C', payload: contact });
export const closeModalA = () => ({ type: 'CLOSE_MODAL_A' });
export const closeModalB = () => ({ type: 'CLOSE_MODAL_B' });
export const closeModalC = () => ({ type: 'CLOSE_MODAL_C' });
export const OnlyEvenCheck = (flag) => ({ type: 'ONLY_EVEN_CHECKED', payload: flag });
export const setContactDetail = (contact) => ({ type: 'SET_CONTACT_DETAILS', payload: contact });

export const updateCurrentPage = (page) => {
  return {
    type: 'UPDATE_CURRENT_PAGE',
    payload: page,
  };
};
export const setSearchQuery = (query) => {
  console.log("True");
  return {
    type: 'SET_SEARCH_QUERY',
    payload: query
  };
};

export const setSearchResults = (results) => {
  return {
    type: 'SET_SEARCH_RESULTS',
    payload: results
  };
};

export const loadMoreContacts = () => {
  return {
    type: 'LOAD_MORE_CONTACTS'
  };
};

