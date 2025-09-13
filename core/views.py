from django.shortcuts import render
from .models import Question

def home(request):
    return render(request, 'index.html')

def faq(request):
    questions = Question.objects.filter(is_active=True)
    return render(request, 'fyq.html', {'questions': questions})
