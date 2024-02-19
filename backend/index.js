import express from "express";
import morgan from "morgan";
import { connectionToDB } from "./db.js";
import router from "./routes/auth.routes.js";

const app = express();
const PORT = 4000;
connectionToDB();

app.use(morgan('dev'));
app.use(express.json());
app.use("/api", router);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});