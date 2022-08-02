import React from 'react';

import { Route, Routes } from 'react-router-dom';

import Navbar from './components/navbar';
import QuestionList from './components/questionList';
import Add from './components/add';
import Edit from "./components/edit";
import Play from "./components/play";

const App = () => {
    return (
        <div>
            <Navbar />
            <Routes>
                <Route exact path="/" element={<QuestionList />} />
                <Route path="/edit/:id" element={<Edit />} />
                <Route path="/add" element={<Add />} />
                <Route path="/play" element={<Play />} />
            </Routes>
        </div>
    );
};

export default App;