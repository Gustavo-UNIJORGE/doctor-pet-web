from django.urls import path

from . import views

urlpatterns = [
    path("", views.index, name="index"),
    path("task/", views.all_tasks, name="tasks"),
    path("task:<int:task_id>/", views.get_task, name="task_details"),
    path("task:<int:task_id>/attendance/", views.task_attendances, name='attendances_of_task'),
    path("task/create/", views.create_task, name='create_task'),
]
