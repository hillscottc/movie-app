# Movie App

Hosted on Heroku at <https://afternoon-stream-77228.herokuapp.com>

## Tech and Libraries

Node, Express, Postgres, React, Webpack, [Picnic CSS](https://picnicss.com/documentation), [React Table](https://react-table.tanstack.com/)
Based from boilerplate <https://github.com/hillscottc/heroku-postgres-webpack>

## Heroku setup

These are the steps I used to deploy to Heroku:

1. Push the repo to github
2. `heroku create` # Created app name afternoon-stream-77228
3. `heroku addons:create heroku-postgresql:hobby-dev` # Created postgresql-spherical-36139 as DATABASE_URL
4. `heroku pg:psql` # To open psql to db

Dump of db made following [these directions](https://stackoverflow.com/questions/22887524/how-can-i-get-a-plain-text-postgres-database-dump-on-heroku),
to file `dbdump.sql`

```sql
                                       Table "public.movies"
   Column   |           Type           | Collation | Nullable |              Default
------------+--------------------------+-----------+----------+------------------------------------
 id         | integer                  |           | not null | nextval('movies_id_seq'::regclass)
 title      | character varying(50)    |           |          |
 year       | smallint                 |           |          |
 thumb      | character varying(30)    |           |          |
 videourl   | character varying(30)    |           |          |
 created_at | timestamp with time zone |           | not null | now()
 updated_at | timestamp with time zone |           | not null | now()
 imdb_stars | real                     |           |          |
 imdb       | character varying(100)   |           |          |
```

## cURL Examples

```bash
# GET ALL
curl -i -H "Accept: application/json" "https://afternoon-stream-77228.herokuapp.com/api/movies"

# GET BY ID
curl -i -H "Accept: application/json" "https://afternoon-stream-77228.herokuapp.com/api/movies/1"

# INSERT WITH JSON DATA
curl -H "Content-Type: application/json" -X POST \
  -d '{"title":"blah", "year":"2020"}' \
  "https://afternoon-stream-77228.herokuapp.com/api/movies"

# DELETE (where 8 is the id)
curl -X DELETE "https://afternoon-stream-77228.herokuapp.com/api/movies/8"
```

### Dev server webpack config to proxy /api queries

<https://webpack.js.org/configuration/dev-server/#devserverproxy>

```json
devServer: {
    // Set proxy so /api goes to the node server
    proxy: {
      "/api": {
        target: "https://afternoon-stream-77228.herokuapp.com",
        secure: false,
        changeOrigin: true,
      },
    },
  },
```
