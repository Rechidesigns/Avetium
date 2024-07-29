from user.models import User
from rest_framework import serializers # type: ignore

class SignUpSerializer(serializers.ModelSerializer):

    class Meta:
        model = User
        fields = ['id', 'email', 'organization_name', 'full_name', 'organization_id', 'password']


class ListUsersSerializer(serializers.ModelSerializer):

    class Meta:
        model = User
        fields = ['id', 'email', 'organization_name', 'full_name', 'organization_id', 'password']
        
        
class UserUpdateSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['organization_name', 'full_name', 'organization_id']