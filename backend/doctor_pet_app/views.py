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
    try :
        tasks = Task.objects.all()
        serialized_tasks = serialize_task_list(tasks)
        return JsonResponse(serialized_tasks, safe=False) 
    except Exception as e:
        return JsonResponse({'status': 'error', 'message': str(e)},
            status=500
        )

@api_view(['GET'])
def get_task(request: HttpRequest, pk: int):
    try :
        response : Task = Task.objects.get(pk=pk) 
        data = {
            'id': response.pk,
            'title' : response.title,
            'slug' : response.slug,
            'specialty': response.specialty,
            'estimated_time': response.estimated_time,
            'is_it_home': response.is_it_home,
            'is_active': response.is_active,

        }
        return JsonResponse(data)
    except Task.DoesNotExist:
        return Response(exception=f'{modelname} não encontrado', status=404)

def task_attendances(request: HttpRequest, pk: int):
    try :
        response = Attendance.objects.filter(task_id=pk)
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
                is_it_home=body.get('is_it_home', False),
                is_active=body.get('is_active', True)
            )
            
            data = {
                'title': task.title,
                'slug': task.slug,
                'specialty': task.specialty,
                'estimated_time': task.estimated_time,
                'is_it_home': task.is_it_home,
                'is_active': task.is_active
            }

            return JsonResponse({'status': 'success', 'data': data})
            
        except Exception as e:
            return JsonResponse({'status': 'error', 'error': str(e)}, status=400)
    return JsonResponse({'status': 'error'}, status=405)

@csrf_exempt
def update_task(request: HttpRequest, pk: int):
    if request.method == 'PUT':
        try:
            body = json.loads(request.body)
            
            task = Task.objects.get(pk=pk)
            
            # Atualiza os campos permitidos
            if 'title' in body:
                task.title = body.get('title')
            if 'slug' in body:
                task.slug = body.get('slug')
            if 'specialty' in body:
                task.specialty = body.get('specialty')
            if 'estimated_time' in body:
                task.estimated_time = body.get('estimated_time')
            if 'is_it_home' in body:
                task.is_it_home = body.get('is_it_home', False)
            if 'is_active' in body:
                task.is_active = body.get('is_active', False)

            # Salva as alterações
            task.save()
            
            # Prepara a resposta
            data = {
                'id': task.pk,
                'title': task.title,
                'slug': task.slug,
                'specialty': task.specialty,
                'estimated_time': task.estimated_time,
                'is_it_home': task.is_it_home,
                'is_active': task.is_active
            }
            
            return JsonResponse({'status': 'success', 'data': data})
            
        except Task.DoesNotExist:
            return JsonResponse({'status': 'error', 'message': f'{modelname} não encontrado'}, status=404)
        except json.JSONDecodeError:
            return JsonResponse({'status': 'error', 'message': 'JSON inválido'}, status=400)
        except Exception as e:
            return JsonResponse({'status': 'error', 'message': str(e)}, status=500)
    
    return JsonResponse({'status': 'error', 'message': 'Método não permitido'}, status=405)