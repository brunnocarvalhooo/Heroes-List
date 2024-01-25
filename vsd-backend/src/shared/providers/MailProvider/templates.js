const welcome = ({ name, token }) => {
  return `
  <!DOCTYPE html>
  <html lang="pt-br">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Bem Vindo - Desafio</title>
  </head>
  <body>
    <h1>Olá ${name}</h1>
    <span>Seja bem vindo a nossa plataforma de listagem de herois</span>

    <br>
    <br>
  
    <a href="http://localhost:3000/activate/${token}">Clique aqui para ativar sua conta</a>
  </body>
  </html>
  `
}

const forgotPassword = ({ name, link }) => {
  return `
  <!DOCTYPE html>
  <html lang="pt-br">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Reset de senha - Desafio</title>
  </head>
  <body>
    <h1>Olá ${name}</h1>
    <span>Esqueceu sua senha? clique no link abaixo para resetar sua senha</span>

    <br>

    <a href="${link}">
      <h5>Clique aqui para resetar sua senha</h5>
    </a>
  </body>
  </html>
  `
}

module.exports = { welcome, forgotPassword }