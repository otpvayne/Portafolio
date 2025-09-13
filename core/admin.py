from django.contrib import admin
from .models import Question

@admin.register(Question)
class QuestionAdmin(admin.ModelAdmin):
    list_display = ('title','is_active','created_at')
    list_filter = ('is_active','created_at')
    search_fields = ('title','answer')
