import bcrypt from "bcryptjs"
import { findUserByName } from "../utils/getUsers.js"
import { genToken } from "../utils/genToken.js";

async function login(req, res) {
  try {
    const { username, password } = req.body;

    // check username and password if it is empty
    if (!username || !password) {
      return res.status(400).json({
        message: "username and password are required",
        code: "2"
      });
    }

    // check if user exists
    const user = await findUserByName(username)
    if (!user) {
      return res.status(401).json({
        message: "username or password is incorrect",
        code: "1",
        username
      })
    }

    // check if password is correct (user.password is the hash password compared with password)
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({
        message: "username or password is incorrect",
        code: "1",
        username
      })
    }

    // generate token
    const token = genToken({
      username, password
    },
      process.env.TOKEN_EXPIRES_IN || '1h',
    )

    res.status(200).json({
      message: "login success",
      code: "0",
      username,
      token
    })

  } catch (error) {
    console.error('登录失败：', error)
    res.status(500).json({
      message: "Internal Server Error",
      code: "3"
    })
  }
}

export { login }