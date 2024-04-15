import mongoose, {Types} from "mongoose";
import Artist from "./Artist";
import config from "../config";

const Schema = mongoose.Schema;

const AlbumSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    artist: {
        type: Schema.Types.ObjectId,
        ref: 'Artist',
        required: true,
        validate: {
            validator: async (value: Types.ObjectId) => Artist.findById(value),
            message: 'Artist does not exist!',
        }
    },
    releaseDate: {
        type: String,
        required: true
    },
    coverImage: String
}, config.mongoose.versionKey);

const Album = mongoose.model('Album', AlbumSchema);
export default Album;