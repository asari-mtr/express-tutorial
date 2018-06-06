https://www.tutorialspoint.com/expressjs/index.htm

``` sh
$ npm install -g nodemon

$ nodemon index.js
```

use db

``` sh
$ brew install mongodb
$ brew searvices start mongodb
$ mongo
> use my_db
```

update person
``` sh
$ curl -X PUT --data "name=James&age=20&nationality=American" http://localhost:3000/people/5b135fcde739c49632546395
$ curl -X DELETE http://localhost:3000/people/5b135fcde739c49632546395
```

Run on docker-compose
``` sh
$ docker-compose up
```

REST test
``` sh
$ curl -i -H "Accept: application/json" -H "Content-Type: application/json" -X GET localhost:3000/movies
$ curl -i -H "Accept: application/json" -H "Content-Type: application/json" -X GET localhost:3000/movies/101
$ curl -X POST --data "name=Toy%20story&year=1995&rating=8.5" http://localhost:3000/movies
```
