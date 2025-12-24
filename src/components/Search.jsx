"use client";

import React, { useState, useEffect } from "react";
import { algoliasearch } from "algoliasearch";
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

/* 🔹 Algolia client (env variables untouched) */
const searchClient = algoliasearch(
  process.env.NEXT_PUBLIC_AlG0LIA_APP_ID,
  process.env.NEXT_PUBLIC_AlG0LIA_SEARCH_API_KEY
);

const Search = () => {
  const [options, setOptions] = useState([]);
  const [open, setOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const router = useRouter();

  useEffect(() => {
    if (selectedUser?.username) {
      router.push(`/user/${selectedUser.username}`);
    }
  }, [selectedUser, router]);

  /* 🔹 Algolia v5 search */
  const handleSearch = async (_, value) => {
    if (!value) {
      setOptions([]);
      return;
    }

    try {
      const { results } = await searchClient.search([
        {
          indexName: "user",
          query: value,
        },
      ]);

      setOptions(results[0]?.hits || []);
    } catch (error) {
      console.error("Algolia search error:", error);
    }
  };

  return (
    <>
      <Button variant="outlined" onClick={() => setOpen(true)} sx={{ gap: 1 }}>
        <SearchIcon />
        <span className="max-md:hidden">Search Users</span>
      </Button>

      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>Search Users</DialogTitle>

        <DialogContent className="overflow-x-hidden flex justify-center">
          <Autocomplete
            freeSolo
            sx={{ width: 300 }}
            options={options}
            getOptionLabel={(option) => option?.username || ""}
            onInputChange={handleSearch}
            onChange={(_, newValue) => setSelectedUser(newValue)}
            renderOption={(props, option) => (
              <li {...props} key={option.objectID}>
                <div className="flex items-center gap-2">
                  <Image
                    src={option.photoURL}
                    alt={option.username}
                    width={40}
                    height={40}
                    className="rounded-full"
                  />
                  <span>{option.username}</span>
                </div>
              </li>
            )}
            renderInput={(params) => (
              <TextField {...params} label="Search Users" sx={{ my: 1 }} />
            )}
          />
        </DialogContent>

        <DialogActions>
          <Button onClick={() => setOpen(false)}>Close</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default Search;
