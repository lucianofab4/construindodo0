"""Script para criar o banco de dados e popular com dados iniciais."""
import sys
import os
sys.path.insert(0, os.path.dirname(__file__))

from app.database import engine, Base
from app import models  # noqa

print("Criando tabelas...")
Base.metadata.create_all(bind=engine)
print("Tabelas criadas com sucesso.")
