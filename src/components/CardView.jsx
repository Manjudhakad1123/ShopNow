import Card from "@mui/material/Card";
import { Box, Button, CardActionArea } from "@mui/material";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addItem } from "./utils/cartSlice";
import { useState } from "react";
import Rating from '@mui/material/Rating'; 

const CardView = ({ prodDetails, showAddBtn }) => {
  const [inCart, setInCart] = useState([]);
  const dispatch = useDispatch();
  
  const handleAddItem = (prodDetails) => {
    dispatch(addItem(prodDetails));
    setInCart([...inCart, prodDetails]);
  };

  const productsInCart = useSelector((store) => store.cart.items);

  return (
    <Card
      sx={{
        maxWidth: "345px",
        margin: "10px",
        height: "350px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        border: "1px solid #e9e4e4"
      }}
    >
      <CardActionArea>
        <CardContent>
          <Link
            to={"/product/" + prodDetails.id}
            key={prodDetails.id}
            style={{ textDecoration: "none", color: "inherit" }}
          >
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "180",
                overflow: "hidden",
              }}
            >
              <CardMedia
                component="img"
                sx={{
                  width: "120px",
                  height: "120px",
                }}
                image={prodDetails.image}
                alt="product image"
                loading="lazy" 
              />
            </Box>
            <Typography
              gutterBottom
              variant="h6"
              component="div"
              sx={{
                color: "text.secondary",
                overflow: "hidden",
                textOverflow: "ellipsis",
                display: "-webkit-box",
                WebkitBoxOrient: "vertical",
                WebkitLineClamp: 1,
                fontSize: "16px",
                fontWeight: "bold",
              }}
            >
              {prodDetails.title}
            </Typography>
            <Typography
              variant="body2"
              sx={{
                color: "text.secondary",
                overflow: "hidden",
                textOverflow: "ellipsis",
                display: "-webkit-box",
                WebkitBoxOrient: "vertical",
                WebkitLineClamp: 2,
              }}
            >
              {prodDetails.description}
            </Typography>
            <Typography
              variant="body2"
              sx={{
                color: "text.secondary",
                fontSize: "16px",
                fontWeight: "bold",
              }}
            >
              {"\u20B9"}
              {prodDetails.price.toFixed(0)}
            </Typography>
          </Link>
          {showAddBtn && (
            <Button
              variant="outlined"
              color="primary"
              onClick={
                inCart.length > 0
                  ? (inCart.find((itemVal) => itemVal.id === prodDetails.id)
                    ? () => alert("Product is already added to Cart")
                    : () => handleAddItem(prodDetails))
                  : (productsInCart.find(
                      (itemVal) => itemVal.id === prodDetails.id
                    )
                  ? () => alert("Product is already added to Cart")
                  : () => handleAddItem(prodDetails))
              }
              sx={{ marginTop: 2 }}
            >
              {inCart.length > 0
                ? (inCart.find((itemVal) => itemVal.id === prodDetails.id)
                  ? "Added"
                  : "Add to Cart")
                : (productsInCart.find(
                    (itemVal) => itemVal.id === prodDetails.id
                  )
                ? "Added"
                : "Add to Cart")}
            </Button>
          )}
          <Box sx={{ display: "flex", alignItems: "center", margin: "10px 0" }}>
            <Rating
              name="product-rating"
              value={prodDetails.rating.rate}
              readOnly
              sx={{ marginRight: "8px" }} 
            />
            <Typography variant="body2" sx={{ color: "text.secondary" }}>
              {prodDetails.rating.rate}
            </Typography>
          </Box>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default CardView;