# Heroku setup

These are the steps I used to setup/deploy on Heroku host:

1. Push the repo to github
2. `heroku create` # Created app name afternoon-stream-77228
3. `heroku addons:create heroku-postgresql:hobby-dev`
4. `heroku pg:psql` # To open psql to db

Dump of db made following [these directions](https://stackoverflow.com/questions/22887524/how-can-i-get-a-plain-text-postgres-database-dump-on-heroku),
to file `dbdump.sql`
