import { contactsB, contact } from "./dummyResponse.js";

const initialState = {
  currentPage: 1,
  onlyEven: false,
  modalAOpen: false,
  modalBOpen: false,
  modalCOpen: false,
  contactsA: [],
  contactsB: contactsB,
  contact: contact,
  error: null,
  query: '',
  page: 1,
  searchResults: []
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'FETCH_CONTACTS_SUCCESS':
      return {
        ...state,
        contactsA: action.payload,
        error: null,
      };
    case 'FETCH_CONTACTS_FAILURE':
      return {
        ...state,
        error: action.payload,
      };
    case 'OPEN_MODAL_A':
      return { ...state, modalAOpen: true };
    case 'OPEN_MODAL_B':
      return { ...state, modalBOpen: true };
    case 'OPEN_MODAL_C':
      return { ...state, modalCOpen: true };
    case 'CLOSE_MODAL_A':
      return { ...state, modalAOpen: false };
    case 'CLOSE_MODAL_B':
      return { ...state, modalBOpen: false };
    case 'CLOSE_MODAL_C':
      return { ...state, modalCOpen: false };
    case 'UPDATE_CURRENT_PAGE':
      return {
        ...state,
        currentPage: action.payload,
      }
    case 'SET_CONTACT_DETAILS': {
      return {
        ...state,
        contact: action.payload,
      }
    }
    case 'SET_SEARCH_QUERY':
      return {
        ...state,
        query: action.payload
      };
    case 'SET_SEARCH_RESULTS':
      return {
        ...state,
        results: action.payload
      };
    case 'ONLY_EVEN_CHECKED':
      return {
        ...state,
        onlyEven: action.payload,
      }
    case 'LOAD_MORE_CONTACTS':
      return {
        ...state,
        page: state.page + 1
      };
    // Add cases for loading next pages, toggling checkboxes, etc.
    default:
      return state;
  }
};

export default reducer;
