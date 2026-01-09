from rest_framework import serializers
from .models import HealthExample


class HealthExampleSerializer(serializers.ModelSerializer):
    class Meta:
        model = HealthExample
        fields = ["id", "info", "created_at"]
