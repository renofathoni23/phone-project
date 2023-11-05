import React, { useState, useEffect } from "react";
import { useContacts } from "../../hooks/useContacts";
import styled from "@emotion/styled";
import Contact from "../../components/Contact";
import { Link } from "react-router-dom";
import { useSearchContact } from "../../hooks/useSearchContact";
import TokopediaIcon from "../../assets/Tokopedia-icon.png";

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
  @media (min-width: 768px) {
    display: flex;
    justify-content: center;
  }
`;

const ContentContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  @media (min-width: 768px) {
    width: 50%;
  }
`;

const ContactPageTitleWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  column-gap: 10px;
  margin-bottom: 10px;
`;

const Logo = styled.img`
  width: 30px;
  height: 30px;
  @media (min-width: 769px) {
    width: 45px;
    height: 45px;
  }
`;

const ContactPageTitle = styled.h1`
  font-size: 24px;
  color: #05aa5b;
  font-weight: 600;
  text-align: center;
  @media (min-width: 769px) {
    font-size: 30px;
  }
`;

const TextContact = styled.h2`
  font-size: 20px;
  font-weight: 600;
  width: 50%;
`;

const ButtonAddContact = styled(Link)`
  display: inline-block;
  padding: 8px;
  background-color: #4caf50;
  color: white;
  text-decoration: none;
  border-radius: 5px;
  border: none;
  text-align: center;
  font-size: 16px;
  cursor: pointer;
  text-align: center;
  &:hover {
    background-color: #45a049;
  }
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

const SearchWrapper = styled.div`
  display: flex;
  flex-direction: row;
  column-gap: 10px;
`;

const TextWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const ListContact: React.FC = () => {
  const PAGE_SIZE = 10;
  const [page, setPage] = useState(() => {
    const storedPage = sessionStorage.getItem("page");
    return storedPage ? parseInt(storedPage) : 0;
  });
  const [searchInput, setSearchInput] = useState("");
  const [skipFetchAll, setSkipFetchAll] = useState(false);
  const [favoriteContact, setFavoriteContact] = useState<ContactType[]>(() => {
    const storedFavoriteData = localStorage.getItem("favorite-contact");
    return storedFavoriteData ? JSON.parse(storedFavoriteData) : [];
  });
  const { data, error, loading } = useContacts(PAGE_SIZE, page, skipFetchAll);
  const {
    loading: searchLoading,
    search: searchContact,
    data: searchData,
    error: searchError,
  } = useSearchContact();

  useEffect(() => {
    localStorage.setItem("favorite-contact", JSON.stringify(favoriteContact));
  }, [favoriteContact]);

  useEffect(() => {
    sessionStorage.setItem("page", JSON.stringify(page));
  }, [page]);

  useEffect(() => {
    const debounceSearching = setTimeout(() => {
      if (searchInput.trim()) {
        setSkipFetchAll(true);
        const name = searchInput.split(" ");
        const firstName = name[0];
        const lastName = name.slice(1).join(" ");
        searchContact({
          variables: {
            where: {
              first_name: { _ilike: `%${firstName.toLowerCase()}%` },
              last_name: { _ilike: `%${lastName.toLowerCase()}%` },
            },
          },
        });
      } else {
        setSkipFetchAll(false);
      }
    }, 500);

    return () => clearTimeout(debounceSearching);
  }, [searchInput, searchContact]);

  const handleNextPage = () => {
    setPage((prev) => prev + 1);
  };

  const handlePrevPage = () => {
    setPage((prev) => prev - 1);
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const search = event.target.value;
    setSearchInput(search);
  };

  const addToFavorite = (contact: ContactType) => {
    const isContactExist = favoriteContact.find(
      (favorite: ContactType) => favorite.id === contact.id
    );
    if (!isContactExist) {
      setFavoriteContact([...favoriteContact, contact]);
    }
  };

  const deleteFromFavorite = (id: number) => {
    const filteredFavoriteContact = favoriteContact.filter(
      (contact: ContactType) => contact.id !== id
    );

    setFavoriteContact(filteredFavoriteContact);
  };

  let displayedContacts = data || searchData;
  let displayLoading = loading || searchLoading;
  let displayError = error || searchError;

  return (
    <ContactContainer>
      <ContentContainer>
        <ContactPageTitleWrapper>
          <Logo src={TokopediaIcon}></Logo>
          <ContactPageTitle>Phonebook App</ContactPageTitle>
        </ContactPageTitleWrapper>
        <SearchWrapper>
          <SearchInput
            placeholder="Search Contact With Name..."
            type="text"
            onChange={handleSearchChange}
          ></SearchInput>
        </SearchWrapper>
        <TextWrapper>
          <TextContact>Favorite Contact</TextContact>
        </TextWrapper>
        {favoriteContact.length > 0 ? (
          favoriteContact?.map((contact) => (
            <Contact
              id={contact.id}
              key={contact.id}
              firstName={contact.first_name}
              lastName={contact.last_name}
              phones={contact.phones}
              addToFavorite={addToFavorite}
              isFavorite
              deleteFromFavorite={deleteFromFavorite}
            ></Contact>
          ))
        ) : (
          <div>There is no Favorite Contact</div>
        )}
        <TextWrapper>
          <TextContact>List Contact</TextContact>
          <ButtonAddContact to="/add">Add Contact</ButtonAddContact>
        </TextWrapper>
        {displayLoading && <div>Loading...</div>}
        {!displayLoading && displayedContacts.contact.length > 0 ? (
          displayedContacts.contact.map(
            (contact: ContactType, index: number) => (
              <Contact
                id={contact.id}
                key={contact.id}
                firstName={contact.first_name}
                lastName={contact.last_name}
                phones={contact.phones}
                addToFavorite={addToFavorite}
                deleteFromFavorite={deleteFromFavorite}
              ></Contact>
            )
          )
        ) : (
          <div>-</div>
        )}
        <PaginationWrapper>
          <ButtonPagination onClick={handlePrevPage} disabled={page === 0}>
            Prev
          </ButtonPagination>
          <PageInfoText>Page {page + 1}</PageInfoText>
          <ButtonPagination
            onClick={handleNextPage}
            disabled={displayedContacts?.contact.length < 10}
          >
            Next
          </ButtonPagination>
        </PaginationWrapper>
      </ContentContainer>
    </ContactContainer>
  );
};

export default ListContact;
