import User from "../models/user.model.js";

const createDefaultAdmin = async () => {

  const admin = await User.findOne({
    role: "Admin",
  });

  if (admin) {
    return;
  }

  await User.create({
    fullName: "System Administrator",
    email: "admin@court.com",
    password: "admin123",
    role: "Admin",
  });

  console.log(" Default admin created.");

};

export default createDefaultAdmin;