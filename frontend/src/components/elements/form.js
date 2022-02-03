import styled from 'styled-components'

export const LoginForm = styled.form`
  display: flex;
  flex-direction: column;
  padding:2rem 3rem;
  margin:0 auto;
  max-width:40%;
  min-width:200px;
`;

export const AddNewForm = styled.form`
  display: flex;
  flex-direction: column;
  padding:2rem 3rem;
  width:400px;
  text-align:left;
`;

export const EditForm = styled.form`
display:flex;
flex-direction:column;`

export const FormButton = styled.button`
  padding: 5px 15px;
  border-radius: 5px;
  margin:10px 10px;
  border: none;
  color: white;
  background: #FFAD60;
  cursor:pointer;
  :hover {
    background:#dc3c3c;
    transition:.2s;
  }
  :disabled {
      color:grey;
    background:#eeeeec;
  }
`;

export const FormSelect = styled.select`
padding:5px 15px;
border-radius: 5px;
border:none;
background: #eeeeec;
margin-bottom:10px;`


export const FormLabel = styled.label`
  font-weight: 600;
  margin-bottom:5px;
`;

export const FormInput = styled.input`
margin-bottom:10px;
border:none;
background:#eeeeec;
padding:5px 15px;
border-radius:5px;`