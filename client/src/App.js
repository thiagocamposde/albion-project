import React, { useState, useEffect } from 'react'
import MainsScreen from './components/screens/MainScreen'
import theme from './Theme'
import { ThemeProvider } from '@material-ui/styles'
import { BrowserRouter } from 'react-router-dom'
import NavBar from '../src/components/base/NavBar'
import { getTmdbApiConfiguration } from '../src/api/configuration.api'

function App () {
  const [tmdbConfig, setTmdbConfig] = useState(null)
  const [tmdbConfigIsloading, setTmdbConfigIsLoading] = useState(true)

  useEffect(() => {
    const fetchTmdbConfiguration = async () => {
      const response = await getTmdbApiConfiguration()
      setTmdbConfig(response.data)
      setTmdbConfigIsLoading(false)
    }

    fetchTmdbConfiguration()
  }, [])

  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <NavBar tmdbConfigIsloading={tmdbConfigIsloading} tmdbConfig={tmdbConfig} />
        <MainsScreen tmdbConfig={tmdbConfig} tmdbConfigIsloading={tmdbConfigIsloading} />
      </BrowserRouter>
    </ThemeProvider>

  )
}

export default App
