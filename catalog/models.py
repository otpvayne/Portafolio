from django.db import models
from django.utils.text import slugify

class OpenItem(models.Model):
    title = models.CharField(max_length=140)
    slug = models.SlugField(max_length=160, unique=True, blank=True)
    image = models.URLField(blank=True)  # o ImageField si usas Cloudinary
    summary = models.CharField(max_length=220, blank=True)
    description = models.TextField(blank=True)
    keywords = models.CharField(max_length=300, blank=True)
    external_link = models.URLField(blank=True)
    is_published = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.title)[:160]
        super().save(*args, **kwargs)

    def __str__(self):
        return self.title
