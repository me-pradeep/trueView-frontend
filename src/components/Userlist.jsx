"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import Pagination from "@mui/material/Pagination";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { CircularProgress } from "@mui/material";

function Userlist() {
  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      const res1 = await axios.post("/api/getToken");
      const accessToken = res1.data.accessToken;
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/user/getuserlist`,
        { currentPage },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
          withCredentials: true,
        }
      );
      setUsers(response.data.users);
      setTotalPages(response.data.totalPages);
      setIsLoading(false);
    };

    fetchUsers();
  }, [currentPage]);

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  if (isLoading) {
    return (
      <div className="h-screen w-screen flex items-center justify-center">
        <CircularProgress size={60} />
      </div>
    );
  }

  return (
    <div className="w-[80%] max-lg:w-full h-fit flex flex-col items-center bg-white pb-4">
      <h1 className="font-bold text-2xl p-4 text-blue-600">
        Users You May know
      </h1>
      <ul className="flex gap-4 flex-wrap justify-center">
        {users.map((user) => (
          <li
            onClick={() => {
              router.push(`/user/${user.username}`);
            }}
            key={user._id}
            className="w-80 flex gap-3 p-2 rounded-lg items-center bg-slate-100 cursor-pointer"
          >
            <Image
              src={user.photoURL}
              height={50}
              width={50}
              className="rounded-full min-h-[50px]"
              alt="user image"
            />
            {user.username}
          </li>
        ))}
      </ul>
      <Pagination
        count={totalPages}
        page={currentPage}
        onChange={handlePageChange}
        color="primary"
        showFirstButton
        showLastButton
        sx={{ mt: 2 }}
      />
    </div>
  );
}

export default Userlist;
