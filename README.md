# Modelos
O banco de dados utilizado nesta aplicação é o **[MongoDB](https://www.mongodb.com/pt-br)**.
## Criação de usuário
**Endpoint:** `http://localhost/users`  
**Tipo:** `POST`  
```json
{
	"name": "Hudson",
	"email": "hudson@hudson.com",
	"password": "<Senha>",
	"phone": "<Telefone>",
	"cpf": "<CPF>"
}
```
**Output:**  
```json
{
	"user": {
		"avatarUrl": null,
		"admin": false,
		"provider": false,
		"client": true,
		"name": "Hudson",
		"email": "hudson@hudson.com",
		"phone": "(00)90000-0000",
		"_id": "<UUIDv4>",
		"createdAt": "2022-04-22T22:41:43.173Z",
		"updatedAt": "2022-04-22T22:41:43.173Z",
		"__v": 0
	},
	"token": "<JSON Web Token - Gerado>"
}
```

## Autenticação de usuário
**Endpoint:** `http://localhost/users/authenticate`  
**Tipo:** `POST`  
```json
{
	"email": "hudson@hudson.com",
	"password": "<Senha>"
}
```
**Output:**  
```json
{
	"user": {
		"avatarUrl": null,
		"admin": false,
		"provider": false,
		"client": true,
		"_id": "<UUIDv4>",
		"name": "Hudson",
		"email": "hudson@hudson.com",
		"phone": "(00)90000-0000",
		"createdAt": "2022-04-27T00:02:15.815Z",
		"updatedAt": "2022-04-27T00:44:54.802Z",
		"__v": 0
	},
	"token": "<JSON Web Token - Gerado>"
}
```

## Atualização de usuário
**Endpoint:** `http://localhost/users/profile/update` 
**Requisito:** `Bearer Token <JWT Token>` 
**Tipo:** `PUT`  
```json
{
	"name": "Hudson",
	"email": "hudson@hudson.com",
	"phone": "(00)90000-0000",
	"cpf": "<CPF>",
	"password": "<Nova senha>",
	"oldPassword": "<Senha atual>"
}
```
**Output:**  
```json
{
	"avatarUrl": null,
	"admin": false,
	"provider": false,
	"client": true,
	"_id": "<UUIDv4>",
	"name": "Hudson",
	"email": "hudson@hudson.com",
	"phone": "(00)90000-0000",
	"createdAt": "2022-04-27T00:02:15.815Z",
	"updatedAt": "2022-04-27T00:44:54.802Z",
	"__v": 0
}
```

## Esquecimento de senha de usuário
**Endpoint:** `http://localhost/users/password/forgot`  
**Requisito:** `Bearer Token <JWT Token>` 
**Tipo:** `POST`  
```json
{
	"email": "hudson@hudson.com"
}
```
**Response Code: 204 - Um token é gerado no banco de dados**  

## Reset de senha de usuário
**Endpoint:** `http://localhost/users/password/reset`  
**Tipo:** `POST`  
```json
{
	"token": "<Token gerado no esquecimento>",
	"password": "<Nova senha>"
}
```
**Response Code: 204 - A senha é alterada** 