import { AppBar, Toolbar, Typography, IconButton, Badge } from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const Header = () => {
  const cartItems = useSelector(store => store.cart.items)
    return (
      <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
        <Link to={"/"} style={{ textDecoration: "none", color: "inherit" }}>ShopNow</Link>
        </Typography>
        <Link to="/cart" style={{ textDecoration: "none", color: "inherit" }}>
          <IconButton color="inherit">
            <Badge badgeContent={cartItems.length} color="secondary">
              <ShoppingCartIcon />
            </Badge>
          </IconButton>
        </Link>
      </Toolbar>
    </AppBar>
      );
    };
    
    export default Header;