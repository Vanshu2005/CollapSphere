const mongoose = require("mongoose");

const connectDB = async () => {
    try {
        const uri = process.env.MONGODB_URI || "";
        await mongoose.connect(uri, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log("MongoDB connected successfully");
        return true;
    } catch (error) {
        console.error("MongoDB Connection Failed:", error.message);
        return false;
    }
};

module.exports = connectDB;
