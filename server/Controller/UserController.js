import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import User from "../Model/UserModel.js"
export const Register = async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      email,
      password,
      picturePath,
      friends,
      location,
      occupation,
    } = req.body;

    const salt = bcrypt.genSalt()
    const hashedPassword = await bcrypt.hash(password, salt)

    const newUser = {
      firstName,
      lastName,
      email,
      password: hashedPassword,
      picturePath,
      friends,
      location,
      occupation,
      viwedProfile: Math.floor(Math.random() * 10000),
      impressions: Math.floor(Math.random() * 10000)
    }

    const savedUser = await newUser.save;
    res.status(201).json(savedUser)
  } catch (err) {
    res.status(500).json({error: err.message})
  }
}

export const Login = async (req, res) => {
  try {
    const {email, password} = req.body
    const user = await User.findOne({email: email})

    if(!user){
      return res.status(400).json({msg: "User doesn't exist. "})
    }
    
    const isMatch = await bcrypt.compare(password, user.password)
    if(!isMatch){
      return res.status(400).json({msg: "Invalid c redentials. "})
    }

    const token = jwt.sign({id: user._id}, process.env.JWT_TOKEN, {expiresIn: "30m"})
    delete user.password
    res.status(200).json({token, user})
  } catch (error) {
    res.status(500).json({error: err.message})
  }
}

export const GetUser = async (req, res) => {
  try {
    const {id} = req.params
    const user = await User.findById(id)
    res.status(200).send(user)
  } catch (error) {
    res.status(500).json({error: err.message})
  }
}

export const GetUserFriends = async (req, res) => {
try {
  const {id} = req.params
  const user = await User.findById(id)

  const friends = await Promise.all(
    user.friends.map((id) => User.findById(id))
  )
  const formattedFriends = friends.map(
    ({ _id, firstName, lastName, occupation, location, picturePath }) => {
      return { _id, firstName, lastName, occupation, location, picturePath };
    }
  );
  res.status(200).json(formattedFriends);
} catch (error) {
  res.status(500).json({error: err.message})
}
}
export const AddRemoveFriend = async (req, res) => {
  try {
    const {id, friendId} = req.params
    const user = await User.findById(id)
    const friend = await User.findById(friendId)

    if (user.friends.includes(friendId)) {
      user.friends = user.friends.filter((id) => id !== friendId);
      friend.friends = friend.friends.filter((id) => id !== id);
    } else {
      user.friends.push(friendId);
      friend.friends.push(id);
    } 
    await user.save()
    await friend.save()

    const friends = await Promise.all(
      user.friends.map((id) => User.findById(id))
    );
    const formattedFriends = friends.map(
      ({ _id, firstName, lastName, occupation, location, picturePath }) => {
        return { _id, firstName, lastName, occupation, location, picturePath };
      }
    );

    res.status(200).json(formattedFriends);
  } catch (error) {
    res.status(500).json({error: err.message})
  }
}