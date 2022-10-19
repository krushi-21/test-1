export const isAdmin = async (req, res, next) => {
  try {
    const user = req.user;
    if (user.userType === "admin") {
      return next();
    }
    return res.status(400).json({
      status: "unauthorized",
    });
  } catch (error) {
    res.status(404).send(error);
  }
  next();
};
