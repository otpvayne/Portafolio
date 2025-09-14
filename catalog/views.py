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

    active_tag = (request.GET.get('tag') or '').strip()
    if active_tag:
        items = items.filter(keywords__icontains=active_tag)

    # construir listado de tags (sobre todo lo publicado)
    tag_set = set()
    for it in OpenItem.objects.filter(is_published=True):
        tag_set.update(it.tags)
    tags = sorted(tag_set, key=str.lower)

    ctx = {
        'items': items,
        'q': q,
        'tags': tags,
        'active_tag': active_tag,
    }
    return render(request, 'open_list.html', ctx)


def open_detail(request, slug):
    item = get_object_or_404(OpenItem, slug=slug, is_published=True)

    # relacionados por coincidencia de tags
    related = OpenItem.objects.filter(is_published=True).exclude(pk=item.pk)
    if item.tags:
        q_obj = Q()
        for t in item.tags:
            q_obj |= Q(keywords__icontains=t)
        related = related.filter(q_obj).order_by('-created_at')[:6]
    else:
        related = related.order_by('-created_at')[:6]

    return render(request, 'open_detail.html', {'item': item, 'related': related})
