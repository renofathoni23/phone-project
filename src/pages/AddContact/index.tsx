import React, { ChangeEvent, useState, FormEvent } from "react";
import styled from "@emotion/styled";
import useAddContact from "../../hooks/useAddContact";
import { useNavigate } from "react-router-dom";

interface Phone {
  number: string;
}

interface FormData {
  first_name: string;
  last_name: string;
  phones: Phone[];
}

const initialData: FormData = {
  first_name: "",
  last_name: "",
  phones: [{ number: "" }],
};

const AddContactContainer = styled.div`
  width: 100%;
  min-height: 100vh;
`;

const ContentContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

const AddContactPageTitle = styled.h1`
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

const AddContact: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<FormData>(initialData);

  const handleInputFirstName = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setFormData({ ...formData, first_name: value });
  };

  const handleInputLastName = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setFormData({ ...formData, last_name: value });
  };

  const handleInputPhone = (
    e: ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const { value } = e.target;
    const newPhones = [...formData.phones];
    newPhones[index].number = value;
    setFormData({ ...formData, phones: newPhones });
  };

  const handleAddPhone = () => {
    setFormData({ ...formData, phones: [...formData.phones, { number: "" }] });
  };

  const addContactMutation = useAddContact();

  const handleFormSubmitAddContact = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const { data } = await addContactMutation({
        variables: {
          first_name: formData.first_name,
          last_name: formData.last_name,
          phones: formData.phones,
        },
      });
      navigate("/");
    } catch (error) {
      console.error("Error adding contact:", error);
    }
  };

  return (
    <AddContactContainer>
      <ContentContainer>
        <AddContactPageTitle>Add Contact</AddContactPageTitle>
        <form onSubmit={handleFormSubmitAddContact}>
          <TextInputTitle>Name</TextInputTitle>
          <InputWrapper>
            <input
              type="text"
              name="first_name"
              value={formData.first_name}
              onChange={handleInputFirstName}
              placeholder="Input First Name"
            ></input>
            <input
              type="text"
              name="last_name"
              value={formData.last_name}
              onChange={handleInputLastName}
              placeholder="Input Last Name"
            ></input>
          </InputWrapper>
          <TextInputTitle>Phone Numbers</TextInputTitle>
          <InputWrapper>
            {formData.phones.map((phone, index) => (
              <input
                key={index}
                type="text"
                name="number"
                value={phone.number}
                onChange={(e) => handleInputPhone(e, index)}
              ></input>
            ))}
          </InputWrapper>
          <button type="button" onClick={handleAddPhone}>
            Add Phone Number
          </button>
          <button>Submit</button>
        </form>
      </ContentContainer>
    </AddContactContainer>
  );
};

export default AddContact;
