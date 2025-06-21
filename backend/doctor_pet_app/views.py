import json
from .models import *
from .serializer import *
from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.views.decorators.csrf import csrf_exempt
from django.http import JsonResponse, HttpResponse, HttpRequest
from django.core.serializers import serialize

modelname = 'Task'

def index (request: HttpRequest) -> HttpResponse:
    return HttpResponse('home')

def all_tasks(request: HttpRequest) -> HttpResponse:
    objects = serialize('python', Task.objects.all())

    response = [
        {
            **item['fields'],
            'id': item['pk']
        } for item in objects
    ] 

    return JsonResponse(response, safe=False)

def get_task(request: HttpRequest, task_id: int):
    try :
        response : Task = Task.objects.get(pk=task_id) 
        data = {
            'id': response.pk,
            'title' : response.title,
            'slug' : response.slug,
            'specialty': response.specialty,
            'estimated_time': response.estimated_time,
            'is_it_home': response.is_it_home

        }
        return JsonResponse(data)
    except Task.DoesNotExist:
        return Response(exception=f'{modelname} não encontrado', status=404)

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

@csrf_exempt
def create_task(request: HttpRequest) -> JsonResponse: 
    if request.method == 'POST':
        try: 
            body = json.loads(request.body)
            task = Task.objects.create(
                title=body.get('title'),
                slug=body.get('slug'),
                specialty=body.get('specialty'),
                estimated_time=body.get('estimated_time'),
                is_it_home=body.get('is_it_home', False)
            )
            
            data = {
                'title': task.title,
                'slug': task.slug,
                'specialty': task.specialty,
                'estimated_time': task.estimated_time,
                'is_it_home': task.is_it_home
            }

            return JsonResponse({'status': 'success', 'data': data})
            
        except Exception as e:
            return JsonResponse({'status': 'error', 'error': str(e)}, status=400)
    return JsonResponse({'status': 'error'}, status=405)

def update_task(request: HttpRequest, pk: int):
    try: 
        task = Task.objects.get(pk=pk)
    except Task.DoesNotExist:
        return Response(exception=f'{modelname} não encontrado', status=404)
    
