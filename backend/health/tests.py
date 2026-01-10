from django.test import TestCase
from django.urls import reverse
from .models import HealthExample


class HealthTests(TestCase):
    def setUp(self):
        HealthExample.objects.create(info="test info")

    def test_health_endpoint(self):
        url = reverse("health")
        resp = self.client.get(url)
        self.assertEqual(resp.status_code, 200)
        data = resp.json()
        self.assertEqual(data["status"], "healthy")
        self.assertIn("timestamp", data)
        self.assertEqual(data["service"], "wordtrainer-backend")
        self.assertTrue(len(data.get("examples", [])) >= 1)
