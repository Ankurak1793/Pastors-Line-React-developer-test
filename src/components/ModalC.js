import React from 'react';
import { connect, useDispatch } from 'react-redux';
import { closeModalC, openModalC } from '../redux/actions';
const ModalC = ({ closeModalC, modalCOpen, contact }) => {
  const dispatch = useDispatch();

  const handleClose = () => {
    dispatch(closeModalC());
  };

  return (
    <div className={`modal ${modalCOpen ? 'show fade' : ''}`} id="modalC" tabIndex="-1"
      role="dialog" aria-labelledby="exampleModalLabelC"
    >
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="exampleModalLabel">Modal C</h5>
            <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={handleClose}>
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div className="modal-body">
            <div>Contact Details:</div>
            <>
              <div>Name: {contact.first_name}</div>
              <div>Phone: {contact.phone_number}</div>
            </>
          </div>
          <div className="modal-footer">
            <div >
              <button type="button" className="btn btn-secondary"
                data-dismiss="modal" onClick={handleClose}>
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
};

const mapStateToProps = (state) => {
  return {
    modalCOpen: state.modalCOpen,
    contact: state.contact
  }
};

const mapDispatchToProps = (dispatch) => ({
  openModalC: () => dispatch(openModalC()),
  closeModalC: () => dispatch(closeModalC()),

});

export default connect(mapStateToProps, mapDispatchToProps)(ModalC);
