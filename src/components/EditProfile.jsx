import { useEffect, useState, useContext, useRef } from "react";
import EditIcon from "@mui/icons-material/Edit";
import { usePathname } from "next/navigation";
import { UserContext } from "@/context";
import {
  TextField,
  Dialog,
  DialogContent,
  Button,
  DialogActions,
} from "@mui/material";
import Image from "next/image";
import axios from "axios";
import { useForm } from "react-hook-form";
import checkUsernameAvailability from "@/utils/checkUsernameAvailability";

export default function EditProfile({setProfileUpdated}) {
  const [profileEditable, setProfileEditable] = useState(true);
  const [open, setOpen] = useState(false);
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const profileRef = useRef(null);
  const pathname = usePathname();
  const { user,setUser } = useContext(UserContext);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm();

  useEffect(() => {
    setProfileEditable(!pathname.startsWith("/user/"));
  }, [pathname]);

  const handleClickOpen = () => {
    setValue("username", user.username);
    setValue("bio", user.bio);
    setPreview(user.photoURL);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleUpload = async (data) => {
    setLoading(true);
    let imgURL = user.photoURL;

    try {
      if (image) {
        const formData = new FormData();
        formData.append("file", image);
        const res = await axios.post("/api/upload", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });

        if (res.data.success) {
          imgURL = res.data.url;
        }
      }

      const res2 = await axios.post("/api/getToken");
      const accessToken = res2.data.accessToken;
      let newUsername = data.username.toUpperCase();
      newUsername = newUsername.trim().replace(/\s+/g, " ");
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/user/updateuserinfo`,
        { username: newUsername, bio: data.bio, photoURL: imgURL },
        {
          headers: { Authorization: `Bearer ${accessToken}` },
          withCredentials: true,
        }
      );
      setUser((previous)=>({...previous,username:newUsername,bio:data.bio,photoURL:imgURL}));
      setProfileUpdated((previous)=>(!previous));
    } catch (error) {
      alert("cannot update profile");
      console.error("Error updating profile:", error);
    }
    setLoading(false);
    setOpen(false);
  };

  return (
    <>
      <button
        onClick={handleClickOpen}
        className={`bg-blue-300 rounded-full p-2 h-10 flex justify-center items-center w-10 active:opacity-60 ${
          profileEditable ? "" : "hidden"
        }`}
      >
        <EditIcon className="text-white" />
      </button>

      <Dialog
        open={open}
        onClose={handleClose}
        fullWidth
        maxWidth="md"
        PaperProps={{ style: { borderRadius: "10px" } }}
      >
        <div className="bg-blue-500 text-white h-12 flex justify-center items-center font-bold text-xl">
          Edit Profile
        </div>
        <form onSubmit={handleSubmit(handleUpload)}>
          <DialogContent className="overflow-x-hidden flex gap-2 flex-col items-center">
            <input
              type="file"
              ref={profileRef}
              accept="image/*"
              className="hidden"
              onChange={(event) => {
                const file = event.target.files[0];
                if (file && file.type.startsWith("image/")) {
                  setImage(file);
                  setPreview(URL.createObjectURL(file));
                } else {
                  alert("Only image files are allowed.");
                }
              }}
            />

            <div
              onClick={() => profileRef.current && profileRef.current.click()}
              className="w-[90px] h-[90px] overflow-hidden rounded-full border-4 border-white shadow-lg cursor-pointer"
            >
              <Image
                priority
                src={preview}
                alt="userImage"
                width={90}
                height={90}
                className="object-cover"
              />
            </div>
            <TextField
              id="editUsername"
              fullWidth
              label="Username"
              variant="filled"
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
                  : "Please give a real name so that others can find you easily"
              }
            />
            <TextField
              id="editBio"
              fullWidth
              multiline
              label="Bio"
              variant="filled"
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
          </DialogContent>
          <DialogActions>
            <Button type="submit" disabled={loading} color="primary">
              {loading ? "Saving..." : "Save"}
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </>
  );
}
