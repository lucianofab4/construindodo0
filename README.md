# Luciano Dias — Site Pessoal

Site pessoal de marca pessoal. Frontend React no Netlify, backend FastAPI + PostgreSQL local.

---

## Stack

| Camada    | Tecnologia                  |
|-----------|-----------------------------|
| Frontend  | React 18 + Vite + Tailwind  |
| Backend   | Python 3.11 + FastAPI       |
| Banco     | PostgreSQL                  |
| Deploy FE | Netlify                     |

---

## Pré-requisitos

- Node.js 18+
- Python 3.11+
- PostgreSQL instalado e rodando

---

## 1. Banco de dados

```sql
-- No psql ou pgAdmin:
CREATE DATABASE lucianodias_db;
```

---

## 2. Backend

```bash
cd backend

# Copiar e configurar variáveis
cp .env.example .env
# Editar .env com sua senha do PostgreSQL

# Criar ambiente virtual
python -m venv venv
venv\Scripts\activate          # Windows
# source venv/bin/activate     # Linux/Mac

# Instalar dependências
pip install -r requirements.txt

# Criar tabelas + dados iniciais
python seed.py

# Rodar servidor
uvicorn app.main:app --reload --port 8000
```

Backend disponível em: http://localhost:8000
Docs automáticas: http://localhost:8000/docs

---

## 3. Frontend (desenvolvimento local)

```bash
cd frontend

# Copiar variáveis de ambiente
cp .env.example .env
# VITE_API_URL=http://localhost:8000  (já está correto para dev)

# Instalar dependências
npm install

# Rodar em desenvolvimento
npm run dev
```

Frontend disponível em: http://localhost:3000

---

## 4. Deploy no Netlify

### Via Netlify CLI

```bash
npm install -g netlify-cli
cd frontend
npm run build
netlify deploy --prod --dir=dist
```

### Via GitHub (recomendado)

1. Suba o repositório no GitHub
2. Conecte no [app.netlify.com](https://app.netlify.com)
3. Configure:
   - **Base directory:** `frontend`
   - **Build command:** `npm run build`
   - **Publish directory:** `frontend/dist`
4. Adicione a variável de ambiente no painel do Netlify:
   - `VITE_API_URL` = URL pública do seu backend (ex: `https://api.seudominio.com.br`)

> O arquivo `netlify.toml` já está configurado com os redirects necessários para o React Router.

---

## 5. Expor o backend publicamente

O backend roda local. Para que o Netlify (frontend) consiga chamar a API, você precisa expô-lo.

**Opções:**

| Opção         | Indicado para       | Como                          |
|---------------|---------------------|-------------------------------|
| ngrok         | Testes rápidos      | `ngrok http 8000`             |
| Railway.app   | Produção barata     | Deploy do `/backend` folder   |
| VPS própria   | Produção definitiva | PM2 + nginx + domínio próprio |

---

## Estrutura do projeto

```
construindodo0/
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar.jsx
│   │   │   └── Footer.jsx
│   │   ├── pages/
│   │   │   ├── Home.jsx
│   │   │   ├── About.jsx
│   │   │   ├── Blog.jsx
│   │   │   ├── BlogPost.jsx
│   │   │   ├── Projects.jsx
│   │   │   └── Contact.jsx
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   ├── netlify.toml
│   ├── package.json
│   ├── tailwind.config.js
│   └── vite.config.js
└── backend/
    ├── app/
    │   ├── main.py       ← FastAPI app + seed
    │   ├── database.py   ← Conexão PostgreSQL
    │   ├── models.py     ← Tabelas SQLAlchemy
    │   ├── schemas.py    ← Validação Pydantic
    │   └── routes.py     ← Endpoints da API
    ├── seed.py
    └── requirements.txt
```

---

## Personalização

- **Foto:** Substitua o placeholder `LD` por um `<img>` real nas páginas `Home.jsx` e `About.jsx`
- **Links sociais:** Atualize os URLs no `Footer.jsx` e `Contact.jsx`
- **Posts do blog:** Edite o array `posts` em `BlogPost.jsx` ou gerencie pelo banco via API
- **Domínio Netlify:** Configure domínio customizado no painel do Netlify (Settings → Domain)

---

## API Endpoints

| Método | Rota                  | Descrição              |
|--------|-----------------------|------------------------|
| GET    | `/api/posts`          | Listar posts           |
| GET    | `/api/posts/{slug}`   | Post individual        |
| GET    | `/api/projects`       | Listar projetos        |
| POST   | `/api/subscribers`    | Cadastrar email        |
| POST   | `/api/contact`        | Enviar mensagem        |
| GET    | `/health`             | Healthcheck            |
