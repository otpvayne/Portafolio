from django.shortcuts import render, get_object_or_404
from .models import Recipe

def open_list(request):
    recipes = Recipe.objects.filter(is_active=True)
    return render(request, 'catalog/open.html', {'recipes': recipes})

def open_detail(request, slug):
    recipe = get_object_or_404(Recipe, slug=slug, is_active=True)
    return render(request, 'catalog/open_detail.html', {'recipe': recipe})
