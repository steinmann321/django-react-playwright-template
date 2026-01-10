from datetime import datetime, timezone
from django.db import connections
from django.http import JsonResponse
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import HealthExample
from .serializers import HealthExampleSerializer


class HealthView(APIView):
    def get(self, request):
        # DB connectivity check
        try:
            with connections["default"].cursor() as cursor:
                cursor.execute("SELECT 1")
        except Exception:
            return Response(
                {"status": "unhealthy"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )

        examples = HealthExample.objects.order_by("-created_at")[:1]
        example_data = HealthExampleSerializer(examples, many=True).data

        payload = {
            "status": "healthy",
            "timestamp": datetime.now(timezone.utc).isoformat(),
            "service": "wordtrainer-backend",
            "examples": example_data,
        }
        return Response(payload, status=status.HTTP_200_OK)
