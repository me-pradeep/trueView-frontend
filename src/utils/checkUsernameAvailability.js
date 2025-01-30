import axios from "axios";

const checkUsernameAvailability = async (username, alreadyUsername,accessToken) => {
  if (alreadyUsername === username) {
    return true;
  }

  try {
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
