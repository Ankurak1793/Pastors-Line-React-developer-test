import React, { useState, useEffect } from 'react';
import { Link, useHistory, useLocation } from 'react-router-dom';
import { Scrollbars } from 'react-custom-scrollbars';
import { useSelector, useDispatch, connect } from 'react-redux';
import {
  closeModalB, openModalB, fetchContacts, OnlyEvenCheck,
  openModalC,
  openModalA, closeModalA, setContactDetail, updateCurrentPage
} from '../redux/actions';
import { selectContactsB } from '../redux/selectors';
import SearchComponent from './SearchComponent';


const ModalB = ({ modalBOpen, closeModalB, modalAOpen, currentPage, updateCurrentPage }) => {
  const [loading, setLoading] = useState(false);
  const location = useLocation();


  const dispatch = useDispatch();
  let history = useHistory();


  const contactsData = useSelector(selectContactsB);
  const [searchTerm, setSearchTerm] = useState('');
  const [contacts, setContacts] = useState([]);
  const [onlyEven, setOnlyEven] = useState(false);


  if (location.pathname === "/modalB") {
    dispatch(openModalB())
  }

  useEffect(() => {
    if (contactsData.contacts_ids) {
      const contactList = contactsData.contacts_ids.map(id => contactsData.contacts[id]);
      setContacts(contactList);
    }
  }, [contactsData]);

  useEffect(() => {
    fetchContacts(171, '', 1, '')
  }, [])

  const handleClose = () => {
    dispatch(closeModalA());
    dispatch(closeModalB());
    history.push('/');
    ResetValues()
  };

  const filteredContacts = contacts.filter(contact => {
    return contact.first_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      contact.last_name.toLowerCase().includes(searchTerm.toLowerCase());
  });

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    // call API not working so commented
    // fetchContacts(171, 'name', 1, e.target.value)
  };
  const ResetValues = () => {
    setSearchTerm('');
    setOnlyEven(false);
  };



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
      // const evenContacts = contacts.map(item => {
      //   const contacts = {};
      //   for (const key in item.contacts) {
      //     if (key % 2 === 0) {
      //       contacts[key] = item.contacts[key];
      //     }
      //   }
      //   return { ...item, contacts, contacts_ids: item.contacts_ids.filter((id) => id % 2 === 0) };
      // });
      // setFilteredContacts(evenContacts);
      dispatch(OnlyEvenCheck(e.target.checked))
    } else { // unchecked
      // setFilteredContacts(contacts);
      dispatch(OnlyEvenCheck(e.target.checked))
    }
  };

  return (


    <div className={`modal ${modalBOpen ? 'show fade' : ''}`} id="modalB" tabIndex="-1"
      role="dialog" aria-labelledby="exampleModalLabelB"
    >
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="exampleModalLabel">Modal B</h5>
            <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={handleClose}>
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div className="modal-body">
            <div className="d-flex align-items-center mb-3">
              {/* <input
                type="text"
                className="form-control"
                placeholder="Search Contacts"
                value={searchTerm}
                onChange={handleSearch}
              /> */}
              <SearchComponent />
              <Link to="/modalA" onClick={handleAllContacts}>
                <button
                  className="all-contacts m-2"
                  color='#46139f'
                  id="buttonA"> All Contacts</button>
              </Link>
              <Link to="/modalB" onClick={handleUSContacts}>
                <button
                  className="us-contacts m-2"
                  id="buttonA"> US Contacts</button>
              </Link>
            </div>
            <Scrollbars autoHide onScrollFrame={handleScroll} style={{ height: '300px' }}>
              <div>Listing</div>
              <ul className="list-group">
                {filteredContacts.map(contact => (
                  <li key={contact.id} className="list-group-item"
                    onClick={() => {
                      dispatch(openModalC())
                      dispatch(setContactDetail(contact))
                    }}>
                    ID :{contact.id} <br />
                    Name :{contact.first_name} {contact.last_name} <br />
                    Mobile :{contact.mobile_number}
                  </li>
                ))}
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
              <button type="button" className="close-btn" data-dismiss="modal"
                onClick={handleClose}>
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </div >
  );
};

const mapStateToProps = (state) => {
  console.log(state)
  return {
    modalBOpen: state.modalBOpen,
    modalAOpen: state.modalAOpen,
    contact: state.contact,
    currentPage: state.currentPage,
  }
};

const mapDispatchToProps = (dispatch) => ({
  openModalA: () => dispatch(openModalA()),
  openModalC: () => dispatch(openModalC()),
  openModalB: () => dispatch(openModalB()),
  closeModalB: () => dispatch(closeModalB()),
  closeModalA: () => dispatch(closeModalA()),
  setContactDetail: (contact) => dispatch(setContactDetail(contact)),
  updateCurrentPage: (page) => dispatch(updateCurrentPage(page)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ModalB);
