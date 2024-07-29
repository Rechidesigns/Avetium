from django.shortcuts import render
from user.models import User
from .serializers import SignUpSerializer, ListUsersSerializer, UserUpdateSerializer
from rest_framework import generics, permissions
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.exceptions import NotFound
# Create your views here.
from django.shortcuts import get_object_or_404

class SignUpView(APIView):
    permission_classes = [permissions.AllowAny]
    serializer_class = SignUpSerializer
    
    def post(self, request):
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)



class ListUsersView(APIView):
    permission_classes = [permissions.AllowAny]
    serializer_class = ListUsersSerializer
    
    def get(self, request):
        categories = User.objects.all()
        serializer = self.serializer_class(categories, many=True)
        return Response(serializer.data)


class UpdateUserView(APIView):
    permission_classes = [permissions.AllowAny]
    serializer_class = UserUpdateSerializer

    def put(self, request, user_id):
        user = get_object_or_404(User, id=user_id)
        serializer = self.serializer_class(user, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class DeleteUserView(APIView):
    permission_classes = [permissions.AllowAny]

    def delete(self, request, user_id):
        user = get_object_or_404(User, id=user_id)
        user.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)