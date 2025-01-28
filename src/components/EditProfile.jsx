import { useEffect, useState, useContext } from "react";
import EditIcon from "@mui/icons-material/Edit";
import { usePathname } from "next/navigation";
import { UserContext } from "@/context";
import {
  TextField,
  Dialog,
  DialogContent,
  Button,
  DialogActions
} from "@mui/material";
import Image from "next/image";

export default function EditProfile() {
  const [profileEditable, setProfileEditable] = useState(true);
  const [open, setOpen] = useState(false);
  const [username, setUsername] = useState("");
  const [bio, setBio] = useState("");
  const pathname = usePathname();
  const { user } = useContext(UserContext);

  useEffect(() => {
    const booleanValueForEdit = pathname.startsWith("/user/") ? false : true;
    setProfileEditable(booleanValueForEdit);
  }, [pathname]);

  const handleClickOpen = () => {
    setUsername(user.username);
    setBio(user.bio);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleEditing = () => {
    console.log(username,bio);
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
          <Image
            priority
            src={user.photoURL}
            height={90}
            width={90}
            alt="userImage"
            className="rounded-full border-4 border-white shadow-lg min-h-[90px] min-w-[90px]"
          />
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
        <DialogActions >
          <Button onClick={handleEditing} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
