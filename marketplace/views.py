from django.shortcuts import render
from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth import authenticate
from django.http import JsonResponse
from django.contrib.auth.models import User
from .models import ClothingItem, SwapRequest, ChatMessage
import json

@csrf_exempt
def login(request):

    if request.method != "POST":
        return JsonResponse({
            "message":"Only POST allowed"
        })

    try:

        data = json.loads(request.body)

        username = data.get("username")
        password = data.get("password")

        user = authenticate(
            username=username,
            password=password
        )

        if user:

            return JsonResponse({
                "success":True,
                "message":"Login Successful"
            })

        return JsonResponse({
            "success":False,
            "message":"Invalid Credentials"
        })

    except Exception as e:

        return JsonResponse({
            "success":False,
            "error":str(e)
        })
        
@csrf_exempt
def register(request):

    if request.method == "POST":

        data = json.loads(request.body)

        username = data.get("username")
        email = data.get("email")
        password = data.get("password")

        if User.objects.filter(username=username).exists():

            return JsonResponse({
                "success": False,
                "message": "Username already exists"
            })

        User.objects.create_user(
            username=username,
            email=email,
            password=password
        )

        return JsonResponse({
            "success": True,
            "message": "User registered successfully"
        })

    return JsonResponse({
        "message": "Only POST allowed"
    })
    
@csrf_exempt
def add_item(request):

    if request.method != "POST":

        return JsonResponse({
            "message": "Only POST allowed"
        })

    try:

        username = request.POST.get("username")

        user = User.objects.get(
            username=username
        )

        ClothingItem.objects.create(
            owner=user,
            title=request.POST.get("title"),
            brand=request.POST.get("brand"),
            category=request.POST.get("category"),
            size=request.POST.get("size"),
            condition=request.POST.get("condition"),
            value=request.POST.get("value"),
            location=request.POST.get("location"),
            description=request.POST.get("description"),
            image=request.FILES.get("image")
        )

        return JsonResponse({
            "success": True,
            "message": "Item Added Successfully"
        })

    except Exception as e:

        return JsonResponse({
            "success": False,
            "error": str(e)
        })  
        
        
@csrf_exempt
def my_listings(request):

    username = request.GET.get("username")

    try:

        user = User.objects.get(
            username=username
        )

        items = ClothingItem.objects.filter(
            owner=user
        )

        data = []

        for item in items:

            data.append({
                "id": item.id,
                "title": item.title,
                "brand": item.brand,
                "category": item.category,
                "size": item.size,
                "condition": item.condition,
                "value": item.value,
                "location": item.location,
                "description": item.description,
                "image": request.build_absolute_uri(
                    item.image.url
                ) if item.image else None,
            })

        return JsonResponse(
            {
                "success": True,
                "items": data
            }
        )

    except Exception as e:

        return JsonResponse(
            {
                "success": False,
                "error": str(e)
            }
        )
        
@csrf_exempt
def all_listings(request):

    try:

        username = request.GET.get("username")

        user = User.objects.get(
            username=username
        )

        items = ClothingItem.objects.filter(
            status="Available"
        ).exclude(
            owner=user
        )

        location = request.GET.get("location")

        if location:

            items = items.filter(
                location__icontains=location
            )

        data = []

        for item in items:

            data.append({

                "id": item.id,

                "title": item.title,

                "brand": item.brand,

                "category": item.category,

                "size": item.size,

                "condition": item.condition,

                "value": item.value,

                "location": item.location,

                "description": item.description,

                "owner":
                    item.owner.username,

                "image":
                    request.build_absolute_uri(
                        item.image.url
                    )
                    if item.image
                    else None,

            })

        return JsonResponse({

            "success": True,

            "items": data

        })

    except Exception as e:

        return JsonResponse({

            "success": False,

            "error": str(e)

        })
        
