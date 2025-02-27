import { BrowserRouter, Route, Link, Routes } from 'react-router-dom';

const Home = () => {
    return(
        <div>
            <h1>
                Home Page
            </h1>
            <Link to={"/login"}>
                login
            </Link>
        </div>
    );
};

export default Home;