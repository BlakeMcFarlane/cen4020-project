from rest_framework import viewsets
from .serializers import DepartmentSerializer, InstructorSerializer
from .models import Department, Instructor

# Department ViewSet
class DepartmentView(viewsets.ModelViewSet):
    serializer_class = DepartmentSerializer
    queryset = Department.objects.all()

# Instructor ViewSet
class InstructorView(viewsets.ModelViewSet):
    serializer_class = InstructorSerializer
    queryset = Instructor.objects.all()
