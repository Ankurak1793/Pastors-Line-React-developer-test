import React from 'react';
import { useDispatch, connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchContacts, fetchUSContacts, openModalA, openModalB } from '../redux/actions';

const MainScreen = () => {
  const dispatch = useDispatch();

  const handleClickA = () => {
    dispatch(openModalA());
    dispatch(fetchContacts(171, '', 1, ''))
  };
  const handleClickB = () => {
    dispatch(openModalB());
    dispatch(fetchUSContacts(171, '', 1, 226))
  };

  return (
    <div className="container text-center mt-5">
      <Link to="/modalA" onClick={handleClickA}>
        <button
          className="all-contacts m-2"
          id="buttonA">Button A</button>
      </Link>
      <Link to="/modalB" onClick={handleClickB}>
        <button className="us-contacts m-2"
          id="buttonB">Button B</button>
      </Link>
      {/* <button className="btn btn-primary m-2" id="buttonA" onClick={handleClickA}>
        Button A
      </button>
      <button className="btn btn-secondary m-2" id="buttonB" onClick={handleClickB}>
        Button B
      </button> */}
    </div>
  );
};


const mapStateToProps = (state) => {
  return {
    modalAOpen: state.modalAOpen,
    modalBOpen: state.modalBOpen,
  }
};

const mapDispatchToProps = (dispatch) => ({
  openModalA: () => dispatch(openModalA()),
  openModalB: () => dispatch(openModalB()),
  fetchContacts: () => dispatch(fetchContacts())
});

export default connect(mapStateToProps, mapDispatchToProps)(MainScreen);

