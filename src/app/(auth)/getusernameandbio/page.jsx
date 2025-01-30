"use client";

import React from "react";
import { useForm } from "react-hook-form";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import axios from "axios";
import { useRouter } from "next/navigation";
import { UserContext } from "@/context";
import { useContext } from "react";
import checkUsernameAvailability from "@/utils/checkUsernameAvailability";

const UsernameForm = () => {
  const { setUser, user } = useContext(UserContext);
  const router = useRouter();
  const { email, photoURL } = user;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    let username = data.username.toUpperCase();
    username = username.trim().replace(/\s+/g, " ");
    const bio = data.bio;
    if (email) {
      const res1 = await axios.post("/api/getToken");
      const accessToken = res1.data.accessToken;
      await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/user/createuser`,
        { username, email, photoURL, bio },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
          withCredentials: true,
        }
      );
      router.push("/");
    } else {
      alert("Invalid Process");
      router.push("/login");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="border-2 w-80 p-4">
      <div className="flex flex-col gap-2">
        <TextField
          id="username"
          label="Username"
          variant="filled"
          fullWidth
          {...register("username", {
            required: "Username is required",
            validate: async (value) =>
              await checkUsernameAvailability(value, user.username),
            maxLength: {
              value: 14,
              message: "Username cannot exceed 14 characters",
            },
          })}
          error={!!errors.username}
          helperText={
            errors.username
              ? errors.username.message
              : "Please give real name so that others can find you easily"
          }
        />
        <TextField
          id="bio"
          label="Describe Bio"
          variant="filled"
          fullWidth
          multiline
          {...register("bio", {
            required: "Please maintain word limit",
            maxLength: {
              value: 120,
              message: "Bio must be between 30 and 120 characters.",
            },
            minLength: {
              value: 30,
              message: "Bio must be between 30 and 120 characters.",
            },
          })}
          error={!!errors.bio}
          helperText={
            errors.bio ? errors.bio.message : "Characters limit 30-120"
          }
        />
      </div>

      <Button
        type="submit"
        variant="contained"
        color="primary"
        sx={{ marginTop: 2 }}
      >
        Submit
      </Button>
    </form>
  );
};

export default UsernameForm;
