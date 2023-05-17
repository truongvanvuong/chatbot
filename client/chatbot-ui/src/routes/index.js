import Home from '../pages/Home';
import Login from '../pages/Login';
import Profile from '../pages/Profile';
import Signup from '../pages/Signup';
import Introduction from '../pages/Introduction';

const publicRoutes = [
    { path: '/', component: Introduction },
    { path: '/login', component: Login },
    { path: '/signup', component: Signup },
];

const privateRoutes = [
    { path: '/home', component: Home },
    { path: '/profile', component: Profile },
];

export { publicRoutes, privateRoutes };
