from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework import generics, status
from .models import Task
from .serializers import TaskSerializer, CreateTaskSerializers
from rest_framework.response import Response

from django.contrib.auth import login, models


class TaskView(generics.ListAPIView):
    queryset = Task.objects.all()
    serializer_class = TaskSerializer


class CreateTaskView(generics.CreateAPIView):
    serializer_class = CreateTaskSerializers

    def post(self, request, format=None):
        serializer = self.serializer_class(data=self.request.data)

        if serializer.is_valid():
            description = serializer.data.get('description')

            queryset = Task.objects.filter(description=description)
            if queryset.exists():
                task = queryset[0]
                task.description = description
                task.save(update_fields=['description'])
                return Response(TaskSerializer(task).data, status=status.HTTP_200_OK)

            task = Task(description=description)
            task.save()
            return Response(TaskSerializer(task).data, status=status.HTTP_201_CREATED)
        return Response({'Bad Request': 'Invalid data..'}, status=status.HTTP_400_BAD_REQUEST)


class DeleteTaskView(APIView):
    lookup_url_kwarg = 'pk'

    def post(self, request, format=None):
        pk = self.request.data.get(self.lookup_url_kwarg)
        if pk:
            task = Task.objects.filter(pk=pk)
            if task.exists():
                task = task[0]
                task.delete()
                return Response({'Deleted': 'Task has been deleted..'}, status=status.HTTP_200_OK)
            return Response({'Invalid id': 'task with this id not found'}, status=status.HTTP_404_NOT_FOUND)
        return Response({"Bad request": "NO id argument in the request"}, status=status.HTTP_400_BAD_REQUEST)


class DoneTaskView(APIView):
    def patch(self, request, format=None):
        
        pk = self.request.data.get('pk')
        done = self.request.data.get('done')

        if pk:
            task = Task.objects.filter(pk=pk)
            if task.exists():
                task = task[0]
                task.done = done
                task.save()

                data = TaskSerializer(task).data

                return Response(data, status=status.HTTP_200_OK)
            return Response({'Invalid id': 'task with this id not found'}, status=status.HTTP_404_NOT_FOUND)
        return Response({"Bad request": "NO id argument in the request"}, status=status.HTTP_400_BAD_REQUEST)
