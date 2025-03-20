import { BrowserRouter, Route, Link, Routes } from 'react-router-dom';

const NotFound = () => {
    return(
        <div className="p-2">
            <h1>
                Error 404 Page not Found
            </h1>
            <Link to={"/home"} class="btn btn-primary">
                Home
            </Link>
        </div>
    );
};

export default NotFound;