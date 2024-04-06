from django.shortcuts import render


def index(request):
    return render(request, 'index.html')


def forest_travel(request):
    return render(request, 'forest_travel.html')
