import bcrypt from 'bcryptjs';

const plainPassword = "25-06-2003";
const hashedPassword = "$2a$10$7I.85tSAz.L6fp.xwmPvEuLG/88ljXQZDSsrLftgk.54qZ44f9JWG";

const match = await bcrypt.compare(plainPassword, hashedPassword);
console.log("Password match?", match);