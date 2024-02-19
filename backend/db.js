import mongoose from "mongoose";

export const connectionToDB  = async () => {
    try {
        await mongoose.connect("mongodb://127.0.0.1/pokedex-db");
        console.log("DB is connected");
    } catch (error) {
        console.log(error);
    }
};