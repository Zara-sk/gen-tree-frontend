import { FC } from "react";

import { useParams } from "@shared/lib/react-router";

import "./TreePage.scss";

type PageProps = {
  family_id?: number;
};

export const TreePage: FC<PageProps> = (props) => {
  const { family_id } = useParams(props);
  return <div>TreePage family_id: {family_id}</div>;
};
