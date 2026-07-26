// hashPassword.js
import bcrypt from 'bcryptjs';

const plainPassword = "25-06-2003"; // Student password
const hashedPassword = await bcrypt.hash(plainPassword, 10);

console.log("Hashed password:", hashedPassword);