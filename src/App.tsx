import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import Main from './pages/main'
import Detail from './pages/detail'
import AudioControl from './components/audio-control'

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
  return (
    <>
      <AudioControl />
      <RouterProvider router={router} />
    </>
  )
}

export default App
