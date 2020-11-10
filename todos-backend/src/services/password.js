const { scrypt, randomBytes } = require("crypto");
const { promisify } = require("util");

const scryptAsync = promisify(scrypt);

class createPassword {
   toHash = async password => {
      const salt = randomBytes(8).toString("hex");
      const buff = await scryptAsync(password, salt, 64);

      return `${buff.toString("hex")}.${salt}`;
   };

   compare = async (storedPassword, suppliedPassword) => {
      const [hashedPassword, salt] = storedPassword.split(".");
      const buff = await scryptAsync(suppliedPassword, salt, 64);

      return buff.toString("hex") === hashedPassword;
   };
}

const Password = new createPassword();
module.exports = Password;
