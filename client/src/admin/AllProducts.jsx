import { Container, Row, Col } from "reactstrap";
import useGetData from "../hooks/useGetData";
import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { setProduct } from "../redux/slices/updateProduct";
import { useNavigate } from "react-router-dom";

const AllProducts = ({ searchValue }) => {
  const { data: productsData, loading } = useGetData(
    "https://multimart-ecommerce-hr2c.onrender.com/api/products/all-products"
  );
  const [data, setData] = useState(productsData);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    setData(
      productsData.sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt))
    );
  }, [productsData]);

  useEffect(() => {
    if (searchValue) {
      const searchResult = productsData.filter((pro) => {
        return pro.productName
          .toLowerCase()
          .includes(searchValue.toLowerCase());
      });

      setData(searchResult);
    } else {
      setData(productsData);
    }
  }, [searchValue]);

  const handleDelete = async (id) => {
    await axios.delete(
      `https://multimart-ecommerce-hr2c.onrender.com/api/products/${id}`
    );
    toast.success("product is deleted successfully");
    window.location.reload();
  };

  const handleEdit = async (id) => {
    try {
      const { data } = await axios.get(
        `https://multimart-ecommerce-hr2c.onrender.com/api/products/${id}`
      );
      navigate("/dashboard/add-product");
      dispatch(setProduct(data.data));
    } catch (error) {
      console.log("kxfkdk");
    }
  };

  return (
    <section className="all__products">
      <Container>
        <Row>
          <Col lg="12" md="12" sm="6" className="text-center ">
            {loading ? (
              <h2 className="text-center">Loading....</h2>
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
                        {data.map((doc, index) => (
                          <tr key={index}>
                            <td>
                              <img src={doc.imgUrl} alt="" />
                            </td>
                            <td>{doc.productName}</td>
                            <td>{doc.category}</td>
                            <td>${doc.price}</td>
                            <td>
                              <div className=" d-flex align-items-center justify-content-center gap-1 ">
                                <button
                                  onClick={() => handleEdit(doc._id)}
                                  className="btn btn-primary rounded-5 "
                                >
                                  <i className="ri-edit-line"></i>
                                </button>
                                <button
                                  onClick={() => handleDelete(doc._id)}
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
