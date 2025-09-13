from django.contrib import admin
from .models import OpenItem

@admin.register(OpenItem)
class OpenItemAdmin(admin.ModelAdmin):
    list_display = ("title", "is_published", "created_at")
    list_filter = ("is_published", "created_at")
    search_fields = ("title", "summary", "description", "keywords")
    prepopulated_fields = {"slug": ("title",)}
    readonly_fields = ("created_at", "updated_at")
    fieldsets = (
        ("Básico", {"fields": ("title", "slug", "image", "summary", "description")}),
        ("SEO / Tags", {"fields": ("keywords",)}),
        ("Estado", {"fields": ("is_published",)}),
        ("Metadatos", {"fields": ("created_at", "updated_at")}),
        ("Opcional", {"fields": ("link",)}),
    )
