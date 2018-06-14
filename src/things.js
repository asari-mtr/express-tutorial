import express from 'express';

let router = express.Router();

router.get('/', (req, res) => {
    res.send('GET route on things.');
});

router.post('/', (req, res) => {
    res.send('POST route on things.');
});

export default router;
