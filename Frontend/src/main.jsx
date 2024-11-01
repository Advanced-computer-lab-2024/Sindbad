import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './state management/userInfo';
import { ToastProvider } from "@/components/ui/toast";
import { Toaster } from "@/components/ui/toaster";

createRoot(document.getElementById('root')).render(
    <Provider store={store}>
        <BrowserRouter>
            <ToastProvider>
                <App />
                <Toaster />
            </ToastProvider>
        </BrowserRouter>
    </Provider>
)
