const app = require("./src/app");
const mongoose = require("mongoose");

const start = async () => {
   if (!process.env.JWT_KEY) {
      throw new Error("JWT_KEY must be defined!");
   }
   if (!process.env.MONGO_URI) {
      throw new Error("Mongo uri must be defined.");
   }
   try {
      await mongoose.connect(process.env.MONGO_URI, {
         useNewUrlParser: true,
         useUnifiedTopology: true,
         useCreateIndex: true,
         useFindAndModify: false,
      });
      console.log("connected to mongodb..");
   } catch (error) {
      console.error(error);
   }
   app.listen(process.env.PORT, () => {
      console.log(`listening on port ${process.env.PORT}!!!`);
   });
};

start();
