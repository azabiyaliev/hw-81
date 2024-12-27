import express from "express";
import Link from "../models/link";
import crypto from "crypto";
const linksRouter = express.Router();

linksRouter.get("/", async (req, res, next) => {
    try {
        const links = await Link.find();
        res.send(links);
    } catch (e) {
        next(e);
    }
});

linksRouter.get(`/:shortUrl`, async (req, res, next) => {

    const shortUrl = req.params.shortUrl;

    if (!shortUrl) {
        res.status(404).send("Not found");
    }

    try {
        const links = await Link.findOne({shortUrl});
        if (!links) {
             res.status(404).send("Not found");
        } else {
            res.status(301).redirect(links.originalUrl);
        }
    } catch (e) {
        next(e);
    }
});


linksRouter.post("/", async (req, res, next) => {

    const generateShortUrl = (length = 6) => {
        const symbols = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
        let result = '';
        for (let i = 0; i < length; i++) {
            const random = crypto.randomInt(0, symbols.length);
            result += symbols[random];
        }
        return result;
    };
    const genShortUrl = generateShortUrl(7);

    const newLink = {
        shortUrl: genShortUrl,
        originalUrl: req.body.originalUrl
    }

    try {
        const link = new Link(newLink);
        await link.save();
        res.send(link);

    } catch (e) {
        next(e);
    }
})

export default linksRouter;