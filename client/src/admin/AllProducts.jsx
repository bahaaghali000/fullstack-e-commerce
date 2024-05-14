import { Container, Row, Col } from "reactstrap";
import { useEffect, useState } from "react";
import "../styles/admin-nav.css";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import useFilterProducts from "../hooks/useFilterProducts";
import Skeleton from "react-loading-skeleton";

const AllProducts = ({ searchValue }) => {
  const { fetchProducts } = useFilterProducts();
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    let timeout;
    timeout = setTimeout(async () => {
      const data = await fetchProducts(searchValue);
      setData([...data]);
      setLoading(false);
    }, 1000);

    return () => {
      clearTimeout(timeout);
    };
  }, [searchValue]);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/api/products/${id}`);
      toast.success("product is deleted successfully");
      setData((prev) => prev.filter((p) => p._id !== id));
    } catch (error) {
      console.log(error);
      toast.error("Something Went Wrong");
    }
  };

  const handleEdit = (id) => {
    navigate(`/dashboard/edit-product/${id}`);
  };

  return (
    <section className="all__products">
      <Container>
        <Row>
          <Col lg="12" md="12" sm="6" className="text-center ">
            {loading ? (
              [...Array(7)].map((_, idx) => (
                <div
                  key={idx}
                  className=" d-flex justify-content-between  align-items-center mb-3"
                >
                  <Skeleton width={80} height={80} className=" mx-5 " />
                  <Skeleton width={200} />
                  <Skeleton width={200} />
                  <Skeleton width={100} />
                  <Skeleton width={80} className=" mx-5 " />
                </div>
              ))
            ) : (
              <>
                {data.length > 0 ? (
                  <>
                    <table className="table bordered">
                      <thead>
                        <tr>
                          <th>Image</th>
                          <th>Title</th>
                          <th>Category</th>
                          <th>Price</th>
                          <th>Action</th>
                        </tr>
                      </thead>

                      <tbody>
                        {data.map((product, index) => (
                          <tr key={index}>
                            <td>
                              <img
                                src={product.imgUrl}
                                className="product__image"
                                alt={product.productName}
                              />
                            </td>
                            <td>{product.productName}</td>
                            <td>{product.category}</td>
                            <td>${product.price}</td>
                            <td>
                              <div className=" d-flex align-items-center justify-content-center gap-1 ">
                                <button
                                  onClick={() => handleEdit(product._id)}
                                  className="btn btn-primary rounded-5 "
                                >
                                  <i className="ri-edit-line"></i>
                                </button>
                                <button
                                  onClick={() => handleDelete(product._id)}
                                  className="btn btn-danger rounded-5 "
                                >
                                  <i className="ri-delete-bin-line"></i>
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </>
                ) : (
                  <h6 className="text-center fw-bold">
                    No Products exsited yet
                  </h6>
                )}
              </>
            )}
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default AllProducts;
