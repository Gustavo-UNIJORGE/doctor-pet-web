import json
from .models import *
from django.views.decorators.csrf import csrf_exempt
from django.http import JsonResponse, HttpResponse, HttpRequest
from django.core.serializers import serialize

def index (request: HttpRequest) -> HttpResponse:
    return HttpResponse('home')

def tasks(request: HttpRequest) -> HttpResponse:
    data = Task.objects.all()
    response = [
        {
            **item['fields'],
            'id': item['pk']
        } for item in serialize('python', data)
    ]
    return JsonResponse(response, safe=False)

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

@csrf_exempt
def task_create(request: HttpRequest) -> JsonResponse: 
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