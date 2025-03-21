import { BrowserRouter, Route, Link, Routes } from 'react-router-dom';

const Home = () => {
    return(
        <div className="p-2">
            <h1>
                Home Page
            </h1>
            <Link to={"/login"} className="btn btn-primary">
                login
            </Link>
        </div>
    );
};

export default Home;