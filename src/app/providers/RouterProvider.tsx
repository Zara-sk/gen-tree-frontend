// lazy, session
import { Navigate, useLocation, useParams, useRoutes } from "react-router-dom";

import { TreePage } from "@pages/tree";
import { CreatePage, FamilyPage, PersonPage } from "@pages/family";

import { Header } from "@widgets/header";
import { Footer } from "@widgets/footer";

import { useTree } from "@entities/family";
import { AuthGuard, GuestGuard, useUser } from "@entities/session";

import { URL_PATHS } from "@shared/lib/react-router";
import { Layout } from "@shared/ui";
import React from "react";

const CompWithParams = () => {
  const { id } = useParams();
  return <div>other with id: {id}</div>;
};

type AA = { comp: any };
type BB = ({ comp }: AA) => any;

const WithNode: BB = ({ comp }) => {
  const node_id = useParams();
  return comp({ node_id: Number(node_id) });
};

export const RouterProvider = () => {
  const user = useUser();
  const family_id = user?.family_id ?? -1;
  const tree = useTree();

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
          path: URL_PATHS.person_add,
          element: (
            <AuthGuard redirect={URL_PATHS.root}>
              <CreatePage tree={tree} />
            </AuthGuard>
          ),
        },
        {
          path: URL_PATHS.person,
          element: (
            <AuthGuard redirect={URL_PATHS.root}>
              <PersonPage />
            </AuthGuard>
          ),
        },
        {
          path: URL_PATHS.family,
          children: [
            {
              index: true,
              element: (
                <AuthGuard redirect={URL_PATHS.root}>
                  <FamilyPage tree={tree} />
                </AuthGuard>
              ),
            },
            {
              path: URL_PATHS.tree,
              element: (
                <AuthGuard redirect={URL_PATHS.root}>
                  <TreePage family_id={family_id} />
                </AuthGuard>
              ),
            },
            {
              path: URL_PATHS.albums,
              element: (
                <AuthGuard redirect={URL_PATHS.root}>
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
