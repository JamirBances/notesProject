import './App.css'
import Home from './pages/Home'
import NavBar from './components/NavBar';
import { HashRouter, Route, Routes } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import ArchivedNotes from './pages/ArchivedNotes';
import LoadingScreen from './components/LoadingScreen';
import { useSelector } from 'react-redux';

function App() {

  const isLoading = useSelector(state => state.isLoading);

  return (
    <HashRouter>
      <NavBar/>
      {isLoading && <LoadingScreen/>}
      <Container className='container-global'>
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/archivednotes' element={<ArchivedNotes/>} />
        </Routes>
      </Container>
    </HashRouter>
  )
}

export default App
