import React, { useState } from "react";
import { useContacts } from "../../hooks/useContacts";
import styled from "@emotion/styled";
import Contact from "../../components/Contact";
import { Link } from "react-router-dom";

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

const ContactContainer = styled.div`
  width: 100%;
  min-height: 100vh;
`;

const ContentContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ContactPageTitle = styled.h1`
  font-size: 24px;
  color: #05aa5b;
  font-weight: 600;
  text-align: center;
`;

const TextButtonWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
`;

const TextContact = styled.h2`
  font-size: 20px;
  font-weight: 600;
  width: 50%;
`;

const ButtonAddContact = styled(Link)`
  display: inline-block;
  padding: 8px 12px;
  background-color: #4caf50;
  color: white;
  text-decoration: none;
  border-radius: 5px;
  border: none;
  text-align: center;
  font-size: 16px;
  cursor: pointer;
`;

const SearchInput = styled.input`
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 16px;
  width: 300px;
  outline: none;
  margin-bottom: 10px;

  ::placeholder {
    color: #aaa;
  }

  &:focus {
    border-color: #4caf50;
  }
`;

const PaginationWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const ButtonPagination = styled.button`
  background-color: #4caf50;
  border: none;
  color: white;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  margin: 10px;
  cursor: pointer;
  border-radius: 5px;

  &:hover {
    background-color: #45a049;
  }
`;

const PageInfoText = styled.p`
  color: #000;
  font-size: 16px;
`;
const ListContact: React.FC = () => {
  const PAGE_SIZE = 10;
  const [page, setPage] = useState(0);
  const { data, error, loading } = useContacts(PAGE_SIZE, page);
  const [search, setSearch] = useState("");
  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
  };

  console.log(data);
  return (
    <ContactContainer>
      <ContentContainer>
        <ContactPageTitle>Phonebook App</ContactPageTitle>
        <TextButtonWrapper>
          <TextContact>Contacts</TextContact>
          <ButtonAddContact to="/add">Add Contact</ButtonAddContact>
        </TextButtonWrapper>
        <SearchInput
          placeholder="Search Contact With Name..."
          type="text"
          onChange={handleSearchChange}
        ></SearchInput>
        {loading && <div>Loading...</div>}
        {!loading &&
          data.contact.map((contact: ContactType, index: number) => (
            <Contact
              id={contact.id}
              key={contact.id}
              firstName={contact.first_name}
              lastName={contact.last_name}
              phones={contact.phones}
            ></Contact>
          ))}
        <PaginationWrapper>
          <ButtonPagination
            onClick={() => setPage((prev) => prev - 1)}
            disabled={page === 0}
          >
            Prev
          </ButtonPagination>
          <PageInfoText>Page {page + 1}</PageInfoText>
          <ButtonPagination onClick={() => setPage((prev) => prev + 1)}>
            Next
          </ButtonPagination>
        </PaginationWrapper>
      </ContentContainer>
    </ContactContainer>
  );
};

export default ListContact;
