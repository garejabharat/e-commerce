import { faHeart, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useSnackbar } from "notistack";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { addItemToCart } from "../redux/slices/cart/cartSlice";
import { removeProductFromWishlist } from "../redux/slices/wishList/wishlistSlice";
import { RootState } from "../redux/store";
import { CartItem } from "../utils/types";
import { Link } from "react-router-dom";

const WishlistPage: React.FC = () => {
  const wishlist = useSelector((state: RootState) => state.wishList);
  const dispatch = useDispatch();

  const handleRemoveFromWishlist = (product: CartItem) => {
    dispatch(removeProductFromWishlist(product));
  };

  const { enqueueSnackbar } = useSnackbar();
  const handleAddToCart = (product: CartItem) => {
    const cartItem: CartItem = {
      id: product.id,
      category: product.category,
      description: product.description,
      image: product.image,
      title: product.title,
      price: product.price,
      rating: product.rating,
      quantity: 1,
      totalPrice: product.price,
    };
    dispatch(addItemToCart(cartItem));
    dispatch(removeProductFromWishlist(product));
    enqueueSnackbar(
      `You've Added ${product.title.substring(
        0,
        55
      )}... successfully to your Cart!`,
      { variant: "success" }
    );
  };

  // const handleAddToCart = (productId: number) => {
  //   console.log(`Adding product with ID ${productId} to cart`);
  // };

  return (
    <div className="bg-gray-100 min-h-screen py-8">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-semibold mb-6 flex items-center justify-center text-center">
          Your Wishlist{" "}
          <FontAwesomeIcon icon={faHeart} className="ml-2 text-red-600" />
        </h2>
        <div className="table-responsive">
          <table className="w-full bg-white rounded shadow">
            <thead className="bg-gray-200">
              <tr className="border-b">
                <th className="py-3">Image</th>
                <th className="py-3">Product Name</th>
                <th className="py-3">Price</th>
                <th className="py-3">Delete</th>
                <th className="py-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {wishlist.map((product: CartItem) => (
                <tr key={product.id} className="border-b">
                  <td className="text-center">
                    <img
                      src={product.image}
                      alt={product.title}
                      className="w-24 h-28 object-cover mx-auto p-3"
                    />
                  </td>
                  <td>
                    <h3 className="text-lg font-semibold">{product.title}</h3>
                  </td>
                  <td className="text-lg font-semibold text-green-600 text-center">
                    ₹. {product.price}
                  </td>
                  <td className=" text-center">
                    <button
                      onClick={() => handleRemoveFromWishlist(product)}
                      className="text-red-600 hover:text-red-800 transition duration-300 ease-in-out "
                    >
                      <FontAwesomeIcon
                        icon={faTrash}
                        className="h-5 w-5 inline-block align-middle"
                      />
                    </button>
                  </td>
                  <td className="text-center">
                    <button
                      className={`bg-[#385A64] w-full sm:w-1/3 mx-2 sm:mx-6 my-4 py-3 font-medium text-white shadow hover:shadow-lg rounded-lg`}
                      onClick={() => handleAddToCart(product)}
                    >
                      Add to Cart
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default WishlistPage;
