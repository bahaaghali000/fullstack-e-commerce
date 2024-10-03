import { motion } from "framer-motion";
import React, { useState } from "react";
import useDeleteUser from "../../hooks/useDeleteUser";
import Model from "../../Components/UI/Model";

const DeleteUser = ({ userId }) => {
  const [showModel, setShowModel] = useState(false);
  const [userToDelete, setUserToDelete] = useState("");

  const { deleteUser } = useDeleteUser();

  const handleDelete = (id) => {
    setUserToDelete(id);
    handleOpenModal();
  };

  const handleOpenModal = () => setShowModel(true);

  const handleCloseModal = () => {
    setShowModel(false);
    setUserToDelete("");
  };

  const handleSubmit = async () => {
    if (userToDelete) {
      await deleteUser(userToDelete);
      handleCloseModal();
    }
  };

  return (
    <>
      <motion.button
        onClick={() => handleDelete(userId)}
        className="btn btn-danger"
        whileTap={{ scale: 1.2 }}
      >
        Delete
      </motion.button>

      <Model
        handleClose={handleCloseModal}
        showModel={showModel}
        handleSubmit={handleSubmit}
        modalTitle="Delete User"
        cancelBtnText="Cancel"
        sumbitBtnText="Delete"
      >
        <h4>Are you sure you wanna delete this user?</h4>
      </Model>
    </>
  );
};

export default DeleteUser;
