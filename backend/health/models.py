from __future__ import annotations

from django.db import models


class HealthExample(models.Model):
    info: models.TextField[str, str] = models.TextField()
    created_at: models.DateTimeField[str, str] = models.DateTimeField(auto_now_add=True)

    def __str__(self) -> str:
        return f"HealthExample({self.pk})"
