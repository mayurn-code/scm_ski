// @flow
import React from 'react';
import Routes from './routes/Routes';
import "react-toastify/dist/ReactToastify.css"
import { ToastContainer, Slide } from 'react-toastify';

// setup fake backend
import { configureFakeBackend } from './helpers';

// Themes

// For Saas import Saas.scss
import './assets/scss/Saas.scss';

// For Modern demo import Modern.scss
// import './assets/scss/Modern.scss';

// For Creative demo import Creative.scss
// import './assets/scss/Creative.scss';

// configure fake backend
configureFakeBackend();

type AppProps = {};

/**
 * Main app component
 */
const App = (props: AppProps): React$Element<any> => {

    return (
        <>
            <ToastContainer transition={Slide}
                position="top-center"
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop={true}
                closeOnClick rtl={false}
                pauseOnFocusLoss draggable pauseOnHover limit={1} />
            <Routes></Routes>;
        </>
    )
};

//Exporting APP
export default App;
