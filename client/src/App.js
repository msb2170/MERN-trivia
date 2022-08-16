import React, {useState} from 'react';

import { Route, Routes } from 'react-router-dom';

import Navbar from './components/navbar';
import QuestionList from './components/questionList';
import Add from './components/add';
import Edit from "./components/edit";
import Play from "./components/play";

const App = () => {
    const [lightMode, setLightMode] = useState(false)

    const toggleDarkMode = () => {
        if(!lightMode) {
            setLightMode(true);
        } else {
            setLightMode(false);
        }
    }
    return ( 
        <div className={lightMode ? 'container-light' : 'container-dark'}>
            <Navbar lightMode={lightMode}/>
            <button className={lightMode ? 'toggle-btn-light' : 'toggle-btn-dark'} onClick={toggleDarkMode}>{lightMode ? 'Dark Mode': 'Light Mode'}</button>
            <Routes>
                <Route exact path="/" element={<QuestionList lightMode={lightMode}/>} />
                <Route path="/edit/:id" element={<Edit />} />
                <Route path="/add" element={<Add />} />
                <Route path="/play" element={<Play />} />
            </Routes>
        </div>
    );
};

export default App;