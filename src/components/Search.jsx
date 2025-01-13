import React, { useState } from "react";
import algoliasearch from "algoliasearch/lite";
import { Autocomplete, TextField } from "@mui/material";

// Initialize Algolia client
const searchClient = algoliasearch(
  process.env.NEXT_PUBLIC_AlG0LIA_APP_ID,
  process.env.NEXT_PUBLIC_AlG0LIA_SEARCH_API_KEY
);
const index = searchClient.initIndex("user");

const Search = () => {
  const [options, setOptions] = useState([]);

  // Function to handle search
  const handleSearch = async (event, value) => {
    if (!value) {
      setOptions([]);
      return;
    }

    try {
      // Query Algolia search
      const { hits } = await index.search(value);

      // Set search results
      setOptions(hits);
    } catch (error) {
      console.error("Error fetching search results from Algolia:", error);
    }
  };

  return (
    <Autocomplete
      freeSolo
      sx={{ width: 300 }}
      options={options}
      getOptionLabel={(option) => option.username || ""}
      onInputChange={handleSearch} // Trigger search on input change
      renderOption={(props, option) => (
        <li {...props} key={option.objectID}>
          <div style={{ display: "flex", alignItems: "center" }}>
            <img
              src={option.photoURL}
              alt={option.username}
              style={{ width: 30, height: 30, borderRadius: "50%" }}
            />
            <span style={{ marginLeft: 10 }}>{option.username}</span>
          </div>
        </li>
      )}
      renderInput={(params) => <TextField {...params} label="Search Users" />}
    />
  );
};

export default Search;
