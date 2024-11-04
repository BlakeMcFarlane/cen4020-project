# import serializers from the REST framework
from rest_framework import serializers
from .models import Instructor, Department, Course

class CourseSerializer(serializers.ModelSerializer):
    class Meta:
        model = Course
        fields = ['subject', 'course_number', 'title', 'credits', 'instructor', 'total_seats', 'available_seats']

        
# Department serializer
class DepartmentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Department
        fields = ('departmentID', 'departmentName')

# Instructor serializer
class InstructorSerializer(serializers.ModelSerializer):
    departmentName = serializers.CharField(source='departmentID.departmentName', read_only=True)        # Custom field to read on frontend

    class Meta:
        model = Instructor
        fields = ('instructorID', 'firstName', 'lastName', 'instructorPhone', 'departmentID', 'departmentName', 'hiredSemster')
