import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from '@tanstack/react-query'
import axios from 'axios'
import React, { useEffect } from 'react'
import Main from './pages/main'
import Detail from './pages/detail'
import AudioControl from './components/controls/audio-control'
import { usePlayerStore } from './store/player'

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
      <SongWrapper>
        <RouterProvider router={router} />
      </SongWrapper>
    </QueryClientProvider>
  )
}

const t = new Date().toTimeString()
function SongWrapper({ children }: React.PropsWithChildren) {
  const { setSongs } = usePlayerStore()
  const { data } = useQuery({
    queryKey: ['songs'],
    queryFn: async () => {
      return (await axios.get(`http://localhost:3001?v=${t}`)).data as Song.Song[]
    },
  })
  useEffect(() => {
    if (data) {
      setSongs(data)
    }
  }, [data, setSongs])

  return <>{children}</>
}

export default App
