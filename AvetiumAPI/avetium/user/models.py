from django.db import models
import uuid
from django.contrib.auth.models import AbstractBaseUser

from user.managers import UserManager

class User(AbstractBaseUser):
    id = models.UUIDField(default=uuid.uuid4, editable=False, unique=True, primary_key=True)
    full_name = models.CharField(max_length=250, null=False, blank = False)
    organization_name = models.CharField(max_length=100, null=False, blank=False )
    email = models.EmailField(max_length=100, unique=True, null=False, blank=False)
    organization_id = models.CharField(max_length=100, null=True, blank=True )
    
    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = ["full_name", "organization_name"]

    objects = UserManager()
    
    def __str__(self):
        return self.email

