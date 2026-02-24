"""Add skills and technical score

Revision ID: 001
Create Date: 2024-01-01

"""
from alembic import op
import sqlalchemy as sa
from sqlalchemy.dialects import postgresql

def upgrade():
    op.add_column('analyses', sa.Column('skills', postgresql.JSON(), nullable=True))
    op.add_column('analyses', sa.Column('audio_path', sa.String(), nullable=True))
    op.add_column('analyses', sa.Column('technical_score', sa.Float(), nullable=True))
    
    # Update existing rows with empty skills array
    op.execute("UPDATE analyses SET skills = '[]' WHERE skills IS NULL")
    
    # Make skills non-nullable after update
    op.alter_column('analyses', 'skills', nullable=False)

def downgrade():
    op.drop_column('analyses', 'technical_score')
    op.drop_column('analyses', 'audio_path')
    op.drop_column('analyses', 'skills')
