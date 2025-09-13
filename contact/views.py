from django.shortcuts import render, redirect
from .models import Lead

def contact_view(request):
    if request.method == 'POST':
        name = (request.POST.get('name') or '').strip()[:100]
        email = (request.POST.get('email') or '').strip()
        message = (request.POST.get('message') or '').strip()[:1000]
        trap = request.POST.get('website')  # honeypot

        utm_source = (request.POST.get('utm_source') or request.GET.get('utm_source') or '')[:100]
        utm_medium = (request.POST.get('utm_medium') or request.GET.get('utm_medium') or '')[:100]
        utm_campaign = (request.POST.get('utm_campaign') or request.GET.get('utm_campaign') or '')[:100]

        if not trap and name and email and message:
            Lead.objects.create(
                name=name, email=email, message=message,
                utm_source=utm_source, utm_medium=utm_medium, utm_campaign=utm_campaign,
                client_ip=request.META.get('REMOTE_ADDR')
            )
            return redirect('contact_thanks')
    return render(request, 'contact/contactame.html')

def thanks(request):
    return render(request, 'contact/gracias.html')
