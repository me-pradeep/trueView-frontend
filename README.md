# Authentication Overview

This project uses Firebase for authentication. Below is an overview of how the authentication process works, including the API endpoints and their responses.

## Google Authentication

### Frontend

1. The user clicks the "Login With Google" button.
2. The `handleGoogleAuth` function is triggered, which uses Firebase's `signInWithPopup` method to authenticate the user with Google.
3. Upon successful authentication, the user's ID token is retrieved and sent to the backend via the `/api/storeToken` endpoint.
4. The backend stores the token in an HTTP-only cookie named `accessToken`.
5. The frontend then sends a request to the `/api/user/checkuser` endpoint to check if the user exists in the database.
6. If the user exists, the user data is set in the context and the user is redirected to the home page.
7. If the user does not exist, the user data is set in the context and the user is redirected to the `/getusername` page to set a username.

### Backend

#### `/api/storeToken`

- **Method**: POST
- **Request Body**: `{ accessToken: string }`
- **Response**: 
  - Success: `{ success: true }`
  - Sets a cookie named `accessToken` with the token value, which is HTTP-only, has a `sameSite` policy of `strict`, and expires in 1 week.

#### `/api/verifyToken`

- **Method**: POST
- **Request Headers**: Includes the `accessToken` cookie.
- **Response**:
  - Success: `{ uid: string, success: true }` with status `200`
  - Failure: `{ message: "Unauthorized", success: false }` with status `401`

#### `/api/user/checkuser`

- **Method**: POST
- **Request Body**: `{ email: string }`
- **Response**:
  - Success: `{ message: "user exists", success: true, username: string }` with status `200`
  - Failure: `{ message: "user not exist", success: false }` with status `200`

#### `/api/user/createuser`

- **Method**: POST
- **Request Body**: `{ username: string, email: string, photoURL: string }`
- **Response**:
  - Success: `{ message: "user created successfully", success: true }` with status `200`
  - Failure: `{ message: string, success: false }` with status `400` or `500`

#### `/api/user/checkusernameavailibilty`

- **Method**: POST
- **Request Body**: `{ username: string }`
- **Response**:
  - Success: `{ message: "username not taken", success: true }` with status `200`
  - Failure: `{ message: "username already taken", success: false }` with status `200`

#### `/api/user/removeAccessToken`

- **Method**: POST
- **Response**:
  - Success: `{ message: "removed accessToken successfully", success: true }` with status `200`
  - Clears the `accessToken` cookie.

## Protected Routes

- The `ProtectedRoute` component is used to wrap any component that requires authentication.
- It sends a request to `/api/verifyToken` to verify the user's token.
- If the token is valid, the child components are rendered.
- If the token is invalid or missing, the user is redirected to the login page.

### Example Usage

```jsx
import ProtectedRoute from "@/components/protectedRoute";

function Dashboard() {
  return (
    <ProtectedRoute>
      <div>Welcome to your dashboard!</div>
    </ProtectedRoute>
  );
}

export default Dashboard;
```

## Important Notes

- Ensure that the Firebase configuration is correctly set up in the project.
- The backend should have access to Firebase Admin SDK to verify ID tokens.
- The `accessToken` cookie should be handled securely to prevent XSS attacks.