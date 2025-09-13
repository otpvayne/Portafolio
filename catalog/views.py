from django.db.models import Q
from django.shortcuts import render, get_object_or_404
from .models import OpenItem

def _all_tags(queryset):
    bucket = set()
    for kw in queryset.values_list("keywords", flat=True):
        if kw:
            for t in [s.strip() for s in kw.split(",")]:
                if t:
                    bucket.add(t)
    return sorted(bucket, key=str.lower)

def open_list(request):
    q = (request.GET.get("q") or "").strip()
    tag = (request.GET.get("tag") or "").strip()

    base_qs = OpenItem.objects.filter(is_published=True)

    items = base_qs
    if q:
        items = items.filter(
            Q(title__icontains=q) |
            Q(summary__icontains=q) |
            Q(description__icontains=q) |
            Q(keywords__icontains=q)
        )
    if tag:
        items = items.filter(keywords__icontains=tag)

    all_tags = _all_tags(base_qs)

    ctx = {
        "items": items,
        "q": q,
        "active_tag": tag,
        "tags": all_tags,
    }
    return render(request, "open_list.html", ctx)

def open_detail(request, slug):
    item = get_object_or_404(OpenItem, slug=slug, is_published=True)
    related = OpenItem.objects.filter(is_published=True).exclude(id=item.id)[:6]
    return render(request, "open_detail.html", {"item": item, "related": related})
