import React, { useState } from 'react'
import styled from 'styled-components';
import TextInput from "./TextInput"
import  Button  from './Button';
import {UserSignIn} from "../api";
import { useDispatch } from 'react-redux';
import { loginSuccess } from '../redux/reducers/userSlice';


const Container =styled.div`
width: 100%;
 max-width: 500px;
 display:flex;
 flex-direction:column;
 gap:38px;
`;
const Title =styled.div`
font-size: 30px;
font-weight:600;
color: ${({ theme }) => theme.text_primary};
`
const Span=styled.div`font-size: 16px;
font-weight: 400;
color: ${({ theme }) => theme.text_secondary + 90};`

const SignIn = () => {
  const dispatch= useDispatch();
  const [loading, setLoading]= useState(false);
  const [buttonDiasbled, setButtonDiasabled]= useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword]= useState("");

  const validateInputs = ()=> {
    if (!email || !password){
      alert("Please fill all the fields 🙏");
      return false;
    }
    return true;
  };

  const handelSignIn = async () =>{
    setLoading(true);
    setButtonDiasabled(true);

    if (validateInputs()){
      await UserSignIn ({email, password})
      .then((res) =>{
        dispatch(loginSuccess(res.data));
        alert("Login success.");
        setLoading(false);
        setButtonDiasabled(false)
      })

    .catch((err) => {
      alert(err.response.data.message);
      setLoading(false);
      setButtonDiasabled(false)
    })
    }
  }

  return(
   <Container>
      <div>
        <Title>Welcome to FitTrack 👋</Title>
        <Span>Please login with your details here</Span>
      </div>
      <div style={{
        display: "flex",
        gap:"25px",
        flexDirection: "column"


      }}>
<TextInput label="Email Address" placeholder="Enter your Email here" value={email} handelChange={(e) => setEmail(e.target.value)} />
<TextInput label="Password" placeholder="Enter your password" value={password} handelChange={(e) => setPassword(e.target.value)}
password
 />
<Button  text="SignIn"
         onClick={handelSignIn}
         isLoading={loading}
         isDisabled={buttonDiasbled}
 />
      </div>
    </Container>
  ) 
}



export default SignIn;
