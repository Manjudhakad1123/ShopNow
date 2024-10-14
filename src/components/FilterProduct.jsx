import { InputLabel, Slider, Select, MenuItem, FormControl, Rating, Box } from "@mui/material";

const FilterProduct = ({ category, setCategory, priceRange, setPriceRange, rating, setRating, sortCriteria, setSortCriteria, categories }) => {
  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
      <FormControl fullWidth>
        <InputLabel>Category</InputLabel>
        <Select value={category} onChange={(e) => setCategory(e.target.value)}>
          <MenuItem value="">All</MenuItem>
          {categories.map((cat) => (
            <MenuItem key={cat} value={cat}>
              {cat.charAt(0).toUpperCase() + cat.slice(1)}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <div>
        <InputLabel>Price Range</InputLabel>
        <Slider
          value={priceRange}
          onChange={(e, newValue) => setPriceRange(newValue)}
          valueLabelDisplay="auto"
          min={0}
          max={1000}
          step={10}
        />
      </div>

      <div>
        <InputLabel>Rating</InputLabel>
        <Rating
          value={rating}
          onChange={(e, newValue) => setRating(newValue)}
          precision={0.5}
        />
      </div>
    </Box>
  );
};

export default FilterProduct;