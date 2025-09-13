from django.contrib import admin
from .models import Lead

@admin.register(Lead)
class LeadAdmin(admin.ModelAdmin):
    list_display = ('name','email','utm_source','utm_medium','utm_campaign','created_at')
    list_filter = ('utm_source','utm_medium','utm_campaign','created_at')
    search_fields = ('name','email','message')
