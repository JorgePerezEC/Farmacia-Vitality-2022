import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import Rating from "./Rating";
import axios from "axios";
import { useContext } from "react";
import { Store } from "../Store";
import "../App.css";

function Producto(props) {
  const { product } = props;

  const { state, dispatch: ctxDispatch } = useContext(Store);
  const {
    cart: { cartItems },
  } = state;

  const addToCartHandler = async (item) => {
    const existItem = cartItems.find((x) => x._id === product._id);
    const quantity = existItem ? existItem.quantity + 1 : 1;
    const { data } = await axios.get(`/api/products/${item._id}`);
    if (data.countInStock < quantity) {
      window.alert(
        "Lo sentimos. Por el momento este producto se encuentra fuera de Stock"
      );
      return;
    }
    ctxDispatch({
      type: "CART_ADD_ITEM",
      payload: { ...item, quantity },
    });
  };

  return (
    <Card className='cardProducto'>
      <Link to={`/product/${product.slug}`}>
        <img src={product.image} className='card-img-top' alt={product.name} />
      </Link>
      <Card.Body>
        <Link to={`/product/${product.slug}`}>
          <Card.Title>{product.name}</Card.Title>
        </Link>
        <Rating
          className='rating'
          rating={product.rating}
          numReviews={product.numReviews}
        />
        <Card.Text>${product.price}</Card.Text>
        {product.countInStock === 0 ? (
          <Button variant='dark' disabled>
            Sin stock
          </Button>
        ) : (
          <Button onClick={() => addToCartHandler(product)}>
            Añadir al carrito
          </Button>
        )}
      </Card.Body>
    </Card>
  );
}
export default Producto;
