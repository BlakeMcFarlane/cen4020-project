from django.contrib import admin
from django.urls import path, include
from rest_framework import routers
from app import views

# Create a router object
router = routers.DefaultRouter()

# Register the viewsets with the router
router.register(r'departments', views.DepartmentView, basename='department')
router.register(r'instructors', views.InstructorView, basename='instructor')

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include(router.urls)),  # Route for API endpoints
]
