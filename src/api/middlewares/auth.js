import { handleError } from "../helpers/requestHandler.js";
import { verifyToken } from "../helpers/jwt.js";
import { getUserByField } from "../components/user/service.js";

export const auth = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer")) {
    return handleError({ res, err: "Authentication invalid" });
  }
  const token = authHeader.split(" ")[1];

  try {
    const user = verifyToken(token);
    req.user = await getUserByField(user.email, "email");
    next();
  } catch (error) {
    return handleError({ res, err: "Authentication invalid" });
  }
};
