import React from 'react'
import { useState } from 'react';
import {
  AiFillApple,
  AiFillAppstore,
  AiFillChrome,
  AiFillFacebook,
  AiFillGoogleCircle,
  AiFillInstagram,
  AiFillOpenAI,
  AiFillLinkedin,
  AiFillGithub,
} from "react-icons/ai";

const Section1Hooks = () => {
  const [companyLogo] = useState([
    { logo: AiFillApple, name: "Apple" },
    { logo: AiFillAppstore, name: "Microsoft" },
    { logo: AiFillChrome, name: "Chrome" },
    { logo: AiFillFacebook, name: "Facebook" },
    { logo: AiFillGoogleCircle, name: "Google" },
    { logo: AiFillInstagram, name: "Instagram" },
    { logo: AiFillOpenAI, name: "OpenAI" },
    { logo: AiFillLinkedin, name: "LinkedIn" },
    { logo: AiFillGithub, name: "GitHub" },
  ]);
  return companyLogo

}

export default Section1Hooks
