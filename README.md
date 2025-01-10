# Authentication Overview

This project uses Firebase for authentication. Below is an overview of how the authentication process works, including the API endpoints and their responses.

## Google Authentication

### Frontend

1. The user clicks the "Login With Google" button.
2. The `handleGoogleAuth` function is triggered, which uses Firebase's `signInWithPopup` method to authenticate the user with Google.
3. Upon successful authentication, the user's ID token is retrieved and sent to the backend via the `/api/storeToken` endpoint.

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
