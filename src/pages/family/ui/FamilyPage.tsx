import { FC, useState } from "react";

import { Tree } from "@shared/api/family";

import "./FamilyPage.scss";
import { ArrowDown, ArrowUp } from "@shared/ui/icons";
import { NavLink } from "@shared/ui";

type PageProps = {
  tree: Tree;
};

export const FamilyPage: FC<PageProps> = ({ tree }) => {
  const [showMore, setShowMore] = useState<boolean>(false);

  const nodeNavs =
    tree?.nodes.map((node) => (
      <NavLink path={`/person/${node.id}`} className="node-block" key={node.id}>
        <img className="avatar" src={node.avatar}></img>
        <p className="name">{node.name}</p>
      </NavLink>
    )) || [];

  return (
    <div className="family-content">
      <div className="name-wrapper">
        <p className="family-name">{tree?.family.name}</p>
      </div>
      <div className="family-nodes-wrapper">
        <p className="block-title">
          <span>Члены семьи</span>
          <span className="light">{` (${nodeNavs.length})`}</span>
        </p>
        {nodeNavs.length ? (
          showMore ? (
            <>
              <div className="family-nodes">{nodeNavs}</div>
              <div className="arrow-wrapper" onClick={() => setShowMore(false)}>
                <ArrowUp size={30} fill={"currentColor"} />
              </div>
            </>
          ) : (
            <>
              <div className="family-nodes">{nodeNavs.slice(0, 8)}</div>
              {nodeNavs.length > 8 && (
                <div
                  className="arrow-wrapper"
                  onClick={() => setShowMore(true)}
                >
                  <ArrowDown size={30} fill={"currentColor"} />
                </div>
              )}
            </>
          )
        ) : (
          <div className="no-nodes-wrapper">
            <p>Вы еще не добавили ни одного члена семьи</p>
          </div>
        )}
      </div>
      <NavLink className="add-person" path="/person/add">
        <p>Добавить члена семьи</p>
      </NavLink>
      <div className="family-album"></div>
      <div className="settings"></div>
    </div>
  );
};
