# Movie App

Run app locally : `npm run dev`  
(*Not* just `npm start`,which only starts the node server, not the full app.)

Or, see it hosted on Heroku at <https://afternoon-stream-77228.herokuapp.com>

## Tech and Libraries

Node, Express, Postgres, React, Webpack, [Picnic CSS](https://picnicss.com/documentation))

Stack adapted from boilerplate at: <https://github.com/hillscottc/heroku-postgres-webpack>

## Postgres Database
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

## Node Server and api
Node Express server handles api requests at `/api`

#### cURL Examples
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

## Notes

* Dev server webpack config to proxy /api queries, <https://webpack.js.org/configuration/dev-server/#devserverproxy>
    ```
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
