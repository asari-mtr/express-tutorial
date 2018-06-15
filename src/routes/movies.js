import express from 'express'
let router = express.Router()

var movies = [
    {id: 101, name: 'Fight Club', year: 1999, rating: 8.1},
    {id: 102, name: 'Inception', year: 2019, rating: 8.7},
    {id: 103, name: 'The Dark Knight', year: 2008, rating: 9},
    {id: 104, name: '12 Angry Men', year: 1957, rating: 8.9}
]

router.get('/', (req, res) => {
    res.json(movies)
})

router.get('/:id([0-9]{3,})', (req, res) => {
    var currMovie = movies.filter((movie) => {
        if(movie.id == req.params.id) {
            return true
        }
    })
    if(currMovie.length == 1){
        res.json(currMovie[0])
    } else {
        res.status(404)
        res.json({message: 'Not Found'})
    }
})

router.post('/', (req, res) => {
    if(!req.body.name ||
        !req.body.year.toString().match(/^[0-9]{4}$/g) ||
        !req.body.rating.toString().match(/^[0-9]\.[0-9]$/g)) {

        res.status(400)
        res.json({message: 'Bad Request'})
    } else {
        var newId = movies[movies.length-1].id+1
        movies.push({
            id: newId,
            name: req.body.name,
            year: req.body.year,
            rating: req.body.rating
        })

        res.json({message: 'New movie created.', location: '/movies/' + newId})
    }
})

router.put('/:id', (req, res) => {
    if(!req.body.name ||
        !req.body.year.toString().match(/^[0-9]{4}$/g) ||
        !req.body.rating.toString().match(/^[0-9]\.[0-9]$/g) ||
        !req.params.id.toString().match(/^[0-9]{3,}$/g)) {

        res.status(400)
        res.json({message: 'Bad Request'})
    } else {
        var updateIndex = movies.map((movie) => {
            return movie.id
        }).indexOf(parseInt(req.params.id))

        if(updateIndex === -1) {
            movies.push({
                id: req.params.id,
                name: req.body.name,
                year: req.body.year,
                rating: req.body.rating
            })
            res.json({message: 'New movie created.', location: '/movies/' + req.params.id})
        } else {
            movies[updateIndex] = {
                id: req.params.id,
                name: req.body.name,
                year: req.body.year,
                rating: req.body.rating
            }
            res.json({message: 'Movie id ' + req.params.id + ' updated.', location: '/movies/' + req.params.id})
        }
    }
})

router.delete('/:id', (req, res) => {
    var removeIndex = movies.map((movie) => {
        return movie.id
    }).indexOf(parseInt(req.params.id))

    if(removeIndex === -1){
        res.json({message: 'Not found'})
    } else {
        movies.splice(removeIndex, 1)
        res.send({message: 'Movie id ' + req.params.id + ' removed.'})
    }
})

export default router
