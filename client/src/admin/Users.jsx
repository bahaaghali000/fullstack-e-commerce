import { Col, Container, Row } from "reactstrap";
import { toast } from "react-toastify";
import axios from "axios";
import useAuth from "../hooks/useAuth";
import useGetData from "../hooks/useGetData";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const Users = () => {
  const { currentUser, loading: isLoading } = useAuth();
  const { data: users, loading } = useGetData(
    "https://multimart-ecommerce-hr2c.onrender.com//api/user/all-users"
  );

  const [data, setData] = useState(users);

  useEffect(() => {
    setData(
      users.sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt))
    );
  }, [users]);

  const handleDelete = async (id) => {
    console.log(id);
    try {
      await axios.delete(
        `https://multimart-ecommerce-hr2c.onrender.com//api/user/${id}`,
        {
          headers: {
            Authorization: "Bearer " + currentUser.token,
          },
        }
      );

      toast.success("User Deleted successfully");
      window.location.reload();

      // check if i the user whoose deleted remove from localStorage
      currentUser._id === id ? localStorage.removeItem("multiUser") : null;
    } catch (error) {
      toast.error("Something went wroung");
    }
  };

  return (
    <section>
      <Container>
        <Row>
          <Col lg="12" md="12" sm="12">
            <h4 className="fw-bold">Users</h4>
          </Col>
          <Col lg="12" md="12" sm="6" className="text-center pt-5">
            {loading ? (
              <h2 className="text-center">Loading....</h2>
            ) : (
              <>
                <table className="table">
                  <thead>
                    <tr>
                      <th>Image</th>
                      <th>Username</th>
                      <th className="user__email">Email</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.length > 0 &&
                      data.map((user) => (
                        <tr key={user._id}>
                          <td>
                            <img
                              className="users__img"
                              src={user.profilePic}
                              alt=""
                            />
                          </td>
                          <td>{user.username}</td>
                          <td className="user__email ellipsis">{user.email}</td>
                          <td>
                            <motion.button
                              onClick={() => handleDelete(user._id)}
                              className="btn btn-danger"
                              whileTap={{ scale: 1.2 }}
                            >
                              Delete
                            </motion.button>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </>
            )}
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default Users;
