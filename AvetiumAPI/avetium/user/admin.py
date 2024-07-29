from django.contrib import admin
from .models import User

# Register your models here.
class UserAdmin(admin.ModelAdmin):
    list_display = ('full_name', 'organization_name', 'email', 'organization_id')
    search_fields = ('email', 'full_name')

admin.site.register(User, UserAdmin)