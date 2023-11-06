import React, { useState, ChangeEvent, useEffect, FormEvent } from "react";
import { useGetContactDetail } from "../../hooks/useGetContactDetail";
import { useContactByName } from "../../hooks/useContactByName";
import { Params, useParams } from "react-router-dom";
import { useEditContact } from "../../hooks/useEditContact";
import { useNavigate } from "react-router-dom";
import styled from "@emotion/styled";
import BackIcon from "../../assets/back.png";
import EditNumberFields from "../../components/EditNumberFields";
import { useDelete } from "../../hooks/useDelete";

interface Phone {
  number: string;
}

interface FormData {
  first_name: string;
  last_name: string;
  phones: Phone[];
}

const EditContactContainer = styled.div`
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
  padding: 0px 5px;
  box-sizing: border-box;
  @media (min-width: 768px) {
    width: 50%;
    padding: 0px;
  }
`;

const ContactNameWrapper = styled.div`
  width: 95%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const EditContactPageTitle = styled.h1`
  font-size: 24px;
  color: #05aa5b;
  font-weight: 600;
  text-align: center;
`;

const TextInputTitle = styled.h2`
  font-size: 20px;
  font-weight: 600;
  width: 50%;
`;

const InputWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

const InputFields = styled.input`
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 16px;
  width: 90%;
  outline: none;
  margin-bottom: 10px;
`;

const ButtonSubmitWrapper = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
`;

const ButtonSubmitForm = styled.button`
  display: inline-block;
  padding: 4px 10px;
  background-color: #4caf50;
  color: white;
  text-decoration: none;
  border-radius: 5px;
  border: none;
  text-align: center;
  font-size: 16px;
  cursor: pointer;
  margin-top: 10px;
`;

const ErrorMessageName = styled.p`
  color: #ff0000;
  margin-top: 0px;
`;

const BackButtonWrapper = styled.a`
  display: flex;
  justify-content: center;
  align-items: center;
  text-decoration: none;
  width: 30px;
  height: 30px;
  position: absolute;
  top: 0;
  left: 0;
  @media (min-width: 768px) {
    top: 5px;
    left: 10px;
  }
`;

const BackIconImg = styled.img`
  width: 24px;
  height: 24px;
`;

const EditButton = styled.button`
  display: inline-block;
  padding: 4px 8px;
  background-color: #ffa500;
  color: white;
  text-decoration: none;
  border-radius: 5px;
  border: none;
  text-align: center;
  font-size: 16px;
  cursor: pointer;
`;

const CancelButtonName = styled.button`
  display: inline-block;
  padding: 4px 8px;
  background-color: #ff0000;
  color: white;
  text-decoration: none;
  border-radius: 5px;
  border: none;
  text-align: center;
  font-size: 16px;
  cursor: pointer;
`;

const ButtonDeleteContact = styled.button`
  width: 140px;
  display: inline-block;
  padding: 8px;
  background-color: #ff0000;
  color: white;
  text-decoration: none;
  border-radius: 5px;
  border: none;
  text-align: center;
  font-size: 16px;
  cursor: pointer;
  margin-top: 10px;
`;

const EditContact: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams<Params>();
  const parseId = id ? parseInt(id) : 0;
  const { data, loading } = useGetContactDetail(parseId);
  const contact = data?.contact_by_pk;
  const initialData: FormData = {
    first_name: "",
    last_name: "",
    phones: [{ number: "" }],
  };
  const [formData, setFormData] = useState<FormData>(initialData);
  const [errorMessage, setErrorMessage] = useState("");
  const [isNameEdited, setIsNameEdited] = useState(false);

  useEffect(() => {
    if (data && contact) {
      const { first_name, last_name, phones } = contact;
      setFormData({ first_name, last_name, phones });
    }
  }, [data, contact]);

  const handleInputFirstName = (e: ChangeEvent<HTMLInputElement>) => {
    setErrorMessage("");
    const { value } = e.target;
    setFormData({ ...formData, first_name: value });
  };

  const handleInputLastName = (e: ChangeEvent<HTMLInputElement>) => {
    setErrorMessage("");
    const { value } = e.target;
    setFormData({ ...formData, last_name: value });
  };

  const { editContactMutation } = useEditContact();
  const { data: dataContactByName } = useContactByName(
    formData.first_name,
    formData.last_name
  );
  const { deleteContactMutation } = useDelete();
  const handleContactDelete = async (e: FormEvent) => {
    e.preventDefault();
    try {
      await deleteContactMutation({ variables: { id: parseId } });
      navigate("/");
    } catch (error) {
      console.error(error);
    }
  };

  const handleFormSubmitEditContact = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const specialChars = /^[A-Za-z0-9 ]+$/;
      let name = `${formData.first_name} ${formData.last_name}`;
      if (name.trim() !== "") {
        setErrorMessage("");
        if (!specialChars.test(name)) {
          setErrorMessage("*Name must not contain characters");
        } else {
          if (dataContactByName.contact.length > 0) {
            setErrorMessage("*Name is already in use");
          } else {
            await editContactMutation({
              variables: {
                id: parseId,
                _set: {
                  first_name: formData.first_name,
                  last_name: formData.last_name,
                },
              },
            });
            window.location.reload();
          }
        }
      } else {
        setErrorMessage("Nama cannot be left blank");
      }
    } catch (error) {
      console.error("Error while adding contact:", error);
    }
  };

  if (loading) {
    return <div>loading...</div>;
  }

  return (
    <EditContactContainer>
      <BackButtonWrapper as="a" href="/">
        <BackIconImg src={BackIcon} alt="back-icon"></BackIconImg>
      </BackButtonWrapper>
      <ContentContainer>
        <EditContactPageTitle>View Contact</EditContactPageTitle>
        <form onSubmit={handleFormSubmitEditContact}>
          <ContactNameWrapper>
            <TextInputTitle>Name</TextInputTitle>
            {isNameEdited ? (
              <CancelButtonName
                type="button"
                onClick={() => setIsNameEdited(false)}
              >
                Cancel
              </CancelButtonName>
            ) : (
              <EditButton type="button" onClick={() => setIsNameEdited(true)}>
                Edit Name
              </EditButton>
            )}
          </ContactNameWrapper>
          <InputWrapper>
            <InputFields
              type="text"
              name="first_name"
              value={formData.first_name}
              onChange={handleInputFirstName}
              placeholder="First Name"
              readOnly={!isNameEdited}
              data-testid="input-first-name"
            ></InputFields>
            <InputFields
              type="text"
              name="last_name"
              value={formData.last_name}
              onChange={handleInputLastName}
              placeholder="Last Name"
              readOnly={!isNameEdited}
            ></InputFields>
          </InputWrapper>
          {errorMessage && <ErrorMessageName>{errorMessage}</ErrorMessageName>}
          {isNameEdited && (
            <ButtonSubmitWrapper>
              <ButtonSubmitForm type="submit">Save</ButtonSubmitForm>
            </ButtonSubmitWrapper>
          )}
        </form>
        <TextInputTitle>Phone Numbers</TextInputTitle>
        <InputWrapper>
          {formData.phones.map((phone, index) => (
            <EditNumberFields
              key={index}
              idContact={parseId}
              prevNumber={phone.number}
            ></EditNumberFields>
          ))}
        </InputWrapper>
        <ButtonDeleteContact type="button" onClick={handleContactDelete}>
          Delete Contact
        </ButtonDeleteContact>
      </ContentContainer>
    </EditContactContainer>
  );
};

export default EditContact;
