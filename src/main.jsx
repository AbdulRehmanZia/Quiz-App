import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import { ThemeProvider } from './Custom Hooks/ThemeContext.jsx';
import Quiz from './Components/QuizPages/Quiz.jsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App></App>,
  },
  {
    path: "/HTML",
    element: <Quiz></Quiz>,
  },
  {
    path: "/CSS",
    element: <Quiz></Quiz>,
  },
  {
    path: "/JavaScript",
    element: <Quiz></Quiz>,
  },
  {
    path: "/Accessibility",
    element: <Quiz></Quiz>,
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ThemeProvider>
      <RouterProvider router={router} />
    </ThemeProvider>

  </StrictMode>,
)
