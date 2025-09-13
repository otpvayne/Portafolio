from django.db import models
from django.utils.text import slugify

class OpenItem(models.Model):
    title = models.CharField(max_length=120, verbose_name="Título")
    slug = models.SlugField(max_length=140, unique=True, blank=True)
    image = models.ImageField(upload_to="open/", verbose_name="Imagen")
    summary = models.CharField(max_length=240, verbose_name="Resumen (corto)")
    description = models.TextField(verbose_name="Descripción (detalle)")
    keywords = models.CharField(
        max_length=240,
        help_text="Palabras clave separadas por coma. Ej: react, api, diseño"
    )
    link = models.URLField(blank=True, verbose_name="Link externo (opcional)")
    is_published = models.BooleanField(default=True, verbose_name="Publicado")
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ["-created_at"]
        verbose_name = "Item (Open)"
        verbose_name_plural = "Items (Open)"

    def __str__(self):
        return self.title

    def save(self, *args, **kwargs):
        if not self.slug:
            base = slugify(self.title)[:120]
            self.slug = base or f"item-{self.pk or ''}"
        super().save(*args, **kwargs)

    @property
    def tags(self):
        if not self.keywords:
            return []
        return [t.strip() for t in self.keywords.split(",") if t.strip()]