@csrf_exempt
def send_swap_request(request):

    if request.method != "POST":

        return JsonResponse({
            "success": False,
            "message": "Only POST allowed"
        })

    try:

        data = json.loads(request.body)

        username = data.get("username")
        item_id = data.get("item_id")

        sender = User.objects.get(
            username=username
        )

        item = ClothingItem.objects.get(
            id=item_id
        )
        if item.status != "Available":

            return JsonResponse({

                "success": False,

                "message":
                    "This item is no longer available"

            })
        if item.owner == sender:

            return JsonResponse({
                "success": False,
                "message": "Cannot swap your own item"
            })

        SwapRequest.objects.create(
            sender=sender,
            receiver=item.owner,
            requested_item=item
        )

        return JsonResponse({
            "success": True,
            "message": "Swap request sent"
        })

    except Exception as e:

        return JsonResponse({
            "success": False,
            "error": str(e)
        })
        
@csrf_exempt
def incoming_swap_requests(request):

    try:

        username = request.GET.get("username")

        user = User.objects.get(
            username=username
        )

        requests = SwapRequest.objects.filter(
            receiver=user
        )

        data = []

        for req in requests:

            data.append({
                "id": req.id,
                "sender": req.sender.username,
                "item": req.requested_item.title,
                "status": req.status
            })

        return JsonResponse({
            "success": True,
            "requests": data
        })

    except Exception as e:

        return JsonResponse({
            "success": False,
            "error": str(e)
        })
        
@csrf_exempt
def update_swap_status(request):

    if request.method != "POST":

        return JsonResponse({
            "success": False,
            "message": "Only POST allowed"
        })

    try:

        data = json.loads(request.body)

        swap = SwapRequest.objects.get(
            id=data.get("request_id")
        )

        new_status = data.get("status")

        swap.status = new_status

        swap.save()

        if new_status == "Accepted":

            swap.requested_item.status = "Swapped"

            swap.requested_item.save()

        return JsonResponse({

            "success": True,

            "message":
                "Status Updated"

        })

    except Exception as e:

        return JsonResponse({

            "success": False,

            "error": str(e)

        })
                
@csrf_exempt
def calculate_swap_value(request):

    if request.method != "POST":

        return JsonResponse({
            "success": False,
            "message": "Only POST allowed"
        })

    try:
        data = json.loads(request.body)

        brand = data.get("brand")
        condition = data.get("condition")
        category = data.get("category")
        
        if not brand or not condition or not category:
            return JsonResponse({
                "success": False,
                "message": "Please fill brand, condition and category"
            })
        value = 100

        if brand.lower() in [
            "nike",
            "adidas",
            "puma",
            "levis"
        ]:
            value += 300

        if condition.lower() == "new":
            value += 200

        elif condition.lower() == "unused":
            value += 150

        elif condition.lower() == "good":
            value += 100

        if category.lower() in [
            "women",
            "men"
        ]:
            value += 100

        return JsonResponse({
            "success": True,
            "estimated_value": value
        })

    except Exception as e:

        return JsonResponse({
            "success": False,
            "error": str(e)
        })
        
@csrf_exempt
def outgoing_swap_requests(request):

    try:

        username = request.GET.get(
            "username"
        )

        user = User.objects.get(
            username=username
        )

        requests = SwapRequest.objects.filter(sender=user)

        data = []

        for req in requests:

            data.append({
                "id": req.id,
                "receiver":
                    req.receiver.username,
                "item":
                    req.requested_item.title,
                "status":
                    req.status
            })

        return JsonResponse({
            "success": True,
            "requests": data
        })

    except Exception as e:

        return JsonResponse({
            "success": False,
            "error": str(e)
        })
        
@csrf_exempt
def item_detail(request, item_id):

    try:

        item = ClothingItem.objects.get(
            id=item_id
        )

        return JsonResponse({

            "success": True,

            "item": {

                "id": item.id,
                "title": item.title,
                "brand": item.brand,
                "category": item.category,
                "size": item.size,
                "condition": item.condition,
                "value": item.value,
                "location": item.location,
                "description": item.description,
                "owner": item.owner.username,

                "image":
                    request.build_absolute_uri(
                        item.image.url
                    )
                    if item.image
                    else None

            }

        })

    except ClothingItem.DoesNotExist:

        return JsonResponse({

            "success": False,
            "message": "Item not found"

        })
        
