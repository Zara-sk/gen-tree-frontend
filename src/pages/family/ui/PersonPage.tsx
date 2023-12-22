import { FC, useEffect, useState } from "react";

import { Node } from "@shared/api/family";

import "./ProfilePage.scss";
import { useTree } from "@entities/family";
import { useParams } from "react-router-dom";
import { Modal, NavLink } from "@shared/ui";
import { ArrowLeft, ArrowRight } from "@shared/ui/icons";

type PageProps = {
  // node_id: number;
};

export const PersonPage: FC<PageProps> = () => {
  const { node_id } = useParams();
  const tree = useTree();
  const node = tree?.nodes.find((node) => node.id == Number(node_id)) as Node;

  const avatarUrl =
    node.avatar ||
    "https://sun4-22.userapi.com/impf/vvCCHfNtrgZTFZyEJztzV7wyuIon-mIBEdt3nw/qxnrtKfImGc.jpg?size=607x1080&quality=96&sign=045ee5f77cdc9bc4dee104523fdd51fb&type=album";

  const [photoOpen, setOpenPhoto] = useState<boolean>(false);
  const [currentPhoto, setCurrentPhoto] = useState<string>("");
  const [currentPhotoIdx, setCurrentPhotoIdx] = useState<number>(0);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const photos = node.photos;
  const [selectedImage, setSelectedImage] = useState(null);

  const maris = tree?.marriages
    .filter((mar) => mar.husband_id == node.id || mar.wife_id == node.id)
    .map((mar) => {
      const another = mar.husband_id == node.id ? mar.wife_id : mar.husband_id;
      return tree.nodes.find((nd) => nd.id == another) as Node;
    });

  const childs = tree?.nodes.filter(
    (nd) => nd.mother_id == node.id || nd.father_id == node.id
  );

  const parrents = tree?.nodes.filter(
    (nd) => node.father_id == nd.id || node.mother_id == nd.id
  );

  const addPhoto = () => {};

  return (
    <div className="person-content">
      {photos && (
        <Modal isActive={photoOpen} closeModal={() => setOpenPhoto(false)}>
          <div className="listing">
            <div
              className="left"
              onClick={() => {
                const idx =
                  currentPhotoIdx == 0
                    ? photos.length - 1
                    : currentPhotoIdx - 1;
                setCurrentPhotoIdx(idx);
                setCurrentPhoto(photos[idx]);
              }}
            >
              <div className="wrapper-cont">
                <ArrowLeft fill={"white"} size={50} />
              </div>
            </div>
            <div
              className="right"
              onClick={() => {
                const idx =
                  currentPhotoIdx == photos.length - 1
                    ? 0
                    : currentPhotoIdx + 1;
                setCurrentPhotoIdx(idx);
                setCurrentPhoto(photos[idx]);
              }}
            >
              <div className="wrapper-cont">
                <ArrowRight fill={"white"} size={50} />
              </div>
            </div>
          </div>
          <img className="current-photo" src={currentPhoto} />
        </Modal>
      )}
      <div className="main-info">
        <img className="avatar" src={avatarUrl} />
        <div className="name">
          {node.surname && <p>{node.surname}</p>}
          <p>{node.name}</p>
          {node.patronymic && <p>{node.patronymic}</p>}
        </div>
      </div>
      {(node.addInfo || node.birthdate) && (
        <div className="add-info">
          <p className="alive-date">
            {node.birthdate && node.enddate
              ? `Годы жизни: ${node.birthdate} - ${node.enddate}`
              : node.birthdate && `Дата рождения: ${node.birthdate}`}
          </p>
          <p className="bio">{node.addInfo}</p>
        </div>
      )}
      {parrents && parrents?.length > 0 && (
        <div className="tree">
          <p className="tree-title">Родители</p>
          <div className="tree-nodes-wrapper">
            {parrents.map((nd) => (
              <NavLink
                path={`/person/${nd.id}`}
                className="node-block"
                key={nd.id}
              >
                <img src={nd.avatar} className="avatar"></img>
                <p className="name">{nd.name}</p>
              </NavLink>
            ))}
          </div>
        </div>
      )}
      {maris && maris?.length > 0 && (
        <div className="tree">
          <p className="tree-title">Супруги</p>
          <div className="tree-nodes-wrapper">
            {maris.map((nd) => (
              <NavLink
                path={`/person/${nd.id}`}
                className="node-block"
                key={nd.id}
              >
                <img src={nd.avatar} className="avatar"></img>
                <p className="name">{nd.name}</p>
              </NavLink>
            ))}
          </div>
        </div>
      )}
      {childs && childs?.length > 0 && (
        <div className="tree">
          <p className="tree-title">Дети</p>
          <div className="tree-nodes-wrapper">
            {childs.map((nd) => (
              <NavLink
                path={`/person/${nd.id}`}
                className="node-block"
                key={nd.id}
              >
                <img src={nd.avatar} className="avatar"></img>
                <p className="name">{nd.name}</p>
              </NavLink>
            ))}
          </div>
        </div>
      )}
      {node.photos?.length ? (
        <div className="album">
          <label
            className="album-add"
            onClick={() => {
              addPhoto();
            }}
          >
            <input
              type="file"
              name="image"
              onChange={(e) => {
                console.log(e.target.files && e.target.files[0]);
              }}
              placeholder="asd"
            />
            <p className="add">+</p>
          </label>
          {node.photos.map((url, i) => (
            <div
              onClick={() => {
                setCurrentPhoto(url);
                setOpenPhoto(true);
                setCurrentPhotoIdx(i);
              }}
            >
              <img className="album-photo" src={url} />
            </div>
          ))}
        </div>
      ) : (
        ""
      )}
    </div>
  );
};
