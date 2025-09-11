import { Outlet } from 'react-router-dom'
import './App.css'
import Titlebar from './components/layouts/TitleBar'
import { ProviderContexts } from './context'
function App() {
  return (
    <ProviderContexts>
      <div className='h-full overflow-hidden'>
        <Titlebar/>
        <Outlet/>
      </div>
    </ProviderContexts>
  )
}

export default App
