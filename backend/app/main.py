import os
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv

from .database import engine, Base
from .routes import router
from . import models  # noqa: F401 — ensures models are registered

load_dotenv()

# Create all tables
Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="Luciano Dias — API",
    description="Backend do site pessoal de Luciano Dias",
    version="1.0.0",
)

# ── CORS ──────────────────────────────────────────────────────────────────
frontend_url = os.getenv("FRONTEND_URL", "http://localhost:3000")

allowed_origins = [
    frontend_url,
    "http://localhost:3000",
    "http://localhost:5173",
    # Netlify preview URLs
    "https://*.netlify.app",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=allowed_origins,
    allow_origin_regex=r"https://.*\.netlify\.app",
    allow_credentials=True,
    allow_methods=["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allow_headers=["*"],
)

# ── Routes ────────────────────────────────────────────────────────────────
app.include_router(router)


@app.get("/health")
def health():
    return {"status": "ok", "service": "lucianodias-api"}


# ── Seed data (development) ───────────────────────────────────────────────
def seed_data():
    """Insert initial data if tables are empty."""
    from .database import SessionLocal
    from .models import Post, Project

    db = SessionLocal()
    try:
        if db.query(Post).count() == 0:
            posts = [
                Post(
                    title="O dia que decidi sair do CLT",
                    slug="o-dia-que-decidi-sair-do-clt",
                    excerpt="Não foi uma decisão heroica. Foi o acúmulo de frustração com anos construindo sonhos de outros.",
                    content="# O dia que decidi sair do CLT\n\nNão foi um momento épico...",
                    category="Empreendedorismo",
                    featured=True,
                    read_time=5,
                ),
                Post(
                    title="Como valido ideias sem gastar nada",
                    slug="como-valido-ideias-sem-gastar-nada",
                    excerpt="O erro mais comum de quem começa: gastar meses construindo algo que ninguém pediu.",
                    content="# Como valido ideias sem gastar nada\n\nO erro mais caro...",
                    category="Construção",
                    read_time=7,
                ),
                Post(
                    title="O que aprendi no primeiro ano empreendendo",
                    slug="o-que-aprendi-no-primeiro-ano",
                    excerpt="Um ano de pressão, decisões erradas, pivôs e uma lição que nenhum curso vai te ensinar.",
                    content="# O que aprendi no primeiro ano\n\nUm ano de pressão...",
                    category="Empreendedorismo",
                    read_time=9,
                ),
                Post(
                    title="Construindo uma equipe sem dinheiro",
                    slug="construindo-equipe-sem-dinheiro",
                    excerpt="Como atrair pessoas boas quando você não pode pagar os melhores salários do mercado.",
                    content="# Construindo uma equipe sem dinheiro\n\nSalário não é o único ativo...",
                    category="Liderança",
                    read_time=6,
                ),
                Post(
                    title="Network de verdade: o que ninguém te conta",
                    slug="network-de-verdade",
                    excerpt="Participar de eventos e trocar cartão não é network. O que realmente constrói uma rede.",
                    content="# Network de verdade\n\nTrocar cartão não é network...",
                    category="Network",
                    read_time=8,
                ),
                Post(
                    title="Da ideia ao primeiro cliente: o caminho real",
                    slug="da-ideia-ao-primeiro-cliente",
                    excerpt="Como saí de uma ideia vaga para o primeiro pagamento recorrente na NacionalSign.",
                    content="# Da ideia ao primeiro cliente\n\nO caminho não foi linear...",
                    category="Construção",
                    read_time=11,
                ),
            ]
            db.add_all(posts)

        if db.query(Project).count() == 0:
            projects = [
                Project(
                    name="NacionalSign",
                    slug="nacionalsign",
                    description="SaaS de assinatura digital com validade jurídica.",
                    long_desc="Da ideia ao produto funcionando. Assinatura de documentos 100% digital, legal e segura.",
                    status="active",
                    url="https://nacionalsign.com.br",
                    order=1,
                ),
                Project(
                    name="Projeto #2",
                    slug="projeto-2",
                    description="Em validação. Mercado de gestão para pequenas empresas.",
                    status="building",
                    order=2,
                ),
            ]
            db.add_all(projects)

        db.commit()
    finally:
        db.close()


# Run seed on startup
@app.on_event("startup")
async def startup_event():
    seed_data()
