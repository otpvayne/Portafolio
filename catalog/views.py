# catalog/views.py
from django.shortcuts import render, get_object_or_404
from django.db.models import Q
from .models import OpenItem

def open_list(request):
    items = OpenItem.objects.filter(is_published=True).order_by('-created_at')
    q = (request.GET.get('q') or '').strip()
    if q:
        items = items.filter(
            Q(title__icontains=q) |
            Q(summary__icontains=q) |
            Q(description__icontains=q) |
            Q(keywords__icontains=q)
        )
    return render(request, 'open_list.html', {"items": items, "q": q})

def open_detail(request, slug):
    item = get_object_or_404(OpenItem, slug=slug, is_published=True)
    tags = [k.strip() for k in (item.keywords or '').split(',') if k.strip()]
    return render(request, 'open_detail.html', {"item": item, "tags": tags})
