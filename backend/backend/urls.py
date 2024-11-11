from django.contrib import admin
from django.urls import path, include
from rest_framework import routers
from app import views
from django.conf import settings
from django.conf.urls.static import static

# Create a router object
router = routers.DefaultRouter()


urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include(router.urls)), 
    path('api/authenticate/', views.authenticate_user, name='authenticate'),
    path('api/search-courses/', views.search_courses, name='search_courses'),
    path('api/register-course/', views.register_course, name='register-course'),
    path('api/remove-course/', views.remove_course, name='remove-course'),
] 

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)