import json
from .models import *
from django.views.csrf import csrf_failure
from django.http import JsonResponse, HttpResponse, HttpRequest
from django.core.serializers import serialize

def index (request: HttpRequest) -> HttpResponse:
    return HttpResponse('home')

def tasks(request: HttpRequest) -> HttpResponse:
    response = Task.objects.all()
    return JsonResponse(serialize('python', response), safe=False)

def task_details(request: HttpRequest, task_id: int):
    modelname = 'Task'
    try :
        response = Task.objects.get(pk=task_id)
        data = {
            'id': response.pk,
            'title' : response.title,
            'slug' : response.slug,
            'specialty': response.specialty
        }
        return JsonResponse({'data': data})
    except Task.DoesNotExist:
        return JsonResponse({'error': f'{modelname} não encontrado'}, status=404)

def task_attendances(request: HttpRequest, task_id: int):
    try :
        response = Attendance.objects.filter(task_id=task_id)
        data = [
            {
                **item['fields'],
                'id': item['pk']
            } for item in serialize('python', response)
        ]
        
        return JsonResponse(data, safe=False)
    except Exception as e:
        return JsonResponse({'error': str(e)}, status=500)


# def create_attendance(request: HttpRequest, task_id: int):
#     response = 'Creating attendance for Task %s'
#     return HttpResponse(response)

