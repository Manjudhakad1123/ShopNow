import React, { useEffect, useState, Suspense  } from "react";
import { Container, Grid as Grid2 } from "@mui/material";
import CardView from "./CardView";
// import FilterProduct from "./FilterProduct"; 
import { InputLabel, Select, MenuItem, FormControl } from "@mui/material";



const FilterProduct = React.lazy(() => import('./FilterProduct'));
const HomePage = () => {
  const [productList, setProductList] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [category, setCategory] = useState("");
  const [priceRange, setPriceRange] = useState([0, 1000]);
  const [rating, setRating] = useState(0);
  const [sortCriteria, setSortCriteria] = useState("");
  const [categories] = useState([
    "electronics",
    "jewelery",
    "men's clothing",
    "women's clothing"
  ]);

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [category, priceRange, rating, productList, sortCriteria]); 

  const fetchProducts = async () => {
    const response = await fetch("https://fakestoreapi.com/products");
    const jsonData = await response.json();
    setProductList(jsonData);
  };

  const applyFilters = () => {
    const filtered = productList.filter((product) => {
      const matchesCategory = category ? product.category === category : true;
      const matchesPrice = product.price >= priceRange[0] && product.price <= priceRange[1];
      const matchesRating = product.rating?.rate >= rating;

      return matchesCategory && matchesPrice && matchesRating;
    });

    // Sort the filtered products based on selected criteria
    if (sortCriteria === "priceLowToHigh") {
      filtered.sort((a, b) => a.price - b.price);
    } else if (sortCriteria === "priceHighToLow") {
      filtered.sort((a, b) => b.price - a.price);
    } else if (sortCriteria === "rating") {
      filtered.sort((a, b) => b.rating?.rate - a.rating?.rate);
    }

    setFilteredProducts(filtered);
  };

  return (
    <Container>
      <Grid2 container spacing={2} sx={{ display: "flex", paddingTop: "30px" }}>
        {/* Section 1: Filters */}
        <Grid2 item xs={12} sm={4} md={3}>
          <Suspense fallback={<div>Loading...</div>}>
            <FilterProduct 
              category={category} 
              setCategory={setCategory} 
              priceRange={priceRange} 
              setPriceRange={setPriceRange} 
              rating={rating} 
              setRating={setRating} 
              categories={categories}
            />
          </Suspense>
        </Grid2>

        {/* Section 2: Product Display Section */}
        <Grid2 item xs={12} sm={8} md={9} sx={{ display: 'flex', flexDirection: 'column' }}>
          <FormControl sx={{ maxWidth: 200, paddingLeft: "10px"}}>
            <InputLabel>Sort By</InputLabel>
            <Select value={sortCriteria} onChange={(e) => setSortCriteria(e.target.value)}>
              <MenuItem value="">None</MenuItem>
              <MenuItem value="priceLowToHigh">Price: Low to High</MenuItem>
              <MenuItem value="priceHighToLow">Price: High to Low</MenuItem>
              <MenuItem value="rating">Rating</MenuItem>
            </Select>
          </FormControl>
          <Grid2 container spacing={2} sx={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }}>
            {filteredProducts.map((prod) => (
              <Grid2 item xs={12} sm={6} md={4} key={prod.id}>
                <CardView prodDetails={prod} showAddBtn={true} />
              </Grid2>
            ))}
          </Grid2>
        </Grid2>
      </Grid2>
    </Container>
  );
};

export default HomePage;