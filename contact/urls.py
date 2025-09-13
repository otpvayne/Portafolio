from django.urls import path
from .views import contact_view, thanks
urlpatterns = [
    path('', contact_view, name='contact'),
    path('gracias/', thanks, name='contact_thanks'),
]
