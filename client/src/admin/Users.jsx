import { Col, Container, Row } from "reactstrap";
import { toast } from "react-toastify";
import axios from "axios";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import useGetUsers from "../hooks/useGetUsers";
import Skeleton from "react-loading-skeleton";

const Users = () => {
  const { loading, fetchUsers } = useGetUsers();
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchUsers("").then((data) => setData(data));
  }, []);

  const handleDelete = async (id) => {
    const loadingToast = toast.loading("Loading...");
    try {
      await axios.delete(`/api/user/${id}`);

      setData((prev) => prev.filter((user) => user._id !== id));
      toast.success("User Deleted successfully");
    } catch (error) {
      console.log(error);
      toast.error("Something went wroung");
    } finally {
      toast.dismiss(loadingToast);
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
              [...Array(7)].map((_, idx) => (
                <div
                  key={idx}
                  className=" d-flex justify-content-between  align-items-center mb-3"
                >
                  <Skeleton width={60} height={60} circle className=" mx-5 " />
                  <Skeleton width={200} />
                  <Skeleton width={200} />
                  <Skeleton width={80} className=" mx-5 " />
                </div>
              ))
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
                              alt={user.username}
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
