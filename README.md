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
```
$ curl -X PUT --data "name=James&age=20&nationality=American" http://localhost:3000/people/5b135fcde739c49632546395
$ curl -X DELETE http://localhost:3000/people/5b135fcde739c49632546395
```

Run on docker-compose
```
$ docker-compose up
```
