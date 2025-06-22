from django.core.serializers import serialize
from .models import Task, Attendance
import json

def task_to_dict(task):
   """Converte um objeto Task para dicionário"""
   return {
      'id': task.id,
      'title': task.title,
      'slug': task.slug,
      'specialty': task.specialty,
      'estimated_time': str(task.estimated_time),  # Converte time para string
      'is_it_home': task.is_it_home
   }

def attendance_to_dict(attendance):
   """Converte um objeto Attendance para dicionário"""
   return {
      'id': attendance.id,
      'task_id': attendance.task_id,
      # Adicione outros campos do Attendance aqui
      'created_at': attendance.created_at.isoformat() if attendance.created_at else None
   }

def serialize_task_list(queryset):
   """Serializa um queryset de Tasks"""
   return [task_to_dict(task) for task in queryset]

def serialize_attendance_list(queryset):
   """Serializa um queryset de Attendances"""
   return [attendance_to_dict(attendance) for attendance in queryset]