import { Box, Button, Card, CardMedia, Container, Rating, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { addItem } from "./utils/cartSlice";

const ProductDetails = () => {
    const { productId } = useParams();
    const [productInfo, setProductInfo] = useState([]);
    
    useEffect(() => {
      fetchData();
    }, []);
  
    const fetchData = async () => {
      const data = await fetch("https://fakestoreapi.com/products/" + productId);
      const json = await data.json();
      setProductInfo(json);
    };

    const dispatch = useDispatch()
    const handleAddItem = (productInfo) => {
       dispatch(addItem(productInfo))
    }
    const cartItems = useSelector((store) => store.cart.items);
    return (
        <Container sx={{ paddingY: 4 }}>
        {productInfo && 
          <Box sx={{ display: "flex", gap: 4, marginBottom: 4, justifyContent:"center"}}>
            <Card
              sx={{
                width: 400,
                height: "auto",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <CardMedia
                component="img"
                height="400"
                image={productInfo.image}
                alt={productInfo.title}
                sx={{ objectFit: "cover" }}
              />
            </Card>
            <Box sx={{ flex: 1 }}>
              <Typography variant="h3" gutterBottom>
                {productInfo.title}
              </Typography>
              <Typography variant="h5" color="textSecondary">
              {"\u20B9"}{productInfo.price}
              </Typography>
              <Box sx={{ display: "flex", alignItems: "center", marginY: 2 }}>
                <Rating
                  name="read-only"
                  value={productInfo.rating?.rate || 0}
                  readOnly
                />
                <Typography
                  variant="body2"
                  color="textSecondary"
                  sx={{ marginLeft: 1 }}
                >
                  ({productInfo.rating?.count || 0} reviews)
                </Typography>
              </Box>
              <Typography variant="body1" paragraph>
                {productInfo.description}
              </Typography>
              <Button
                variant="outlined"
                color="primary"
                onClick={cartItems.find((itemVal) => itemVal.id === productInfo.id) ? ()=> alert("Product is already added to Cart") : () => handleAddItem(productInfo)}
                sx={{ marginTop: 2 }}
              >
               {cartItems.find((cartItem) => cartItem.id === productInfo.id)
                ? "Added"
                : "Add to Cart"}
              </Button>
            </Box>
          </Box>
        }
         </Container>
      );
}

export default ProductDetails