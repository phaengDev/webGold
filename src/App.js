import React,{useEffect,useState} from 'react'
import _ from 'lodash';
import { useLocation } from 'react-router-dom';
import Header from './Layout/Header';
import Footer from './Layout/Footer';
import Slider from './Layout/Slider';
import AppContainer from './Router/Paste';
function App() {
  const location = useLocation();
  const pathName = location.pathname;
  const [path, setPath] = useState(pathName);
  const [minified,setMinified]=useState(false);
  useEffect(() => {
    setPath(pathName);
    if(_.includes(path)){
      setMinified(true);
    }
  }, [pathName]);
  return (
    <>
      <div id="app" class="fade show">
        <Header />
        {path=== "/home" || path=== "/" ? (
        <Slider/>
      ):''}
        <AppContainer/>
        
        <Footer />
      </div>
    </>

  );
}

export default App;
