## Documentação da API - Autenticação

### 1. POST /usuarios

**Descrição:** Cadastra um novo usuário

**Body da requisição (JSON):**

```json
{
  "nome": "Felipe",
  "email": "felipe@email.com",
  "senha": "123456"
}
```

**Respostas:**

- **201 Created:**

```json
{
  "id": 1,
  "nome": "Felipe",
  "email": "felipe@email.com"
}
```

- **400 Bad Request (ex: e-mail já cadastrado):**

```json
{
  "erro": "E-mail já cadastrado"
}
```

---

### 2. POST /login

**Descrição:** Faz login de um usuário e retorna um token JWT

**Body da requisição (JSON):**

```json
{
  "email": "felipe@email.com",
  "senha": "123456"
}
```

**Respostas:**

- **200 OK:**

```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6...",
  "nome": "Felipe"
}
```

- **401 Unauthorized (credenciais inválidas):**

```json
{
  "erro": "E-mail ou senha inválidos"
}
```

---

### Observações Técnicas

- As senhas são armazenadas de forma criptografada usando bcrypt.
- O token JWT retornado deve ser enviado no cabeçalho Authorization (Bearer Token) nas rotas protegidas (em futuras implementações).

---

## Documentação da API - Tarefas

### 1. GET /tarefas

**Descrição:** Retorna todas as tarefas cadastradas.

**Resposta (200):**

```json
[
  {
    "id": 1,
    "titulo": "Estudar Node.js",
    "concluida": false
  },
  {
    "id": 2,
    "titulo": "Ler sobre PostgreSQL",
    "concluida": true
  }
]
```

---

### 2. POST /tarefas

**Descrição:** Cria uma nova tarefa.

**Body esperado:**

```json
{
  "titulo": "Fazer API REST",
  "concluida": false
}
```

**Resposta (201):**

```json
{
  "id": 3,
  "titulo": "Fazer API REST",
  "concluida": false
}
```

---

### 3. PUT /tarefas/\:id

**Descrição:** Atualiza os dados de uma tarefa existente.

**Exemplo de rota:** `/tarefas/3`

**Body esperado:**

```json
{
  "titulo": "Fazer API RESTful",
  "concluida": true
}
```

**Resposta (200):**

```json
{
  "id": 3,
  "titulo": "Fazer API RESTful",
  "concluida": true
}
```

**Erro (404):**

```json
{
  "erro": "Tarefa não encontrada"
}
```

---

### 4. DELETE /tarefas/\:id

**Descrição:** Remove uma tarefa pelo ID.

**Exemplo de rota:** `/tarefas/3`

**Resposta (204):**

Sem corpo. Apenas status 204 No Content.

**Erro (404):**

```json
{
  "erro": "Tarefa não encontrada"
}
```

---

## Status possíveis

- `200 OK` — Requisição bem-sucedida
- `201 Created` — Recurso criado com sucesso
- `204 No Content` — Deleção bem-sucedida sem conteúdo
- `400 Bad Request` — Requisição malformada
- `404 Not Found` — Recurso não encontrado
- `500 Internal Server Error` — Erro no servidor

---

Se precisar de mais detalhes ou quiser simular as chamadas, avise!

