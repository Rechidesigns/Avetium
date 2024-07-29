from django.urls import path
from .views import SignUpView, ListUsersView, UpdateUserView, DeleteUserView

urlpatterns = [
    path('create-users/', SignUpView.as_view()),
    path('list-users/', ListUsersView.as_view()),
    path('edit-users/<uuid:user_id>/', UpdateUserView.as_view()),
    path('delete-users/<uuid:user_id>/', DeleteUserView.as_view()),

] 
