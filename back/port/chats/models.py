from django.db import models
from django.contrib.auth import get_user_model
import uuid
User = get_user_model()


class Chat(models.Model):
    users = models.ManyToManyField(User)
    created_at = models.DateTimeField(auto_now_add=True)
    token = models.UUIDField(default=uuid.uuid4, editable=False, unique=True)

    def __str__(self):
        return f"Chat {self.id} between {', '.join(user.username for user in self.users.all())}"
