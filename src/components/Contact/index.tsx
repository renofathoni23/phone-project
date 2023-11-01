import React from "react";
import styled from "@emotion/styled";
import { useDelete } from "../../hooks/useDelete";
import { Link } from "react-router-dom";

interface Props {
  id: number;
  firstName: string;
  lastName: string;
  phones: Phone[];
}

interface Phone {
  typeName: string;
  number: number;
}

const ContainerContact = styled(Link)`
  width: 100%;
  height: 70px;
  display: flex;
  flex-direction: row;
  background-color: #fff;
  margin-bottom: 5px;
  overflow-x: scroll;
  text-decoration: none;
  color: #000;
`;

const ContactInfoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 70%;
  padding: 0px 5px;
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
  width: 30%;
  display: flex;
  flex-direction: row;
  column-gap: 5px;
  justify-content: flex-end;
  padding: 0px 5px;
`;

const ButtonDelete = styled.button`
  background-color: #ff0000;
  border: none;
  color: white;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 10px;
  margin: 10px 0px;
  cursor: pointer;
  border-radius: 5px;
`;
const Contact: React.FC<Props> = (props) => {
  const { firstName, lastName, phones, id } = props;
  const { deleteContact, data, error, loading } = useDelete();
  const handleContactDelete = () => {
    deleteContact(id);
  };
  return (
    <ContainerContact to={`/contact/${id}`}>
      <ContactInfoWrapper>
        <ContactName>
          {firstName} {lastName}
        </ContactName>
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
        <ButtonDelete onClick={handleContactDelete}>Delete</ButtonDelete>
      </ContactActionWrapper>
    </ContainerContact>
  );
};

export default Contact;
