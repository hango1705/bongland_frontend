import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { persistor, store } from "./redux/store";
import { Provider } from "react-redux";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { PersistGate } from "redux-persist/integration/react";

// Add global error handler for third-party scripts
window.addEventListener('error', function(event) {
  // Check if the error is from a third-party domain
  if (event.filename && (
    event.filename.indexOf('tawk.to') !== -1 || 
    event.filename.indexOf('facebook.net') !== -1
  )) {
    // Prevent the error from showing in console
    event.preventDefault();
    return true;
  }
}, true);

const root = ReactDOM.createRoot(document.getElementById("root"));
const queryClient = new QueryClient();
root.render(
  // <React.StrictMode>
  <QueryClientProvider client={queryClient}>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <App />
      </PersistGate>
    </Provider>
    <ReactQueryDevtools initialIsOpen={false} />
  </QueryClientProvider>
  // </React.StrictMode>
);

reportWebVitals();
