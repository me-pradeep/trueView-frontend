"use client";

import React from 'react';
import { useForm } from 'react-hook-form';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { UserContext } from '@/context';
import { useContext } from 'react';

const checkUsernameAvailability = async (username) => {
  try {
    const res = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/user/checkusernameavailibilty`, { username });

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
  const {setUser,user}=useContext(UserContext);
  const router=useRouter();
  const {email,photoURL}=user;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async(data) => {
    const username=data.username.toUpperCase();
    await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/user/createuser`, {username,email,photoURL });
    setUser({username,photoURL})
    router.push("/"
      // `/?username=${data.username}&photoURL=${photoURL}`
    );
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className='border-2 w-80 p-4'>
      <div>
        <TextField
          id="username"
          label="Username"
          variant="filled"
          fullWidth
          {...register('username', {
            required: 'Username is required',
            validate: checkUsernameAvailability
          })}
          error={!!errors.username}
          helperText={errors.username ? errors.username.message : ''}
        />
      </div>

      <Button type="submit" variant="contained" color="primary" sx={{ marginTop: 2 }}>
        Submit
      </Button>
    </form>
  );
};

export default UsernameForm;
