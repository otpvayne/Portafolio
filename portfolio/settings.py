# portfolio/settings.py
from pathlib import Path
import os
import dj_database_url

BASE_DIR = Path(__file__).resolve().parent.parent

# ===== Core =====
SECRET_KEY = os.getenv('SECRET_KEY', 'dev-key')
DEBUG = os.getenv('DEBUG', 'False').lower() == 'true'

# Hosts/CSRF: auto desde Render
RENDER_HOST = os.getenv('RENDER_EXTERNAL_HOSTNAME')
ALLOWED_HOSTS = ['localhost', '127.0.0.1']
CSRF_TRUSTED_ORIGINS = [
    'http://localhost', 'http://127.0.0.1',
    'http://localhost:8000', 'http://127.0.0.1:8000'
]
if RENDER_HOST:
    ALLOWED_HOSTS += [RENDER_HOST, '.onrender.com']
    CSRF_TRUSTED_ORIGINS += [f'https://{RENDER_HOST}']
else:
    # Fallback por si defines variables manualmente
    env_hosts = os.getenv('ALLOWED_HOSTS')
    env_csrf = os.getenv('CSRF_TRUSTED_ORIGINS')
    if env_hosts:
        ALLOWED_HOSTS += [h.strip() for h in env_hosts.split(',') if h.strip()]
    if env_csrf:
        CSRF_TRUSTED_ORIGINS += [u.strip() for u in env_csrf.split(',') if u.strip()]

# Proxy/HTTPS en Render
SECURE_PROXY_SSL_HEADER = ('HTTP_X_FORWARDED_PROTO', 'https')
USE_X_FORWARDED_HOST = True

# Seguridad (activas en prod)
SESSION_COOKIE_SECURE = not DEBUG
CSRF_COOKIE_SECURE = not DEBUG
SECURE_SSL_REDIRECT = not DEBUG
# HSTS opcional si ya tienes HTTPS estable:
# SECURE_HSTS_SECONDS = 60 * 60 * 24 * 30
# SECURE_HSTS_INCLUDE_SUBDOMAINS = True
# SECURE_HSTS_PRELOAD = True

# ===== Apps =====
INSTALLED_APPS = [
    'django.contrib.admin', 'django.contrib.auth', 'django.contrib.contenttypes',
    'django.contrib.sessions', 'django.contrib.messages', 'django.contrib.staticfiles',
    # Media en la nube (Cloudinary) — opcional
    'cloudinary_storage', 'cloudinary',
    # Tus apps
    'core', 'catalog', 'contact',
]

MIDDLEWARE = [
    'django.middleware.security.SecurityMiddleware',
    'whitenoise.middleware.WhiteNoiseMiddleware',  # sirve estáticos en prod
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]

ROOT_URLCONF = 'portfolio.urls'

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [BASE_DIR / 'templates'],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

WSGI_APPLICATION = 'portfolio.wsgi.application'

# ===== Base de datos =====
# Local por defecto (SQLite)
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.sqlite3',
        'NAME': BASE_DIR / 'db.sqlite3',
    }
}
# En Render: usa Postgres si existe DATABASE_URL
if os.getenv('DATABASE_URL'):
    DATABASES['default'] = dj_database_url.config(conn_max_age=600, ssl_require=True)

# ===== Internacionalización =====
LANGUAGE_CODE = 'es-co'
TIME_ZONE = 'America/Bogota'
USE_I18N = True
USE_TZ = True

# ===== Estáticos (tu carpeta assets/) =====
STATIC_URL = '/assets/'
STATICFILES_DIRS = [BASE_DIR / 'assets']       # carpeta existente en tu repo
STATIC_ROOT = BASE_DIR / 'staticfiles'         # destino para collectstatic
STATICFILES_STORAGE = 'whitenoise.storage.CompressedManifestStaticFilesStorage'

# ===== Media (uploads desde admin) =====
MEDIA_URL = '/media/'
MEDIA_ROOT = BASE_DIR / 'media'

# Si defines CLOUDINARY_URL, usa Cloudinary para MEDIA (Render Free-friendly)
if os.getenv('CLOUDINARY_URL'):
    DEFAULT_FILE_STORAGE = 'cloudinary_storage.storage.MediaCloudinaryStorage'
    # Cloudinary entrega URLs absolutas; MEDIA_URL puede quedar así para compatibilidad.

DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'
