from django.db import models

class Task(models.Model):
    description = models.TextField()
    done = models.BooleanField(default=False)

    def __str__(self):
        return f'Task({self.pk})'

