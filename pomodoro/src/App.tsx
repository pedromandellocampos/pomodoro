import { ThemeProvider } from 'styled-components'

import { useState } from 'react'
import { defaultTheme } from './styles/themes/default'

function App() {
  const [count, setCount] = useState(0)

  return (
    <ThemeProvider theme={defaultTheme}>
      <h1>Hello World</h1>
      
    </ThemeProvider>

  )
}

export default App
