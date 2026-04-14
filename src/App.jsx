import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import Category from './Component/Category/Category';
import About from './Component/About/About';
import ContentComponent from './Component/Category/ContentComponent';
import RootHistory from './Component/Category/History/RootHistory';
import ExcavationComponent from './Component/Category/Excavation/ExcavationComponent';
import RootExcavation from './Component/Category/Excavation/RootExcavation';
import RootKing from './Component/Category/Kings/RootKing';
import RootTemple from './Component/Category/Temple/RootTemple';
import RootMythology from './Component/Category/Mythology/RootMythology';
import RootLord from './Component/Category/Lord/RootLord';
import RootWar from './Component/Category/War/RootWar';
import RootCulture from './Component/Category/Culture/RootCulture';
import RootArchitecture from './Component/Category/Architecture/RootArchitecture';
import RootHistoricalPlace from './Component/Category/Historical_Place/RootHistoricalPlace';
import RootPoet from './Component/Category/Poet/RootPoet';
import RootBooks from './Component/Category/Books/RootBooks';
import Login from './Component/LoginDetails/Login';
import SignUp from './Component/LoginDetails/SignUp';
import Podcast from './Component/Podcast/Podcast';
import Root from './Component/Root';
import Subcategory from './Component/Category/Subcategory/Subcategory';
import Error from './Component/Error/Error';
import ContactUs from './Component/Contact/Contact';
import { action as signUpAction } from './Component/LoginDetails/SignUp';
import ChangePassword from './Component/LoginDetails/ChangePassword';
import ResetPassword from './Component/LoginDetails/ResetPassword';
import { useContext, useEffect } from 'react';
import { Context } from './Context/contextApi';
import "./App.css";
import Homes from './Component/Homes/Homes';
import WriteContent from './Component/WriteContent/WriteContent';
const tokenVal = localStorage.getItem('token');
export default function App() {
  const { findUserFunction, handleToken, handleSetLoading } =
    useContext(Context);

  useEffect(() => {
    async function findUser() {
      try {
        handleSetLoading(true);
        let response = await fetch(
          `${process.env.REACT_APP_BACKEND_URL}/user/find-user`,
          {
            method: 'GET',
            headers: {
              Authorization: tokenVal,
            },
          },
        );

        if (!response.ok) {
          throw new Error('null');
        } else {
          let responseVal = await response.json();
          findUserFunction(responseVal);
          handleToken(responseVal);
        }
        handleSetLoading(false);
      } catch (error) {
        if (error.msg === 'null') {
          findUserFunction(null);
        }
        handleSetLoading(false);
      }
    }
    if (tokenVal) {
      findUser();
    }
  }, [findUserFunction, handleToken, handleSetLoading]);
  const router = createBrowserRouter([
    {
      path: '/',
      element: <Root />,
      errorElement: <Error />,
      children: [
        {
          index: true,
          element: <Homes />,
        },
        {
          path: 'category',
          element: <Category />,
        },
        {
          path: 'history/:historyValue',
          element: <RootHistory />,
          children: [
            {
              index: true,
              element: <ContentComponent />,
            },
          ],
        },
        {
          path: 'excavation',
          element: <RootExcavation />,
          children: [
            {
              index: true,
              element: <ExcavationComponent />,
            },
          ],
        },
        {
          path: 'war',
          element: <RootWar />,
          children: [
            {
              index: true,
              element: <ContentComponent />,
            },
          ],
        },
        {
          path: 'poet',
          element: <RootPoet />,
          children: [
            {
              index: true,
              element: <ContentComponent />,
            },
          ],
        },
        {
          path: 'category-books',
          element: <RootBooks />,
          children: [
            {
              index: true,
              element: <ContentComponent />,
            },
          ],
        },
        {
          path: 'architecture',
          element: <RootArchitecture />,
          children: [
            {
              index: true,
              element: <ContentComponent />,
            },
          ],
        },
        {
          path: 'historical_place',
          element: <RootHistoricalPlace />,
          children: [
            {
              index: true,
              element: <ContentComponent />,
            },
          ],
        },
        {
          path: 'culture',
          element: <RootCulture />,
          children: [
            {
              index: true,
              element: <ContentComponent />,
            },
          ],
        },
        {
          path: 'kings/:kingsValue',
          element: <RootKing />,
          children: [
            {
              index: true,
              element: <ContentComponent />,
            },
          ],
        },
        {
          path: 'temple',
          element: <RootTemple />,
          children: [
            {
              index: true,
              element: <ContentComponent />,
            },
          ],
        },
        {
          path: 'lord',
          element: <RootLord />,
          children: [
            {
              index: true,
              element: <ContentComponent />,
            },
          ],
        },
        {
          path: 'mythology',
          element: <RootMythology />,
          children: [
            {
              index: true,
              element: <ContentComponent />,
            },
          ],
        },

        {
          path: 'about',
          element: <About />,
        },

        {
          path: 'subcategory/:value',
          element: <Subcategory />,
        },
        {
          path: '/contact',
          element: <ContactUs />,
        },
        {
          path: 'podcast',
          element: <Podcast />,
        },
        {
          path: '/write',
          element: <WriteContent />,
        },
      ],
    },

    {
      path: '/login',
      element: <Login />,
    },
    {
      path: '/reset-password',
      element: <ResetPassword />,
    },
    {
      path: '/signUp',
      element: <SignUp />,
      action: signUpAction,
    },
    {
      path: '/change-password',
      element: <ChangePassword />,
    },
  ]);
  return <RouterProvider router={router}></RouterProvider>;
}
