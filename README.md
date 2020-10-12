# Movie App

Heroku app name is afternoon-stream-77228

## Instructions

- Local dev mode

1. Clone this repo
2. Run `npm install`
3. Run `npm run dev`, **localhost:8080** will open up in your default browser

- Production, served from heroku
  <https://afternoon-stream-77228.herokuapp.com>

## Heroku setup

These are the steps I used to deploy to Heroku

1. Push the repo to github
2. `heroku create` # Created app name afternoon-stream-77228
3. `heroku addons:create heroku-postgresql:hobby-dev`  # Created postgresql-spherical-36139 as DATABASE_URL
4. `heroku pg:psql` # To open psql to db. Then follow the Databse instructions below to create tables.

## Database

- The Heroku DATABASE_URL is `postgresql-spherical-36139`
- To use psql: `heroku pg:psql`

The `movies` table was created with:

```sql
CREATE TABLE movies(
id SERIAL PRIMARY KEY,
title VARCHAR(30),
year SMALLINT,
thumb VARCHAR(30),
videoUrl VARCHAR(30),
created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
 );

CREATE OR REPLACE FUNCTION trigger_set_timestamp()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER set_timestamp
BEFORE UPDATE ON movies
FOR EACH ROW
EXECUTE PROCEDURE trigger_set_timestamp();

```

### cURL Examples

- GET ALL

```bash
curl -i -H "Accept: application/json" "https://afternoon-stream-77228.herokuapp.com/api/movies"
```

- INSERT WITH JSON DATA

```bash
curl -H "Content-Type: application/json" -X POST \
  -d '{"title":"blah", "year":"2020"}' \
  "https://afternoon-stream-77228.herokuapp.com/api/movies"
```

- DELETE

```bash
# where 8 is the id
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
