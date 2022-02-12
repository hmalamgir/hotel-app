import mongoose from "mongoose";
import colors from "colors";

const dbConnect = () => {
  mongoose
    .connect(process.env.DB_URL, {})
    .then((con) => console.log("DB CONNECTED....".bgBlue));
};

export default dbConnect;
