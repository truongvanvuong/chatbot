import {
    BrowserRouter as Router,
    Routes,
    Route,
    Navigate,
} from 'react-router-dom';
import React, { useState } from 'react';
import { privateRoutes, publicRoutes } from './routes';
function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    return (
        <div>
            <Router>
                <Routes>
                    {publicRoutes.map((route, index) => {
                        const Page = route.component;
                        return (
                            <Route
                                key={index}
                                path={route.path}
                                element={<Page setIsLoggedIn={setIsLoggedIn} />}
                            />
                        );
                    })}
                    {isLoggedIn
                        ? privateRoutes.map((route, index) => {
                              const Page = route.component;
                              return (
                                  <Route
                                      key={index}
                                      path={route.path}
                                      element={<Page />}
                                  />
                              );
                          })
                        : privateRoutes.map((route, index) => {
                              return (
                                  <Route
                                      key={index}
                                      path={route.path}
                                      element={<Navigate to="/" />}
                                  />
                              );
                          })}
                </Routes>
            </Router>
        </div>
    );
}

export default App;
