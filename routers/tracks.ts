import express from 'express';
import {tracksApi} from "../types";
import Track from "../models/Track";
import Artist from "../models/Artist";

const tracksRouter = express.Router();
tracksRouter.get('/', async (req, res, next) => {
    try {
        const albumReq = req.query.album;
        let tracks: tracksApi[];

        if (albumReq) {
            tracks = await Track.where({album: albumReq});
        } else {
            tracks = await Track.find();
        }
        return res.send(tracks);
    } catch (e) {
        next(e);
    }
});

tracksRouter.post('/', async (req, res, next) => {
    const title = req.body.title;
    const album = req.body.album;
    const duration = req.body.duration;

    if (title === undefined || (/^\s*$/.test(title)) ||
        album === undefined || (/^\s*$/.test(album)) ||
        duration === undefined) {
        return res.status(400).json({"error": "Fields must be present in the request"});
    }

    const track = new Track({title, album, duration});

    try {
        const data = await track.save();
        return res.send(data);
    } catch (e) {
        next(e);
    }
});

export default tracksRouter;