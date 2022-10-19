import jwt from "jsonwebtoken";

//creating JWT token for user
export const createToken = (id, email) => {
  return jwt.sign({ id: id, email: email }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });
};

export const verifyToken = (token) => {
  try {
    return jwt.verify(token, process.env.JWT_SECRET);
  } catch (error) {}
  return null;
};
