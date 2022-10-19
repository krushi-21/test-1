import { createToken } from "../../helpers/jwt.js";
import { loginRequest, signupRequest } from "./validation.js";
import { handleError, handleResponse } from "../../helpers/requestHandler.js";
import { getUserByField, registerUser } from "./service.js";
import messages from "../../config/messages.js";
import userModel from "./model.js";

export const login = async (req, res) => {
  try {
    console.log("Inside login API controller");
    const validation = await loginRequest(req.body);
    if (validation.error) {
      return handleError({ res, err: validation.message });
    }
    const user = await getUserByField(req.body.email, "email");
    if (user !== null && user?.error) {
      return handleError({ res, err: user?.error });
    }
    if (user === null) {
      return handleError({ res, err: messages.EMAIL_NOT_REGISTERED });
    }

    if (!(await user.checkPassword(req.body.password, user.password))) {
      return handleError({
        res,
        err: messages.INCORRECT_PASSWORD,
      });
    }
    const token = await createToken(user._id, user.email);
    const response = {
      email: user.email,
      token: token,
    };
    return handleResponse({ res, data: response, msg: messages.SUCCESS });
  } catch (err) {
    console.log(err);
    return handleError({ res, err: err.message });
  }
};
export const signUp = async (req, res) => {
  try {
    console.log("Inside signup controller");
    const validate = await signupRequest(req.body);
    if (validate.error) {
      return handleError({ res, err: validate.message });
    }
    const { email } = req.body;
    const userExist = await getUserByField(req.body.email, "email");
    if (userExist?.error) {
      return handleError({ res, err: "user exist with this email" });
    }
    if (userExist) {
      return handleError({
        res,
        err: messages.ACCOUNT_ALREADY_EXIST,
        statusCode: 400,
      });
    }

    const createUser = await registerUser(req.body);
    if (createUser?.error || !createUser) {
      return handleError({
        res,
        err: createUser.error || messages.SOMETHING_WENT_WRONG,
      });
    }
    delete createUser._doc.password;
    console.log(createUser._id);
    const token = await createToken(createUser._id, createUser.email);
    const response = {
      email: createUser.email,
      token: token,
    };
    return handleResponse({ res, data: response, msg: messages.SUCCESS });
  } catch (error) {
    console.log(error);
    return handleError({ res, err: error.message });
  }
};
