import React from "react";
import AppRoutes from './AppRoutes';
import  background from '../src/assets/background.jpg'

function App() {
    return (
        <div className="text-white flex justify-center bg-cover" style={{ backgroundImage: `url(${background})`}}>
            <AppRoutes />
        </div>
    );
}

export default App;
