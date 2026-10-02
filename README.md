# ReactFood

ReactFood is a food ordering app. You browse a menu of meals, add them to a cart, change quantities, and send an order with your contact details. The frontend is built with React 19 and TypeScript, and the menu and orders are handled by a separate Express backend.

## Highlights

- Menu loaded from the backend, with loading and error states
- Cart with add, increase and decrease, and a live item counter in the header
- Cart and checkout open as modal dialogs, one after another
- Checkout form with required fields and email validation from the browser
- Order is sent to the backend; the form shows a sending state and an error if the request fails
- Success message after the order, and the cart is cleared when you close it
- Prices are formatted as currency

## Built With

- React 19
- TypeScript
- Vite
- Express (backend, plain JavaScript)
- Vercel for the frontend and Render for the backend

## How It Works

| Concept | Where | What it does |
|---|---|---|
| Context | `CartContext.tsx`, `UserProgressContext.tsx` | Shares the cart and the current step (`cart` or `checkout`) across the app |
| `useReducer` | `CartContext.tsx` | Handles `ADD_ITEM`, `REMOVE_ITEM` and `CLEAR_CART` actions with typed action objects |
| Custom hook | `useHttp.ts` | Sends requests, tracks data, loading and error, and works for both GET and POST |
| `useActionState` | `Checkout.tsx` | Runs the order as a form action and gives the pending state |
| Portal and `dialog` | `Modal.tsx` | Renders modals in a separate element with the native dialog |
| Reusable UI | `Button.tsx`, `Input.tsx` | Typed components that pass native attributes through |

## Run Locally

You need Node.js 18 or newer and npm. The frontend and the backend run at the same time, so use two terminals.

**Backend**

```
cd backend
npm install
node app.js
```

The API starts at http://localhost:3000. Open http://localhost:3000/meals to check that it works.

**Frontend** (from the project root)

```
npm install
npm run dev
```

The app opens at http://localhost:5173.

## Environment Variables

| Name | Default | Description |
|---|---|---|
| `VITE_API_URL` | `http://localhost:3000` | Address of the backend, without a slash at the end |

To use a different backend locally, create a `.env` file in the project root:

```
VITE_API_URL=https://your-backend.onrender.com
```

The backend reads `PORT` from the environment and falls back to 3000.

## API

| Method | Path | Description |
|---|---|---|
| `GET` | `/meals` | Returns the list of available meals |
| `POST` | `/orders` | Saves an order with `items` and `customer` data |

Meal images are served by the backend, and the frontend builds their addresses from `VITE_API_URL`.

## Deployment

1. **Backend on Render.** Create a Web Service from the repository with these settings: root directory `backend`, build command `npm install`, start command `node app.js`.
2. **Frontend on Vercel.** Import the same repository, keep the project root, and add `VITE_API_URL` with the Render address.
3. Redeploy the frontend after changing the variable, because Vite adds `VITE_` values during the build.

Every push to `main` redeploys both services.

## Project Layout

```
backend/
  app.js                 Express server
src/
  components/
    UI/
      Button.tsx         button with a text-only variant
      Input.tsx          labeled form input
      Modal.tsx          dialog rendered through a portal
    Cart.tsx             cart modal
    CartItem.tsx         one line in the cart
    Checkout.tsx         order form and success message
    Error.tsx            error message block
    Header.tsx           header with the cart button
    MealItem.tsx         one meal card
    Meals.tsx            list of meals
  hooks/
    useHttp.ts           request hook
  store/
    CartContext.tsx      cart state
    UserProgressContext.tsx   current modal step
  util/
    formatting.ts        currency formatter
  config.ts              backend address
  types.ts               shared types
  App.tsx                root component
  main.tsx               entry point
  index.css              global styles
index.html
tsconfig.json
vite.config.js
```

## Limitations

- The backend stores orders in a file and has no database. On the free Render plan the file system is not persistent, so saved orders disappear when the service restarts.
- The free Render plan puts the service to sleep after a period of inactivity, so the first request can take up to a minute.
- The cart lives only in memory and is lost when the page is reloaded.
- There are no payments or accounts; the order only collects contact details.
