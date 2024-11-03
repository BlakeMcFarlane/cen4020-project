from django.contrib import admin
from django.urls import path, include
from rest_framework import routers
from app import views

# Create a router object
router = routers.DefaultRouter()


urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include(router.urls)), 
    path('api/authenticate/', views.authenticateUser, name='authenticate'),
] 
