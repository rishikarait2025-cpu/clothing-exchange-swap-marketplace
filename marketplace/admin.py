from django.contrib import admin
from .models import ClothingItem, SwapRequest

# Register your models here.
from .models import ClothingItem

admin.site.register(ClothingItem)
admin.site.register(SwapRequest)