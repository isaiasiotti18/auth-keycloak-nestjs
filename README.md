# AUTENTICAÇÃO E AUTORIZAÇÃO COM NESTJS & KEYCLOAK

- Criei esse sistema de autenticação e autorização para usar em uma aplicação que já estou desenvolvendo, e como tive um pouco de dificuldade no começo para entender como a API do Keycloak funcionava desenvolvi esse repositório

- Um vídeo que me ajudou muito foi esse logo abaixo:
  - https://www.youtube.com/watch?v=kIXs5k4gyuM&ab_channel=ArthurD.Mugume
  - Assistindo o vídeo vocês irão conseguir entender melhor o código desse repositório

- Quais motivos me levaram a usar o Keycloak?
  - Não entrarem em muitos detalhes de como o Keycloak funciona, Mas simplesmente é uma ferramenta extraordinária para autenticação e autorização, gerenciamento de identidade e acesso de aplicações/sistemas.
  - Open source
  - É administrado pela Red Hat

### Usando a aplicação

~~~
  
~~~

### Endpoints

~~~http
  Generate a JWT - http://localhost:3000/keycloak/login
  Generate a JWT ADMIN - http://localhost:3000/keycloak/gen-token-admin
  Create a new user - http://localhost:3000/keycloak/new-user
~~~