import express from "express";
import cors from "cors";
import mongoDb from "./mongoDb";
import * as mongoose from "mongoose";
import linksRouter from "./routers/links";

const app = express();
const port = 8000;

app.use(cors());
app.use(express.json());
app.use("/links", linksRouter);

const run = async () => {

    await mongoose.connect('mongodb://localhost/links');

    app.listen(port, () => {
        console.log(`Server started on port http://localhost:${port}`);
    });

    process.on("exit", (err) => {
        mongoDb.disconnect();
    })
}

run().catch(err => console.log(err));