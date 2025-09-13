from django.db import models

class Recipe(models.Model):  # Cambia a Item si prefieres
    title = models.CharField(max_length=140)
    slug = models.SlugField(unique=True)
    image = models.ImageField(upload_to='recipes/')
    summary = models.CharField(max_length=200)
    description = models.TextField()
    keywords = models.CharField(max_length=200, help_text="Separadas por comas")
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-created_at']

    def __str__(self):
        return self.title[:50]
