from django.urls import path
from . import views

urlpatterns = [
    path('register/', views.register),  
    path('login/', views.login),
    path('add-item/', views.add_item),
    path('my-listings/', views.my_listings),
    path('all-listings/', views.all_listings),
    path('send-swap-request/', views.send_swap_request),
    path('incoming-swaps/', views.incoming_swap_requests),
    path('update-swap/', views.update_swap_status),
    path('calculate-value/', views.calculate_swap_value),
    path('outgoing-swaps/', views.outgoing_swap_requests),
    path("item/<int:item_id>/", views.item_detail),
    path("send-message/", views.send_message),
    path("get-messages/", views.get_messages),
    path("delete-item/<int:item_id>/",views.delete_item),
    path("update-item/<int:item_id>/",views.update_item),
    path("profile/", views.profile),
]