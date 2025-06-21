from django.shortcuts import render
from django.views.csrf import csrf_failure
from django.http import HttpResponse, HttpRequest

def task_details(request, task_id):
    return HttpResponse('Task %s id Details' % task_id)

def task_attendances(request, task_id):
    response = 'List of attendances of Task %s' % task_id
    return HttpResponse(response % task_id)

def create_attendance(request, task_id):
    response = 'Creating attendance for Task %s'
    return HttpResponse(response)
