from django.shortcuts import render
from django.views.csrf import csrf_failure
from django.http import HttpResponse, HttpRequest

def index (request: HttpRequest) -> HttpResponse:
    return HttpResponse('home');

def tasks(request: HttpRequest) -> HttpResponse:
    response = 'List of Tasks'
    return HttpResponse(response)

def task_details(request: HttpRequest, task_id: int):
    return HttpResponse('Task %s id Details' % task_id)

def task_attendances(request: HttpRequest, task_id: int):
    response = 'List of attendances of Task %s' % task_id
    return HttpResponse(response)

def create_attendance(request: HttpRequest, task_id: int):
    response = 'Creating attendance for Task %s'
    return HttpResponse(response)
