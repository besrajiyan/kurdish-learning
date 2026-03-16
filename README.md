# Kurdish Learning - Kürtçe Öğrenme Sitesi

Çocuklar için Django + Next.js tabanlı Kürtçe öğretim platformu.

## Proje Yapısı

```
kurdish-learning/
├── frontend/          # Next.js uygulaması
├── backend/           # Django REST API
└── docs/              # Dokümantasyon
```

## Kurulum

### Backend (Django)
```bash
cd backend
python -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
python manage.py migrate
python manage.py runserver
```

### Frontend (Next.js)
```bash
cd frontend
npm install
npm run dev
```

## Geliştirme Ortamı

- Backend: http://localhost:8000
- Frontend: http://localhost:3000
