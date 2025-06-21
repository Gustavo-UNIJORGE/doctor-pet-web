from django.urls import path

from . import views

urlpatterns = [
    path("", views.index, name="index"),
    path("task/", views.tasks, name="tasks"),
    path("task:<int:task_id>/", views.task_details, name="task_details"),
    path("task:<int:task_id>/attendance/", views.task_attendances, name='attendances_of_task'),
    path("task/create/", views.task_create, name='create_task'),
]
