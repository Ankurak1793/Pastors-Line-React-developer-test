import React, { useState, useEffect } from 'react';
import { Link, useHistory, useLocation } from 'react-router-dom';
import { Scrollbars } from 'react-custom-scrollbars';
import { useSelector, useDispatch, connect } from 'react-redux';
import {
  closeModalA, openModalA, fetchContacts,
  setContactDetail,
  openModalB, closeModalB, updateCurrentPage, OnlyEvenCheck, openModalC
} from '../redux/actions';
import SearchComponent from './SearchComponent';

const ModalA = ({ modalAOpen, closeModalA, modalBOpen, contactsA,
  currentPage, updateCurrentPage }) => {
  const dispatch = useDispatch();
  let history = useHistory();
  const location = useLocation();
  // if (location.pathname === "/modalA") {
  //   dispatch(openModalA())
  // }
  const contactsData = useSelector(fetchContacts);
  const [onlyEven, setOnlyEven] = useState(false);
  const [loading, setLoading] = useState(false);

  const [searchTerm, setSearchTerm] = useState('');
  // eslint-disable-next-line
  const [contacts, setContacts] = useState([]);
  const [filteredContacts, setFilteredContacts] = useState([...contactsA]);

  useEffect(() => {
    if (contactsData.contacts_ids) {
      const contactList = contactsData.contacts_ids.map(id => contactsData.contacts[id]);
      setContacts(contactList);
      // setFilteredContacts(contactsA);
    }
  }, [contactsData, contactsA]);

  useEffect(() => {
    setFilteredContacts(contactsA);
  }, [contactsA])

  const handleLoadNextPage = () => {
    // Load next page of data
    // After loading, update the current page
    const nextPage = currentPage + 1;
    fetchContacts(171, null, nextPage, null, null)
    updateCurrentPage(nextPage);
  };

  const handleScroll = (values) => {
    const { scrollTop, scrollHeight, clientHeight } = values;
    if (scrollHeight - (scrollTop + clientHeight) < 10 && !loading) {
      // Load next page of data here
      setLoading(true);

      // Simulating a data fetch, replace this with your actual API call
      setTimeout(() => {
        setLoading(false);
        // Add logic to load next page of data
        handleLoadNextPage();
      }, 1000);
    }
  };

  const handleClose = () => {
    dispatch(closeModalA());
    dispatch(closeModalB());
    ResetValues();
    history.push('/');
  };

  const handleSearch = async (e) => {
    setSearchTerm(e.target.value);
    const searchResults = await fetchContacts(null, 'name', e.target.value, null);
    // This will show the search searchResults in the console
    console.log('searchResults:::', searchResults);
  };

  const ResetValues = () => {
    setSearchTerm('');
    setOnlyEven(false);
  };

  const handleAllContacts = () => {
    if (!modalAOpen) {
      dispatch(closeModalB())
      dispatch(openModalA())
      ResetValues()
    };
    // fetch all contacts data
  };
  const handleUSContacts = () => {
    if (!modalBOpen) {
      dispatch(closeModalA())
      dispatch(openModalB())
      ResetValues()
    };
    // fetch US contacts data
  };

  const handleOnlyEvenChange = (e) => {
    setOnlyEven(e.target.checked);
    if (e.target.checked) { // checked
      const evenContacts = contactsA.map(item => {
        const contacts = {};
        for (const key in item.contacts) {
          if (key % 2 === 0) {
            contacts[key] = item.contacts[key];
          }
        }
        return { ...item, contacts, contacts_ids: item.contacts_ids.filter((id) => id % 2 === 0) };
      });;
      setFilteredContacts(evenContacts);
      dispatch(OnlyEvenCheck(e.target.checked))
    } else { // unchecked
      setFilteredContacts(contactsA);
      dispatch(OnlyEvenCheck(e.target.checked))
    }
  };

  return (


    <div className={`modal ${modalAOpen ? 'show fade' : ''}`} id="modalA" tabIndex="-1"
      role="dialog" aria-labelledby="exampleModalLabelA"
    >
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="exampleModalLabel">Modal A</h5>
            <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={handleClose}>
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div className="modal-body">
            <div className="d-flex align-items-center mb-3">
              <SearchComponent />
              {/* <input
                type="text"
                className="form-control"
                placeholder="Search Contacts"
                value={searchTerm}
                onChange={handleSearch}
              /> */}
              <Link to="/modalA" onClick={handleAllContacts}>
                <button
                  className="all-contacts m-2"
                  id="buttonA"> All Contacts</button>
              </Link>
              <Link to="/modalB" onClick={handleUSContacts}>
                <button
                  className="us-contacts m-2"
                  id="buttonA"> US Contacts</button>
              </Link>
            </div>
            <Scrollbars autoHide onScrollFrame={handleScroll} style={{ height: '300px' }}>
              <div>Listing:</div>
              <ul className="list-group">
                {filteredContacts && Object.keys(filteredContacts).length !== 0 &&
                  filteredContacts[0].contacts_ids.map((contact, index) => {
                    let key = filteredContacts[0].contacts_ids[index]
                    let contacts = filteredContacts[0].contacts;
                    return (
                      <li key={contacts.id} className="list-group-item"
                        onClick={() => {
                          dispatch(openModalC());
                          dispatch(setContactDetail(contacts[key]))
                        }}
                      >
                        ID: {contacts[key].id} <br />
                        Name : {contacts[key].first_name} {contacts[key].last_name}
                        <br />
                        Mobile: {contacts[key].phone_number}
                      </li>
                    )
                  })}
              </ul>
            </Scrollbars>
          </div>
          <div className="modal-footer">
            <div className='d-flex align-items-center'>
              <input
                type="checkbox"
                className="form-check-input"
                id="onlyEvenCheckbox"
                checked={onlyEven}
                onChange={handleOnlyEvenChange}
              />
              <label className="form-check-label" htmlFor="onlyEvenCheckbox">
                Only even
              </label>
            </div>
            <div >
              <button type="button" className="close-btn"
                data-dismiss="modal" onClick={handleClose}>
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  // console.log('ModalA',state);
  return {
    modalAOpen: state.modalAOpen,
    modalBOpen: state.modalBOpen,
    contactsA: state.contactsA,
    currentPage: state.currentPage,
    contact: state.contact
  }
};

const mapDispatchToProps = (dispatch) => ({
  openModalA: () => dispatch(openModalA()),
  openModalB: () => dispatch(openModalB()),
  openModalC: () => dispatch(openModalC()),
  closeModalA: () => dispatch(closeModalA()),
  closeModalB: () => dispatch(closeModalB()),
  OnlyEvenCheck: (flag) => dispatch(OnlyEvenCheck(flag)),
  setContactDetail: (contact) => dispatch(setContactDetail(contact)),
  updateCurrentPage: (page) => dispatch(updateCurrentPage(page)),
});

export default connect(mapStateToProps, mapDispatchToProps)((ModalA));
