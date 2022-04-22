# Modelos
O banco de dados utilizado nesta aplicação é o **[MongoDB](https://www.mongodb.com/pt-br)**.
## Criação de usuários
**Endpoint:** `http://localhost/user`  
**Tipo:** `POST`  
```json
{
	"name": "Hudson",
	"email": "hudson.santosr@gmail.com",
	"password": "32382989aaA@",
	"phone": "11911062222",
	"cpf": "14114394737"
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
		"email": "hudson.santosr@gmail.com",
		"phone": "(00)90000-0000",
		"_id": "8e6aeb76-1013-4beb-bd31-db7339b1945f",
		"createdAt": "2022-04-22T22:41:43.173Z",
		"updatedAt": "2022-04-22T22:41:43.173Z",
		"__v": 0
	},
	"token": "<JSON Web Token>"
}
```