import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import Main from './pages/main'
import Detail from './pages/detail'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Main />,
  },
  {
    path: '/detail',
    element: <Detail />,
  },
])

function App() {
  return <RouterProvider router={router} />
}

export default App
