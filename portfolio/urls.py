from django.contrib import admin
from django.urls import path, include
from core.views import home
from django.views.generic import RedirectView

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', home, name='home'),
    path('fyq/', include('core.urls')),
    path('open/', include('catalog.urls')),              # ← importante
    path('contactame/', include('contact.urls')),

    # redirige /open_list/ -> /open/
    path('open_list/', RedirectView.as_view(pattern_name='open_list', permanent=True)),
]
