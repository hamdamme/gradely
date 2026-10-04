#!/usr/bin/env python3
"""Generate developer credentials without overwriting existing configuration."""
import os
from pathlib import Path
import secrets

root = Path(__file__).resolve().parent.parent
text = (root / '.env.example').read_text()
for name in ('DB_PASSWORD', 'RABBIT_PASSWORD', 'MINIO_SECRET_KEY', 'JWT_SECRET'):
    text = text.replace(f'{name}=replace_with_generated_secret', f'{name}={secrets.token_hex(32)}')
try:
    fd = os.open(root / '.env', os.O_WRONLY | os.O_CREAT | os.O_EXCL, 0o600)
except FileExistsError:
    raise SystemExit('.env already exists; left unchanged.')
with os.fdopen(fd, 'w') as output:
    output.write(text)
print('Created .env with random local credentials (mode 0600).')
