import './App.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Store from './redux/Store';
import { Provider } from 'react-redux'
import AuthWrapper from './Wrappers/AuthWrapper'
import UnAuthWrapper from './Wrappers/UnAuthWrapper'
import Test from './Test';
import NewChat from './pages/chat/NewChat';
import CurrentChat from './pages/chat/CurrentChat';
import SignUp from './pages/auth/SignUp';
import SignIn from './pages/auth/SignIn';
import ChatLayout from './layouts/ChatLayout';
import NotFound from './pages/extra/NotFound';
import RootLayout from './layouts/RootLayout';
import { useEffect, useState } from 'react';
import Contexts from './contexts/Contexts';
import Notes from './pages/chat/Notes';

export default function App() {
  const [isSmallScreen, setIsSmallScreen] = useState(false);

  useEffect(() => {
    const checkScreenSize = () => {
      setIsSmallScreen(window.innerWidth < 768); // Mobile & small tablets
    };

    checkScreenSize(); // Check on mount
    window.addEventListener('resize', checkScreenSize);

    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  // if (isSmallScreen) {
  //   return (
  //     <div className="h-screen flex items-center justify-center text-center bg-black text-gray-300 p-4">
  //       <p className="text-lg font-semibold">
  //         This application is not supported on small screens. Please use a desktop or tablet.
  //       </p>
  //     </div>
  //   );
  // }

  return (
    <Provider store={Store}>
      <Contexts>
        <RouterProvider router={router} />
      </Contexts>
    </Provider>
  );
}

const router = createBrowserRouter([
  {
    path: '/',
    Component: AuthWrapper(ChatLayout),
    children: [
      {
        index: true,
        Component: NewChat
      },
      {
        path: 'notes',
        Component: Notes,
      },
      {
        path: 'chats/:chat_id',
        Component: CurrentChat,
      },
    ]
  },
  {
    path: '/',
    Component: UnAuthWrapper(RootLayout),
    children: [
      {
        path: '/signup',
        Component: SignUp
      },
      {
        path: '/signin',
        Component: SignIn
      },
      {
        path: '/test',
        Component: Test
      },
      {
        path: '*',
        Component: NotFound
      }
    ]
  }
]);
