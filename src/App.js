import './App.css';
import {Routes, Route} from 'react-router-dom';
import Navigation from './components/Navigation/Navigation';
import useStore from './hooks-store/useStore';

//components
import Home from './Pages/Home';

//1) add precentage part 
//2) show it in graphs

function App() {
  const [globalState, dispatch] = useStore();
  console.log(globalState);

  return (
    <div className="App">
      <h1>EXPENSE TRACKER</h1>
      <Navigation/>
      <Routes>
        <Route path="/" element={<Home/>}/>
      </Routes>
    </div>
  );
}

export default App;
