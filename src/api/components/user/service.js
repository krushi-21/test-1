import userModel from "./model.js";

export const getUserByField = async (value, field) => {
  try {
    console.log("Inside get user by field service");
    if (value === undefined) {
      return { error: messages.INVALID_DATA };
    }
    const user = await userModel.findOne({
      [`${field}`]: value,
    });
    return user;
  } catch (err) {
    console.log(err.message);
    return { error: err.message };
  }
};
export const registerUser = async (data) => {
  try {
    console.log("Inside register user service");
    const user = await userModel.create(data);
    return user;
  } catch (err) {
    console.log(err.message);
    return { error: err.message };
  }
};
