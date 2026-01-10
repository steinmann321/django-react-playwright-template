from typing import ClassVar

from rest_framework import serializers  # type: ignore[import-untyped]

from .models import HealthExample


class HealthExampleSerializer(serializers.ModelSerializer):  # type: ignore[misc]
    class Meta:
        model = HealthExample
        fields: ClassVar[list[str]] = ["id", "info", "created_at"]
