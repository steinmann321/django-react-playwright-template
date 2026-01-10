from typing import Any, ClassVar

from django.db import migrations


class Migration(migrations.Migration):
    dependencies: ClassVar[list[Any]] = [
        ("health", "0001_initial"),
    ]

    operations: ClassVar[list[Any]] = []
