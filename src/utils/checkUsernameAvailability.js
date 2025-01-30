import axios from "axios";

const checkUsernameAvailability = async (username, alreadyUsername) => {
  if (alreadyUsername === username) {
    return true;
  }

  try {
    const res1 = await axios.post("/api/getToken");
    const accessToken = res1.data.accessToken;

    const res = await axios.post(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/user/checkusernameavailibilty`,
      { username },
      {
        headers: { Authorization: `Bearer ${accessToken}` },
        withCredentials: true,
      }
    );

    return res.data.success ? true : "Username is already taken.";
  } catch (error) {
    console.error("Error checking username availability:", error);
    return "Error checking username availability.";
  }
};

export default checkUsernameAvailability;
