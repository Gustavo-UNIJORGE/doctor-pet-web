from django.urls import path

from . import views

urlpatterns = [
    path("", views.index, name="index"),
    path("task/", views.tasks, name="tasks"),
    path("task:<int:task_id>/", views.task_details, name="task"),
    path("task:<int:task_id>/attendance/", views.task_attendances, name='task_attendance'),
    path('task:<int:task_id>/attendance/create', views.create_attendance, name="create_attendance")

]
