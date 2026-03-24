#!/usr/bin/env bash
# Render build script

pip install --upgrade pip
pip install -r requirements.txt

python manage.py collectstatic --noinput

echo "=== Running migrate ==="
python manage.py migrate --verbosity 2

echo "=== Running seed_data ==="
python manage.py seed_data

echo "=== Running seed_audience ==="
python manage.py seed_audience

echo "=== Build complete ==="
