import mongoose from "mongoose";

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.DB, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        const db = mongoose.connection;
        db.on("error", console.error.bind(console, "connection error:"));
        db.once("open", function () {
            console.log("Connected to MongoDB");
        });
        console.log(`connected on host ${conn.connection.host}`);
    } catch (error) {
        console.log("err");
        console.log(error.message);
        process.exit(1);
    }
};


export default connectDB;
