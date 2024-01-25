import { createGlobalStyle } from 'styled-components'

import background from '../assets/bg-black.png'

export default createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;

    @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&family=Ubuntu:wght@400;500;700&display=swap');
  }

  html, body, #root {
    font-family: 'Poppins', sans-serif;

    background: url(${background});
    background-size: cover; 
    background-position: center;
  }

  *, button, input {
    outline: 0;
  }

  button {
    cursor: pointer;
  }

  ul {
    list-style: none;
  }

  a {
    text-decoration: none;
  }
`
