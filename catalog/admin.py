from django.contrib import admin
from .models import Recipe

@admin.register(Recipe)
class RecipeAdmin(admin.ModelAdmin):
    list_display = ('title','is_active','created_at')
    list_filter = ('is_active','created_at')
    search_fields = ('title','summary','keywords')
    prepopulated_fields = {'slug': ('title',)}
