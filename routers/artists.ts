import express from "express";
import Artist from "../models/Artist";
import {imagesUpload} from "../multer";
import {artistsApi} from "../types";
const artistsRouter = express.Router();
artistsRouter.get('/', async (req, res) => {
    const artists: artistsApi[] = await Artist.find();
    return res.send(artists);
});

artistsRouter.post('/', imagesUpload.single('photo'), async (req, res, next) => {
    const name = req.body.name;
    const photo = req.file ? req.file.filename : null;
    const information = req.body.information;

    if (name === undefined || (/^\s*$/.test(name)) ||
        photo === undefined ||
        information === undefined) {
        return res.status(400).json({"error": "Fields must be present in the request"});
    }

    const artist = new Artist({name, photo, information});

    try {
        const data = await artist.save();
        return res.send(data);
    } catch (e) {
        next(e);
    }

});

export default artistsRouter;
