import { FC, useState } from "react";
import * as yup from "yup";

import { Tree } from "@shared/api/family";

import "./FamilyPage.scss";
import { ArrowDown, ArrowUp } from "@shared/ui/icons";
import { NavLink } from "@shared/ui";

type PageProps = {
  tree: Tree;
};

const addSchema = yup.object().shape({
  name: yup.string().required(),
  surname: yup.string(),
  patronyc: yup.string(),
  addInfo: yup.string(),
  birthDate: yup.string(),
  endDate: yup.string(),
});

export const CreatePage: FC<PageProps> = ({ tree }) => {
  const [showMore, setShowMore] = useState<boolean>(false);

  const nodeNavs =
    tree?.nodes.map((node) => (
      <NavLink path={`/person/${node.id}`} className="node-block" key={node.id}>
        <div className="avatar"></div>
        <p className="name">{node.name}</p>
      </NavLink>
    )) || [];

  return (
    <div className="person-add-content">
      <form className="add-form">
        <label>
          <span>Имя</span>
          <input />
        </label>
        <label>
          <span>Фамилия</span>
          <input />
        </label>
        <label>
          <span>Отчество</span>
          <input />
        </label>
      </form>
    </div>
  );
};
