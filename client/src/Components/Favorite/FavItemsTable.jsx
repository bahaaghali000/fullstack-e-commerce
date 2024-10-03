import React from "react";
import { useDispatch, useSelector } from "react-redux";
import useAddOrRemoveToFav from "../../hooks/useAddOrRemoveToFav";
import { convertToCurrency } from "../../utils";
import { deleteItemFromFav } from "../../redux/slices/favSlice";

const FavItemsTable = () => {
  const { favItems } = useSelector((state) => state.fav);
  const { isAuthenticated } = useSelector((state) => state.auth);

  const dispatch = useDispatch();

  const { addOrRemoveToFav } = useAddOrRemoveToFav();

  const hanleDelete = async (id) => {
    if (isAuthenticated) {
      await addOrRemoveToFav(id);
    }

    dispatch(deleteItemFromFav(id));
  };

  return (
    <table className="table bordered mb-5">
      <thead>
        <tr>
          <th>Image</th>
          <th>Title</th>
          <th>Price</th>
          <th className="text-center">Delete</th>
        </tr>
      </thead>
      <tbody>
        {favItems.map((item) => (
          <tr key={item._id} className="table__content mb-3">
            <td>
              <img
                src={`${import.meta.env.VITE_BACKEND_URL}/${item.imgUrl}`}
                alt={item.productName}
              />
            </td>
            <td>{item.productName}</td>
            <td>{convertToCurrency(item.price, "USD")}</td>
            <td className="text-center">
              <span>
                <i
                  onClick={() => hanleDelete(item._id)}
                  className="ri-delete-bin-line"
                ></i>
              </span>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default FavItemsTable;
