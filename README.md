# My Movie DB

## TMDB API Key

To be able to run this app, you will need to have a TMDB API key. To get one, go to [TMDB](https://developer.themoviedb.org/reference/intro/getting-started).

Then, copy your API key inside the file `my-movie-db-back/src/models/MyMovieDb.ts`, at line 7 : (replace `SECRET_API_KEY` with your key)

```typescript
static apiKey: string = "SECRET_API_KEY";
```

Then, run this command inside `my-movie-db-back` :

```bash
$ npm run build
```