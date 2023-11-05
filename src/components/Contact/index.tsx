import React from "react";
import styled from "@emotion/styled";
import { Link } from "react-router-dom";
import DeleteIcon from "../../assets/delete.png";
import FavoriteIcon from "../../assets/favorite.png";

interface Phone {
  typeName: string;
  number: number;
}

interface ContactType {
  id: number;
  first_name: string;
  last_name: string;
  phones: Phone[];
}

interface Props {
  id: number;
  firstName: string;
  lastName: string;
  phones: Phone[];
  isFavorite?: true | null;
  addToFavorite: (contact: ContactType) => void;
  deleteFromFavorite: (id: number) => void;
}

const ContainerContact = styled.div`
  width: 100%;
  height: 70px;
  display: flex;
  flex-direction: row;
  background-color: #fff;
  margin-bottom: 5px;
  overflow-x: scroll;
  color: #000;
`;

const ContactInfoWrapper = styled(Link)`
  display: flex;
  flex-direction: column;
  width: calc(100% - 89px);
  box-sizing: border-box;
  padding: 0px 5px;
  text-decoration: none;
  color: #000;
  z-index: 0;
`;

const ContactNameWrapper = styled.div`
  display: flex;
  overflow-x: auto;
`;

const ContactName = styled.p`
  font-size: 16px;
  font-weight: 600;
  margin: 5px 0px;
`;

const PhoneWrapper = styled.div`
  display: flex;
  flex-direction: row;
  column-gap: 5px;
  overflow-x: scroll;
`;

const PhoneText = styled.p`
  font-size: 12px;
  color: #000;
  margin-top: 8px;
`;

const PhoneNumberText = styled.p`
  font-size: 10px;
  color: #aaa;
  margin: 0;
`;

const ContactActionWrapper = styled.div`
  width: 89px;
  display: flex;
  flex-direction: row;
  column-gap: 5px;
  justify-content: flex-end;
`;

const ButtonDelete = styled.button`
  border: none;
  color: #fff;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 10px;
  cursor: pointer;
  z-index: 1;
  background-color: #c70000;
  &:hover {
    background-color: #24a0ed;
  }
`;

const FavoriteButton = styled.button`
  border: none;
  color: #fff;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 10px;
  cursor: pointer;
  z-index: 1;
  background-color: #ffa500;
  &:hover {
    background-color: #24a0ed;
  }
`;

const Contact: React.FC<Props> = (props) => {
  const {
    firstName,
    lastName,
    phones,
    id,
    isFavorite,
    addToFavorite,
    deleteFromFavorite,
  } = props;

  const handleAddFavorite = (contact: ContactType) => {
    addToFavorite(contact);
  };

  const handleDeleteFromFavorite = (id: number) => {
    deleteFromFavorite(id);
  };
  return (
    <ContainerContact>
      <ContactInfoWrapper to={`/contact/${id}`}>
        <ContactNameWrapper>
          <ContactName>
            {firstName} {lastName}
          </ContactName>
        </ContactNameWrapper>
        <PhoneNumberText>Phone Number:</PhoneNumberText>
        <PhoneWrapper>
          {phones.map((phone: Phone, index: number) => (
            <PhoneText key={index}>
              <span>&#8226;</span>
              {phone.number}
            </PhoneText>
          ))}
        </PhoneWrapper>
      </ContactInfoWrapper>
      <ContactActionWrapper>
        {!isFavorite ? (
          <FavoriteButton
            onClick={() =>
              handleAddFavorite({
                id: id,
                first_name: firstName,
                last_name: lastName,
                phones: phones,
              })
            }
          >
            <img
              src={FavoriteIcon}
              style={{ width: "30px" }}
              alt="favorite-icon"
            ></img>
          </FavoriteButton>
        ) : (
          <ButtonDelete onClick={() => handleDeleteFromFavorite(id)}>
            {" "}
            <img
              src={DeleteIcon}
              style={{ width: "30px" }}
              alt="delete-icon"
            ></img>
          </ButtonDelete>
        )}
      </ContactActionWrapper>
    </ContainerContact>
  );
};

export default Contact;
