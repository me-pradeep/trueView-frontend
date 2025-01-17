import React, { useState ,useEffect} from "react";
import algoliasearch from "algoliasearch/lite";
import {
  Autocomplete,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
} from "@mui/material";
import Image from "next/image";
import SearchIcon from "@mui/icons-material/Search";
import { useRouter } from "next/navigation";

// Initialize Algolia client
const searchClient = algoliasearch(
  process.env.NEXT_PUBLIC_AlG0LIA_APP_ID,
  process.env.NEXT_PUBLIC_AlG0LIA_SEARCH_API_KEY
);
const index = searchClient.initIndex("user");

const Search = () => {
  const [options, setOptions] = useState([]);
  const [open, setOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const router=useRouter();

  useEffect(() => {
    if (selectedUser) {
      const username=selectedUser.username;
      router.push(`/user/${username}`);
    }
  }, [selectedUser]);

  const handleSearch = async (event, value) => {
    if (!value) {
      setOptions([]);
      return;
    }

    try {
      const { hits } = await index.search(value);
      setOptions(hits);
    } catch (error) {
      console.error("Error fetching search results from Algolia:", error);
    }
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleUserSelect = (selectedOption) => {
    setSelectedUser(selectedOption);
    setOpen(false);
  };

  return (
    <div>
      <Button variant="outlined" onClick={handleClickOpen} sx={{ gap: 1 }}>
        <SearchIcon />
        <span className="max-md:hidden">Search Users</span>
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Search Users</DialogTitle>
        <DialogContent className="overflow-x-hidden flex justify-center">
          <Autocomplete
            freeSolo
            sx={{ width: 300 }}
            options={options}
            getOptionLabel={(option) => option.username || ""}
            onInputChange={handleSearch}
            onChange={(event, newValue) => handleUserSelect(newValue)}
            renderOption={(props, option) => (
              <li {...props} key={option.objectID}>
                <div style={{ display: "flex", alignItems: "center" }}>
                  <Image
                    src={option.photoURL}
                    alt={option.username}
                    height={40}
                    width={40}
                    className="rounded-full"
                    style={{ width: "auto", height: "auto" }}
                  />
                  <span style={{ marginLeft: 10 }}>{option.username}</span>
                </div>
              </li>
            )}
            renderInput={(params) => (
              <TextField {...params} label="Search Users" sx={{ marginY: 1 }} />
            )}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Search;
