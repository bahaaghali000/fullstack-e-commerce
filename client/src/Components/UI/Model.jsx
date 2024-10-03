import { Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";

const Model = (props) => {
  const {
    handleClose,
    showModel,
    handleSubmit,
    modalTitle,
    cancelBtnText,
    sumbitBtnText,
    children,
    ...restProps
  } = props;

  return (
    <Modal
      isOpen={showModel}
      onHide={handleClose}
      backdrop="static"
      toggle={handleClose}
      {...restProps}
    >
      <ModalHeader toggle={handleClose}>{modalTitle}</ModalHeader>
      <ModalBody>{children}</ModalBody>
      <ModalFooter>
        <button className="buy__btn" onClick={handleClose}>
          {cancelBtnText}
        </button>
        <button
          className="buy__btn outline__btn"
          variant="primary"
          onClick={handleSubmit}
        >
          {sumbitBtnText}
        </button>
      </ModalFooter>
    </Modal>
  );
};

export default Model;
