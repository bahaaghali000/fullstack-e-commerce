import "bootstrap/dist/css/bootstrap.css";
import { Button, Modal } from "react-bootstrap";

const Model = ({
  handleClose,
  showModel,
  handleSubmit,
  modalTitle,
  modalDescription,
  cancelBtn,
  sumbitBtn,
}) => {
  return (
    <Modal
      show={showModel}
      onHide={handleClose}
      backdrop="static"
      keyboard={false}
    >
      <Modal.Header closeButton>
        <Modal.Title>{modalTitle}</Modal.Title>
      </Modal.Header>
      <Modal.Body>{modalDescription}</Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          {cancelBtn}
        </Button>
        <Button variant="primary" onClick={handleSubmit}>
          {sumbitBtn}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default Model;
