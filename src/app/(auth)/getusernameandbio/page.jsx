"use client";

import React from "react";
import { useForm } from "react-hook-form";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import axios from "axios";
import { useRouter } from "next/navigation";
import { UserContext } from "@/context";
import { useContext } from "react";

const checkUsernameAvailability = async (username) => {
  try {
    const res = await axios.post(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/user/checkusernameavailibilty`,
      { username }
    );

    if (res.data.success) {
      return true;
    } else {
      return "Username is already taken.";
    }
  } catch (error) {
    return "Error checking username availability.";
  }
};

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
    username=username.trim().replace(/\s+/g, ' ');
    const bio = data.bio;
    if (email) {
      await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/user/createuser`,
        { username, email, photoURL, bio }
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
            validate: checkUsernameAvailability,
          })}
          error={!!errors.username}
          helperText={errors.username ? errors.username.message : "Please give real name so that others can find you easily"}
        />
        <TextField
          id="bio"
          label="Describe Bio"
          variant="filled"
          fullWidth
          multiline
          {...register("bio", {
            required: "Please maintain word limit",
            validate: (value) => {
              const charCount = value.trim().length;
              return charCount >= 30 && charCount <= 120
                ? true
                : "Bio must be between 30 and 120 characters.";
            },
          })}
          error={!!errors.bio}
          helperText={errors.bio ? errors.bio.message : "Characters limit 30-120"}
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
