const mongoose = require("mongoose");
const Password = require("../services/password");

const userSchema = new mongoose.Schema(
   {
      email: {
         type: String,
         required: true,
         unique: true,
      },
      password: {
         type: String,
         required: true,
      },
   },
   {
      toJSON: {
         transform(doc, ret) {
            ret.id = ret._id;
            delete ret._id;
            delete ret.password;
         },
      },
   }
);

userSchema.pre("save", async function (done) {
   if (this.isModified("password")) {
      const hashedPassword = await Password.toHash(this.get("password"));
      this.set("password", hashedPassword);
   }
   done();
});

const User = mongoose.model("User", userSchema);

module.exports = User;
