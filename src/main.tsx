import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { createBrowserRouter } from 'react-router';
import { RouterProvider } from 'react-router/dom';
import Favorite from './pages/Favorite.tsx';
import Home from './pages/Home.tsx';
import Recipe from './pages/Recipe.tsx';

const router = createBrowserRouter([
    {
        element: <App />,
        children: [
            {
                path: "/",
                element: <Home />
            },
            {
                path: "/favorite",
                element: <Favorite />
            },
            {
                path: "/recipe",
                element: <Recipe />
            }
        ]
    }
])

createRoot(document.getElementById('root') || document.body).render
    (
        <RouterProvider router={router} />
    );
