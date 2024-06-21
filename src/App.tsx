import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import Main from './pages/main'
import Detail from './pages/detail'
import AudioControl from './components/controls/audio-control'

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
  const queryClient = new QueryClient()
  return (
    <QueryClientProvider client={queryClient}>
      <AudioControl />
      <RouterProvider router={router} />
    </QueryClientProvider>
  )
}

export default App
