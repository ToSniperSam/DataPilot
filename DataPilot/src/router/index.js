import { createBrowserRouter, Outlet, Navigate} from 'react-router-dom';
import Main from '../pages/main'; 
import Home from '../pages/home';  
import Mall from '../pages/mall';
import User from '../pages/user';
import Page1 from '../pages/Others/page1';
import Login from '../pages/login'



const routes = [
    {
        path: '/',
        element: <Main />,  
        children: [
            {
                path:'/',
                element:<Navigate to="home" replace/>
            },
            {
                path: 'home',
                element: <Home />
            },

            {
                path: 'mall',
                element: <Mall />
            },

            {
                path: 'user',
                element: <User />
            },
            {
                path: 'Others',
                element: <div> {/* 包裹一个div，用于布局或其他用途 */}
                    <Outlet /> {/* 使用Outlet组件渲染子路由 */}
                </div>,
                children: [
                    {
                        path: 'page1',
                        element: <Page1 />
                    }
                ]
            }
        ]
    },
    {
        path: '/login',
        Component: Login
    }
]




export default createBrowserRouter(routes);
