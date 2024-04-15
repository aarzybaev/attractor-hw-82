import mongoose from "mongoose";
import config from "../config";

const Schema = mongoose.Schema;

const ArtistSchema = new Schema({
    name: {
        type: String,
        unique: true,
        required: true
    },
    photo: String,
    information: String

}, config.mongoose.versionKey);

const Artist = mongoose.model('Artist', ArtistSchema);
export default Artist;