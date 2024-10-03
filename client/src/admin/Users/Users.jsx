import { Col, Container, Row } from "reactstrap";
import axios from "axios";
import Skeleton from "react-loading-skeleton";
import Helmet from "../../Components/Helmet/Helmet";
import UsersTable from "./UsersTable";
import { useQuery } from "react-query";
import { useState } from "react";
import Pagination from "../../Components/UI/Pagination";

const fetchUsers = async ({ queryKey }) => {
  const limit = 10;
  const [, currentPage] = queryKey;
  const { data } = await axios.get(`/user?page=${currentPage}&limit=${limit}`);

  return data.data;
};

const Users = () => {
  const [currentPage, setCurrentPage] = useState(1);

  const { data, isLoading, isError, error } = useQuery(
    ["users", currentPage],
    fetchUsers
  );

  const totalPages = data?.totalPages || 1;
  const totalUsers = data?.totalUsers || 0;

  return (
    <Helmet title="Users">
      <section>
        <Container>
          <Row>
            <Col lg="12" md="12" sm="12">
              <h4 className="fw-bold">Users({totalUsers})</h4>
            </Col>

            <Col lg="12" md="12" sm="12" className="text-center pt-5">
              {isLoading &&
                [...Array(7)].map((_, idx) => (
                  <div
                    key={idx}
                    className=" d-flex justify-content-between  align-items-center mb-3"
                  >
                    <Skeleton
                      width={60}
                      height={60}
                      circle
                      className=" mx-5 "
                    />
                    <Skeleton width={200} />
                    <Skeleton width={200} />
                    <Skeleton width={80} className=" mx-5 " />
                  </div>
                ))}
              {!isLoading && <UsersTable users={data?.users} />}

              {!isLoading && (
                <Pagination
                  currentPage={currentPage}
                  setCurrentPage={setCurrentPage}
                  totalPages={totalPages}
                />
              )}
            </Col>
          </Row>
        </Container>
      </section>
    </Helmet>
  );
};

export default Users;
