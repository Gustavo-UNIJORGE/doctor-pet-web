from django.urls import path

from . import views

urlpatterns = [
    path("", views.index, name="index"),
    path("task/", views.all_tasks, name="all_task"),
    path("task/create/", views.create_task, name='create_task'),
    path("task/<int:pk>/", views.get_task, name="task_detail"),
    path("task/<int:pk>/edit", views.update_task, name="update_task"),
    path("task/<int:pk>/attendance/", views.task_attendances, name='attendances_of_task'),
]
