import React, { useState } from 'react'
import styled from 'styled-components';
import LogoImage from '../utils/images/Logo (1).png';
import AuthImage from "../utils/images/AuthImage.jpg.jpg"
import SignIn from '../components/SignIn';
import SignUp from '../components/SignUp';

const Container = styled.div`
flex:1;
height:100%;
display:flex;
background: ${({ theme}) => theme.bg};
@media (max-width:700px){
    flex-direction:column;

}
`;

const Left = styled.div`
flex:1;
background:;
position:relative;
@media (max-width:700px){
    display:none;
    
}

`;
const Right= styled.div`
flex:1;
position:relative;
display:flex;
flex-direction:column;
padding:50px;
align-items: center;
justify-Content: center;

`;
const Logo= styled.img`
position:absolute;
width:70px;
top:30px;
left:60px;
z-index:10
`;

const Image= styled.img`
position:relative;
height:100%;
width:100%
`;


const Text = styled.div`
font-size:16px;
text-align:center;
color: ${({theme}) =>  theme.text_secondary};
margin-top: 26px;
@media (max-width:400px){
  font-size:14px;
}
`;
const TextButton= styled.div`
color: ${({ theme}) => theme.primary};
cursor: pointer;
  transition: all 0.3s ease;
  font-weight: 600;
`;

const Authentication = () => {
    const [login, setLogin] = useState(false);
  return <Container>
 <Left>
 <Left />
 <Logo src={LogoImage}/>
 <Image src={AuthImage} />
 </Left>
 <Right>{!login ?( <>
 <SignIn />
  <Text>
    Don't have an account? { " "}
    <TextButton onClick={()=> setLogin(true)}>Sign up</TextButton>
  </Text>
 </>):( <>
 <SignUp />
<Text>
  Already have an account? {" "}
   <TextButton onClick={()=> setLogin(false)}>Sign in</TextButton>
</Text>
 </> )}</Right>
  </Container>
}

export default Authentication
