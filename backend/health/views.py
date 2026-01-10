from datetime import UTC, datetime

from django.db import connections
from rest_framework import status  # type: ignore[import-untyped]
from rest_framework.request import Request  # type: ignore[import-untyped]
from rest_framework.response import Response  # type: ignore[import-untyped]
from rest_framework.views import APIView  # type: ignore[import-untyped]

from .models import HealthExample
from .serializers import HealthExampleSerializer


class HealthView(APIView):  # type: ignore[misc]
    def get(self, _request: Request) -> Response:
        # DB connectivity check
        try:
            with connections["default"].cursor() as cursor:
                cursor.execute("SELECT 1")
        except Exception:
            return Response({"status": "unhealthy"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

        examples = HealthExample.objects.order_by("-created_at")[:1]
        example_data = HealthExampleSerializer(examples, many=True).data

        payload = {
            "status": "healthy",
            "timestamp": datetime.now(UTC).isoformat(),
            "service": "wordtrainer-backend",
            "examples": example_data,
        }
        return Response(payload, status=status.HTTP_200_OK)
