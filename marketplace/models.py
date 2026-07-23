from django.db import models
from django.contrib.auth.models import User

class ClothingItem(models.Model):

    owner = models.ForeignKey(
        User,
        on_delete=models.CASCADE
    )

    title = models.CharField(max_length=100)
    brand = models.CharField(max_length=100)
    category = models.CharField(max_length=50)
    size = models.CharField(max_length=10)
    condition = models.CharField(max_length=50)
    description = models.TextField()
    value = models.IntegerField()
    location = models.CharField(max_length=100)
    image = models.ImageField(upload_to='clothes/', blank=True,null=True)

    status = models.CharField(
        max_length=20,
        default='Available'
    )

    def __str__(self):
        return self.title
    
    
class SwapRequest(models.Model):

    sender = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        related_name='sent_requests'
    )

    receiver = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        related_name='received_requests'
    )

    requested_item = models.ForeignKey(
        ClothingItem,
        on_delete=models.CASCADE,
        related_name='requested_item'
    )

    status = models.CharField(
        max_length=20,
        default='Pending'
    )

    created_at = models.DateTimeField(
        auto_now_add=True
    )

    def __str__(self):
        return f"{self.sender} -> {self.receiver}"
    
class ChatMessage(models.Model):

    sender = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        related_name='sent_messages'
    )

    receiver = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        related_name='received_messages'
    )

    message = models.TextField()

    created_at = models.DateTimeField(
        auto_now_add=True
    )

    def __str__(self):
        return self.message