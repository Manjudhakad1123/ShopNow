import { useSelector } from "react-redux";
import CardView from "./CardView";
import { Box, Container, Grid2, Typography } from "@mui/material";

const Cart = () => {
    const cartItems = useSelector((store) => store.cart.items);
    const totalCost = cartItems.reduce((acc, item) => acc + item.price, 0);

    return (
        <Container>
          <Grid2 container spacing={2} sx={{display: 'flex', flexWrap: 'wrap'}}>
            {cartItems.length === 0 ? ( <Typography variant="h4">No items in the cart.</Typography>): (cartItems.map((item) => (
              <Grid2 size xs={12} sm={6} md={4} key={item.id}>
                <CardView prodDetails={item} showAddBtn= {false}/>
              </Grid2>
            )))}
          </Grid2>
          <Box sx={{ paddingTop: 2 }}>
              {cartItems.length> 0 && <Typography variant="h5">
                Total: {"\u20B9"}{totalCost.toFixed(2)}
              </Typography>}
            </Box>
        </Container>
      );
}

export default Cart