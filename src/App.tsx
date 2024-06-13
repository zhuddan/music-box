import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import Main from './pages/main'
import Detail from './pages/detail'
import AudioContainer from './components/audio-container'

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
    <AudioContainer>
      <RouterProvider router={router} />
    </AudioContainer>
  )
}

export default App
