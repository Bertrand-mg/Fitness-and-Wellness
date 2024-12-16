import { jwtDecode } from "jwt-decode";

export const extractUserInfoFromToken = (token) => {
  try {
    const decodedToken = jwtDecode(token);
    let { role, email } = decodedToken;

    // If role starts with "ROLE_", remove that prefix
    if (role && role.startsWith("ROLE_")) {
      role = role.slice(5);  // Remove the "ROLE_" prefix (5 characters)
    }

    return { role, email };
  } catch (error) {
    console.error("Invalid token:", error);
    return { role: null, email: null };
  }
};

export default extractUserInfoFromToken;
