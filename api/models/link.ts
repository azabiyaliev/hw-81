import mongoose from "mongoose";

const Schema = mongoose.Schema;

const linkSchema = new Schema({
    shortUrl: {
        type: String,
        required: true,
    },
    originalUrl: {
        type: String,
        required: true,
    },
});

const Link = mongoose.model("Link", linkSchema);
export default Link;