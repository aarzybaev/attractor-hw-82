import express from 'express';
import Album from "../models/Album";
import {imagesUpload} from "../multer";
import {albumsApi} from "../types";

const albumsRouter = express.Router();

albumsRouter.get('/', async (req, res, next) => {
    try {
        const artistReq = req.query.artist;
        let albums: albumsApi[];

        if (artistReq) {
            albums = await Album.where({artist: artistReq});
        } else {
            albums = await Album.find();
        }
        return res.send(albums);

    } catch (e) {
        next(e);
    }
});

albumsRouter.get('/:id', async (req, res,next) => {

    try {
        const id = req.params.id;
        const album: albumsApi | null = await Album
            .findById(id)
            .populate("artist", "name photo information");

        if (album) {
            return res.send(album);
        } else {
            return res.status(404).send({error: 'Not found'});
        }

    } catch (e) {
        next(e);
    }

});

albumsRouter.post('/', imagesUpload.single('coverImage'), async (req, res, next) => {
    const title = req.body.title;
    const artist = req.body.artist;
    const releaseDate = req.body.releaseDate;
    const coverImage = req.file ? req.file.filename : null;

    if (title === undefined || (/^\s*$/.test(title)) ||
        releaseDate === undefined || (/^\s*$/.test(releaseDate)) ||
        artist === undefined || (/^\s*$/.test(artist)) ||
        coverImage === undefined) {
        return res.status(400).json({"error": "Fields must be present in the request"});
    }

    const album = new Album({title, artist, releaseDate, coverImage});

    try {
        const data = await album.save();
        return res.send(data);
    } catch (e) {
        next(e);
    }
});

export default albumsRouter;