@csrf_exempt
def send_message(request):

    if request.method != "POST":

        return JsonResponse({
            "message": "Only POST allowed"
        })

    try:

        data = json.loads(request.body)

        sender_username = data.get("sender")
        receiver_username = data.get("receiver")
        message_text = data.get("message")

        sender = User.objects.get(
            username=sender_username
        )

        receiver = User.objects.get(
            username=receiver_username
        )

        ChatMessage.objects.create(
            sender=sender,
            receiver=receiver,
            message=message_text
        )

        return JsonResponse({

            "success": True,
            "message": "Message sent"

        })

    except Exception as e:

        return JsonResponse({

            "success": False,
            "error": str(e)

        })
        
@csrf_exempt
def get_messages(request):

    sender_username = request.GET.get(
        "sender"
    )

    receiver_username = request.GET.get(
        "receiver"
    )

    try:

        sender = User.objects.get(
            username=sender_username
        )

        receiver = User.objects.get(
            username=receiver_username
        )

        messages = ChatMessage.objects.filter(

            sender=sender,
            receiver=receiver

        ) | ChatMessage.objects.filter(

            sender=receiver,
            receiver=sender

        )

        messages = messages.order_by(
            "created_at"
        )

        data = []

        for message in messages:

            data.append({

                "sender":
                    message.sender.username,

                "receiver":
                    message.receiver.username,

                "message":
                    message.message,

                "created_at":
                    message.created_at

            })

        return JsonResponse({

            "success": True,
            "messages": data

        })

    except Exception as e:

        return JsonResponse({

            "success": False,
            "error": str(e)

        })
        
@csrf_exempt
def delete_item(request, item_id):

    if request.method != "DELETE":

        return JsonResponse({
            "success": False,
            "message": "Only DELETE allowed"
        })

    try:

        item = ClothingItem.objects.get(
            id=item_id
        )

        item.delete()

        return JsonResponse({
            "success": True,
            "message": "Item deleted successfully"
        })

    except ClothingItem.DoesNotExist:

        return JsonResponse({
            "success": False,
            "message": "Item not found"
        })
        
@csrf_exempt
def update_item(request, item_id):

    if request.method != "PUT":

        return JsonResponse({
            "success": False,
            "message": "Only PUT allowed"
        })

    try:

        data = json.loads(
            request.body
        )

        item = ClothingItem.objects.get(
            id=item_id
        )

        item.title = data.get(
            "title",
            item.title
        )

        item.brand = data.get(
            "brand",
            item.brand
        )

        item.category = data.get(
            "category",
            item.category
        )

        item.size = data.get(
            "size",
            item.size
        )

        item.condition = data.get(
            "condition",
            item.condition
        )

        item.value = data.get(
            "value",
            item.value
        )

        item.location = data.get(
            "location",
            item.location
        )

        item.description = data.get(
            "description",
            item.description
        )

        item.save()

        return JsonResponse({
            "success": True,
            "message": "Item updated successfully"
        })

    except ClothingItem.DoesNotExist:

        return JsonResponse({
            "success": False,
            "message": "Item not found"
        })

    except Exception as e:

        return JsonResponse({
            "success": False,
            "error": str(e)
        })
        
        
@csrf_exempt
def profile(request):

    username = request.GET.get("username")

    try:

        user = User.objects.get(
            username=username
        )

        total_listings = ClothingItem.objects.filter(
            owner=user
        ).count()

        accepted_swaps = SwapRequest.objects.filter(
            sender=user,
            status="Accepted"
        ).count()

        pending_requests = SwapRequest.objects.filter(
            sender=user,
            status="Pending"
        ).count()

        return JsonResponse({

            "success": True,

            "username": user.username,

            "email": user.email,

            "total_listings":
                total_listings,

            "accepted_swaps":
                accepted_swaps,

            "pending_requests":
                pending_requests

        })

    except Exception as e:

        return JsonResponse({

            "success": False,

            "error": str(e)

        })