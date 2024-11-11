# import serializers from the REST framework
from rest_framework import serializers
from .models import Instructor, Department, Course

class CourseSerializer(serializers.ModelSerializer):
    instructor = serializers.SerializerMethodField()  # Use SerializerMethodField to customize instructor representation

    class Meta:
        model = Course
        fields = ['uid', 'subject', 'course_number', 'title', 'credits', 'instructor', 'total_seats', 'available_seats']

    def get_instructor(self, obj):
        if obj.instructor and obj.instructor.profile:
            return f"{obj.instructor.profile.user.first_name} {obj.instructor.profile.user.last_name}"
        return "TBA"  # Return a placeholder if no instructor is assigned
    
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
