# react-for-heroku

Heroku app name is calm-waters-80883

## Instructions

- Local dev mode

1. Clone this repo
2. Run `npm install`
3. Run `npm run dev`, **localhost:8080** will open up in your default browser

- Production, served from heroku
  <https://calm-waters-80883.herokuapp.com>

## Database

- The Heroku DATABASE_URL is `postgresql-dimensional-59756`
- To use psql: `heroku pg:psql`

The `movies` table was created with:

```sql
CREATE TABLE movies(
id SERIAL PRIMARY KEY,
title VARCHAR(30),
year SMALLINT,
thumb VARCHAR(30),
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
curl -i -H "Accept: application/json" "https://calm-waters-80883.herokuapp.com/api/movies"
```

- INSERT WITH JSON DATA

```bash
curl -H "Content-Type: application/json" -X POST \
  -d '{"title":"blah", "year":"2020"}' \
  "https://calm-waters-80883.herokuapp.com/api/movies"
```

- DELETE

```bash
# where 8 is the id
curl -X DELETE "https://calm-waters-80883.herokuapp.com/api/movies/8"
```

### Dev server webpack config to proxy /api queries

<https://webpack.js.org/configuration/dev-server/#devserverproxy>

```json
devServer: {
    // Set proxy so /api goes to the node server
    proxy: {
      "/api": {
        target: "https://calm-waters-80883.herokuapp.com",
        secure: false,
        changeOrigin: true,
      },
    },
  },
```
