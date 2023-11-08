// lazy, session
import { lazy } from "react";
import { Navigate, useParams, useRoutes } from "react-router-dom";

import { TreePage } from "@pages/tree";

import { Header } from "@widgets/header";
import { Footer } from "@widgets/footer";

import { AuthGuard, GuestGuard, isAuth, useUser } from "@entities/session";

import { URL_PATHS } from "@shared/lib/react-router";
import { Layout } from "@shared/ui";

const CompWithParams = () => {
  const { id } = useParams();
  return <div>other with id: {id}</div>;
};

export const RouterProvider = () => {
  const user = useUser();
  const family_id = user?.family_id ?? -1;

  return useRoutes([
    {
      element: <Layout header={<Header />} footer={<Footer />} />,
      children: [
        {
          path: URL_PATHS.root,
          element: <>main page</>,
        },
        {
          path: URL_PATHS.login,
          element: (
            <GuestGuard redirect={URL_PATHS.root}>
              <p>login</p>
            </GuestGuard>
          ),
        },
        {
          path: URL_PATHS.registration,
          element: (
            <GuestGuard redirect={URL_PATHS.root}>
              <p>registration</p>
            </GuestGuard>
          ),
        },
        {
          path: URL_PATHS.family,
          children: [
            {
              index: true,
              element: (
                <AuthGuard redirect={URL_PATHS.login}>
                  <p>family</p>
                </AuthGuard>
              ),
            },
            {
              path: URL_PATHS.tree,
              element: (
                <AuthGuard redirect={URL_PATHS.login}>
                  <TreePage family_id={family_id} />
                </AuthGuard>
              ),
            },
            {
              path: URL_PATHS.albums,
              element: (
                <AuthGuard redirect={URL_PATHS.login}>
                  <>albums</>
                </AuthGuard>
              ),
            },
            {
              path: URL_PATHS.other_family,
              children: [
                {
                  index: true,
                  element: <CompWithParams />,
                },
                {
                  path: URL_PATHS.tree,
                  element: <TreePage />,
                },
                {
                  path: URL_PATHS.albums,
                  element: <>albums</>,
                },
              ],
            },
          ],
        },
      ],
    },
    {
      path: URL_PATHS.page404,
      element: <p>404 page</p>,
    },
    {
      path: "*",
      element: <Navigate to={URL_PATHS.page404} replace />,
    },
  ]);
};
