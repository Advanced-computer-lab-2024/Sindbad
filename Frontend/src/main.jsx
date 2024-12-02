import { useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { BrowserRouter } from 'react-router-dom';
import { Provider, useDispatch } from 'react-redux';
import { store } from './state management/userInfo';
import { ToastProvider } from "@/components/ui/toast";
import { Toaster } from "@/components/ui/toaster";
import { automaticLogin } from './services/AuthApiHandler.js';
import { login } from './state management/userInfo'; // Import the login action from Redux slice

const AppWithLogin = () => {
    const dispatch = useDispatch();

    // Fetch user info on app initialization
    useEffect(() => {
        const loginUser = async () => {
            try {
                const user = await automaticLogin();
                if (user && user.id && user.username) {
                    console.log("Automatic login successful:", user);
                    // Dispatch login action to store the user info in Redux
                    dispatch(login({
                        role: user.role,
                        id: user.id,
                        accessToken: user.accessToken,
                    }));
                }
            } catch (error) {
                console.error("Automatic login failed:", error);
            }
        };

        loginUser();
    }, [dispatch]);

    return (
        <App />
    );
};

createRoot(document.getElementById('root')).render(
    <Provider store={store}>
        <BrowserRouter>
            <ToastProvider>
                <AppWithLogin />
                <Toaster />
            </ToastProvider>
        </BrowserRouter>
    </Provider>
);
