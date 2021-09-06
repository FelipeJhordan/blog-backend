# blog-backend

## Tecnologias utilizadas
- NodeJS ( Ambiente de desenvolvimento )
- Express ( Framework backend )
- Sequelize ( ORM )
- Mysql ( Banco de dados)
- Cors ( Permitir compartilhamento de recursos)
- Bcrypt ( Criptografia )
- dotenv ( Pegar váriaveis de ambiente )
- jsonwebtoken ( Gerar e recuperar token )
- pm2 (Gerenciador de processo)

## Plataforma de hospedagem
A plataforma de hospedagem utilizada é Amazom EC2, em um servidor Ubuntu, no ip 15.228.99.8:3333

## Como utilizar
Para rodar em ambiente de desenvolvimento é apenas necessário  executar o comando: npm run dev
Para rodar direto pelo node é apenas necessário executar o comando: npm run start 

## Links
Repositório Front-end: https://github.com/FelipeJhordan/blog-frontend
Ip 15.228.99.8:3333
## Exemplo arquivo
BD_USER='user'                                                                                                                                                                
BD_DATABASE='db_example'                                                                                                                                                        
BD_HOST='localhost'
BD_DIALECT='mysql' || 'pg' || 'sqlite' || 'oracle' || some other                                                                                                               
BD_PASSWORD='mypassword12345'                                                                                                                                                   
BD_PORT=3306                                                                                                                                                                      
BD_LOGGING=0                                                                                                                                                                                                                                                                                                                                                           

ADDRESS_IP_FRONT_LOCAL=32122                                                                                                                                    
ADDRESS_PORT=555                                                                                                                                                                   
OPTION_RUN= case info and others | case 2 = all minus info | case 3 = warn and options above || case 4 = only error                                                                 

KEY_JWT="312312"

# Testes
Foi utilizado o aplicativo postman para validar o funcionamento da api                                                                                                                                    
[![Run in Postman](https://run.pstmn.io/button.svg)](https://app.getpostman.com/run-collection/321c15f7e701c06a3f84?action=collection%2Fimport)
