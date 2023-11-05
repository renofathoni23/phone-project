import React, { useState, ChangeEvent, useEffect, FormEvent } from "react";
import { useGetContactDetail } from "../../hooks/useGetContactDetail";
import { useContactByName } from "../../hooks/useContactByName";
import { Params, useParams } from "react-router-dom";
import { useEditContact } from "../../hooks/useEditContact";
import styled from "@emotion/styled";
import { useNavigate } from "react-router-dom";
import BackIcon from "../../assets/back.png";

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
  @media (min-width: 768px) {
    width: 50%;
  }
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
  padding: 8px 12px;
  background-color: #4caf50;
  color: white;
  text-decoration: none;
  border-radius: 5px;
  border: none;
  text-align: center;
  font-size: 16px;
  cursor: pointer;
  margin-top: 30px;
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
const EditContact: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams<Params>();
  const parseId = id ? parseInt(id) : 0;

  const { data, error, loading } = useGetContactDetail(parseId);
  // console.log(data);
  const contact = data?.contact_by_pk;
  const initialData: FormData = {
    first_name: "",
    last_name: "",
    phones: [{ number: "" }],
  };
  const [formData, setFormData] = useState<FormData>(initialData);
  const [errorMessage, setErrorMessage] = useState("");

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

  const editContactMutation = useEditContact();
  const { data: dataContactByName } = useContactByName(
    formData.first_name,
    formData.last_name
  );

  console.log(dataContactByName);

  const handleFormSubmitEditContact = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const specialChars = /^[A-Za-z0-9 ]+$/;
      let name = `${formData.first_name} ${formData.last_name}`;
      if (name.trim() !== "") {
        setErrorMessage("");
        if (!specialChars.test(name)) {
          setErrorMessage("*Nama tidak boleh mengandung karakter");
        } else {
          if (dataContactByName.contact.length > 0) {
            setErrorMessage("*Nama sudah dipakai");
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
            navigate("/");
          }
        }
      } else {
        setErrorMessage("Nama tidak boleh dikosongkan");
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
        <EditContactPageTitle>Edit Contact</EditContactPageTitle>
        <form onSubmit={handleFormSubmitEditContact}>
          <TextInputTitle>Name</TextInputTitle>
          <InputWrapper>
            <InputFields
              type="text"
              name="first_name"
              value={formData.first_name}
              onChange={handleInputFirstName}
              placeholder="First Name"
              required
            ></InputFields>
            <InputFields
              type="text"
              name="last_name"
              value={formData.last_name}
              onChange={handleInputLastName}
              placeholder="Last Name"
            ></InputFields>
          </InputWrapper>
          {errorMessage && <ErrorMessageName>{errorMessage}</ErrorMessageName>}
          <TextInputTitle>Phone Numbers</TextInputTitle>
          <InputWrapper>
            {formData.phones.map((phone, index) => (
              <InputFields
                key={index}
                type="text"
                name="number"
                placeholder="Phone Number"
                value={phone.number}
                disabled
              ></InputFields>
            ))}
          </InputWrapper>
          <ButtonSubmitWrapper>
            <ButtonSubmitForm type="submit">Submit</ButtonSubmitForm>
          </ButtonSubmitWrapper>
        </form>
      </ContentContainer>
    </EditContactContainer>
  );
};

export default EditContact;
