import { useState } from 'react';
import Modal from 'react-modal';

Modal.setAppElement('#root');

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
};

export const CalendarModal = () => {
  const [isOpen, setIsOpen] = useState(true);

  const onShowModal = () => {
    setIsOpen(true);
  }

  const onCloseModal = () => {
    setIsOpen(false);
  }

  return (
    <Modal isOpen={isOpen}
    onRequestClose={ onCloseModal}
    style={customStyles}
    className="modal"
    overlayClassName="modal-fondo"
    closeTimeoutMS={ 200 }>
      <h1>PROBANDO EL MODAL</h1>
      <p> Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolor consequuntur dicta, magni totam modi adipisci placeat quisquam a nostrum in quam odit tenetur at illum quo eius, libero ut tempore.</p>
    </Modal>
  )
}
