# import serializers from the REST framework
from rest_framework import serializers
from .models import Instructor, Department, Course, Profile
from django.contrib.auth.models import User

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['first_name', 'last_name', 'username']

class ProfileSerializer(serializers.ModelSerializer):
    user = UserSerializer()

    class Meta:
        model = Profile
        fields = ['uid', 'user', 'role', 'phone', 'gender', 'ethnicity', 'citizen']

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
        fields = ['uid', 'department_name']

# Instructor serializer
class InstructorSerializer(serializers.ModelSerializer):
    profile = ProfileSerializer()
    department = DepartmentSerializer()

    class Meta:
        model = Instructor
        fields = ['profile', 'department', 'hired_semester']