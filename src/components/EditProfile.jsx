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

export default function EditProfile() {
  const [profileEditable, setProfileEditable] = useState(true);
  const [open, setOpen] = useState(false);
  const [username, setUsername] = useState("");
  const [bio, setBio] = useState("");
  const pathname = usePathname();
  const { user } = useContext(UserContext);
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const profileRef = useRef(null);

  useEffect(() => {
    setProfileEditable(!pathname.startsWith("/user/"));
  }, [pathname]);

  const handleClickOpen = () => {
    setUsername(user.username);
    setBio(user.bio);
    setPreview(user.photoURL);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleUpload = async () => {
    setLoading(true);
    let imgURL;
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

      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/user/updateuserinfo`,
        { username, bio, photoURL: imgURL || user.photoURL },
        {
          headers: { Authorization: `Bearer ${accessToken}` },
          withCredentials: true,
        }
      );
      alert(res.data.message);
    } catch (error) {
      console.log(error);
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
            onClick={() => {
              profileRef.current.click();
            }}
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
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            id="editUsername"
            fullWidth
            label="Username"
            variant="filled"
          />
          <TextField
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            id="editBio"
            fullWidth
            multiline
            label="Bio"
            variant="filled"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleUpload} disabled={loading} color="primary">
            {loading ? "Saving..." : "Save"}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
