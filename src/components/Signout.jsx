"use client"
import Button from "@mui/material/Button";
import { getAuth, signOut } from "firebase/auth";
import { app } from "../lib/firebaseconfig";
import axios from "axios";
import { useRouter } from "next/navigation";
import LogoutIcon from "@mui/icons-material/Logout";

function Signout() {
  const auth = getAuth(app);
  const router = useRouter();
  async function handleSignout() {
    try {
      await signOut(auth);
      const res = await axios.post(
        "/api/removeToken",
        {}, // No request body
        { withCredentials: true }
      );
      if (res.data.success) {
        router.push("/login");
      }
      else{
        console.log("cannot remove accessToken");
      }
    } catch (error) {
      alert(error.message);
    }
  }

  return (
    <Button
      onClick={handleSignout}
      type="button"
      variant="contained"
      color="primary"
      sx={{ height: 40, gap: 1 }}
    >
      <LogoutIcon />
      <span className="max-md:hidden">Logout</span>
    </Button>
  );
}

export default Signout;
