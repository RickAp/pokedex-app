import React from 'react';
import '../app/globals.css';
import { AppProps } from 'next/app';
import { Toaster } from "react-hot-toast"
import { Provider } from 'react-redux';
import { store } from '../redux/store';

function MyApp({ Component, pageProps}: AppProps) {
    return (
        <Provider store={store}>
            <Component {...pageProps} />
            <Toaster />
        </Provider>
    );
}

export default MyApp;