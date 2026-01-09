from django.db import models


class HealthExample(models.Model):
    info = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"HealthExample({self.pk})"
