import React from 'react';
import styled from 'styled-components';
import '@fortawesome/fontawesome-free/css/all.min.css';

const Address = styled.p`
  font-size: 1.2em;
  margin-bottom: 20px;
  display: flex;
  justify-content: center;
  font-weight: bold;
`;

const Maps = styled.div`
  position: relative;
  display:flex;
  justify-content:center;
  iframe {
    width: 100%;
    max-width: 600px;
    height: 450px;
    border: 0;
  }
`;

const Mail = styled.p`
  display: flex;
  justify-content: center;
  margin-top: 12px;
  
`;

const Footer = styled.footer`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 20px;
  padding: 10px;
  background-color: #ef5350;
  color: white;
  text-align: center;
  position:relative
`;

const SocialMediaLinks = styled.div`
  display: flex;
  justify-content: flex-start;
  margin-top: 10px;
  width:100%;
  padding:0 20px;
  
  a {
    margin: 10px;
    text-decoration: none;
    color: white;
    font-size: 1.6em;
    margin-left:30px;
    transition: transform 0.3s ease;

    &:hover{
      transform: scale(1.4);
    }
  }
`;
const Copyright = styled.div`
  width: 100%;
  text-align: center;
  margin-top: 2px;
`;

const Connect = () => {
  return (
    <>
      <Address>
        17/c, Vivekananda Nagar <br />
        Belghoria Kolkata-700056
      </Address>
      <Mail>
        <p>fitgym24@gmail.com || 033- 8564 5489</p>
      </Mail>
      <Maps>
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3681.76988987095!2d88.38773307560137!3d22.662366579427918!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39f89c32f84de805%3A0x2d41024823e1a995!2s17%2C%20Vivekananda%20Nagar%20Rd%2C%20East%20Belgharia%2C%20Mandal%20Para%20Bat%20Tala%2C%20Belghoria%2C%20Kolkata%2C%20West%20Bengal%20700056!5e0!3m2!1sen!2sin!4v1721145327097!5m2!1sen!2sin"
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      </Maps>
      <Footer>
       
        <SocialMediaLinks>
        <p>Let's connect with us</p>
          <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
            <i className="fab fa-facebook-f"></i>
          </a>
          <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer">
            <i className="fab fa-twitter"></i>
          </a>
          <a href="https://www.instagram.com/itz_mohak0408?igsh=MWZ3cGhwNjNyZjR3Mw==" target="_blank" rel="noopener noreferrer">
            <i className="fab fa-instagram"></i>
          </a>
         
        </SocialMediaLinks>
        <Copyright>
          <p>&copy; 2024 Fittrack. All rights are reserved.</p>
        </Copyright>
      </Footer>
    </>
  );
};

export default Connect;
