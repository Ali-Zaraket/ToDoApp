from django.urls import path
from .views import *

urlpatterns = [
    path('tasks', TaskView.as_view()),
    path('create-task', CreateTaskView.as_view()),
    path('delete-task', DeleteTaskView.as_view()),
    path('done-task', DoneTaskView.as_view()),
]
