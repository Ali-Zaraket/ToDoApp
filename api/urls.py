from django.urls import path
from .views import *

urlpatterns = [
    path('tasks', TaskView.as_view()),
    path('create-task', CreateTaskView.as_view()),
    path('get-task', GetTaskView.as_view()),
]
