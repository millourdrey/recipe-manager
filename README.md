# Recipe Manager

A Vite + React recipe app using TheMealDB for search and localStorage for the saved collection. The app includes route-based navigation, auth guard behavior, and Vercel-friendly SPA rewrites.

## Local setup

```bash
npm install
npm run dev
```

Set a MealDB endpoint in `.env`:

```bash
VITE_MEALDB_URL=https://www.themealdb.com/api/json/v1/1
```

## Production hosting

This project includes `vercel.json` so deep links like `/recipe/52977` keep working after refresh.

## Notes

- The app is built around a separate external API layer and a local saved-recipes store.
- The saved page is protected behind a login guard.
- The storage layer uses browser localStorage rather than a database or JSON server.
