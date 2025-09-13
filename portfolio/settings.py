# ---- arriba del archivo ----
from pathlib import Path
import os
import dj_database_url

BASE_DIR = Path(__file__).resolve().parent.parent

# Usa variables de entorno en prod
SECRET_KEY = os.getenv('SECRET_KEY', 'dev-key')
DEBUG = os.getenv('DEBUG', 'False').lower() == 'true'

# Render: dominios permitidos y CSRF
ALLOWED_HOSTS = os.getenv('ALLOWED_HOSTS', 'localhost,127.0.0.1').split(',')
CSRF_TRUSTED_ORIGINS = os.getenv('CSRF_TRUSTED_ORIGINS', 'http://localhost,http://127.0.0.1').split(',')

# Si estás detrás de proxy (Render)
SECURE_PROXY_SSL_HEADER = ('HTTP_X_FORWARDED_PROTO', 'https')
# Proxies/reverse proxy (Render)
USE_X_FORWARDED_HOST = True

# Endurecer seguridad en producción
SESSION_COOKIE_SECURE = not DEBUG
CSRF_COOKIE_SECURE   = not DEBUG
SECURE_SSL_REDIRECT  = not DEBUG
# (opcional, pero recomendable si usas dominio propio con HTTPS estable)
# SECURE_HSTS_SECONDS = 60 * 60 * 24 * 30  # 30 días
# SECURE_HSTS_INCLUDE_SUBDOMAINS = True
# SECURE_HSTS_PRELOAD = True


INSTALLED_APPS = [
    'django.contrib.admin','django.contrib.auth','django.contrib.contenttypes',
    'django.contrib.sessions','django.contrib.messages','django.contrib.staticfiles',
    # storage para media en la nube
    'cloudinary_storage', 'cloudinary',
    # tus apps
    'core','catalog','contact',
]


MIDDLEWARE = [
    'django.middleware.security.SecurityMiddleware',
    'whitenoise.middleware.WhiteNoiseMiddleware',  # ← añade esto para servir estáticos
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
        'BACKEND':'django.template.backends.django.DjangoTemplates',
        'DIRS':[BASE_DIR / 'templates'],
        'APP_DIRS':True,
        'OPTIONS':{
            'context_processors':[
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]
# Si existe CLOUDINARY_URL => usa Cloudinary para MEDIA en producción
if os.getenv('CLOUDINARY_URL'):
    DEFAULT_FILE_STORAGE = 'cloudinary_storage.storage.MediaCloudinaryStorage'
    # MEDIA_URL será absoluto (Cloudinary lo genera). Dejamos este valor por compatibilidad:
    MEDIA_URL = '/media/'

WSGI_APPLICATION = 'portfolio.wsgi.application'

# Base de datos local (SQLite)
# DEV por defecto (SQLite)
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.sqlite3',
        'NAME': BASE_DIR / 'db.sqlite3',
    }
}

# Si Render te inyecta DATABASE_URL -> usa Postgres
if os.getenv('DATABASE_URL'):
    DATABASES['default'] = dj_database_url.config(
        conn_max_age=600,
        ssl_require=True
    )


LANGUAGE_CODE = 'es-co'
TIME_ZONE = 'America/Bogota'
USE_I18N = True
USE_TZ = True

# Estáticos: usa tu carpeta existente "assets" sin mover nada
# estáticos: usando tu carpeta assets/
STATIC_URL = '/assets/'
STATICFILES_DIRS = [BASE_DIR / 'assets']
STATIC_ROOT = BASE_DIR / 'staticfiles'

# WhiteNoise: comprime y versiona
STATICFILES_STORAGE = "whitenoise.storage.CompressedManifestStaticFilesStorage"

# media (para uploads del admin)
MEDIA_URL = '/media/'
MEDIA_ROOT = BASE_DIR / 'media'


DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'
