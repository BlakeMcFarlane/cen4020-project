# import serializers from the REST framework
from rest_framework import serializers
from .models import Instructor, Department, Course, Profile, Student, Major
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

class CourseSerializer(serializers.ModelSerializer):
    instructor = serializers.PrimaryKeyRelatedField(queryset=Instructor.objects.all(), write_only=True)
    department = serializers.PrimaryKeyRelatedField(queryset=Department.objects.all(), write_only=True)
    instructor_display = serializers.SerializerMethodField(read_only=True)
    department_display = serializers.CharField(source='department.department_name', read_only=True)

    class Meta:
        model = Course
        fields = [
            'uid', 
            'subject', 
            'course_number', 
            'title', 
            'credits', 
            'instructor',      # Accepts instructor ID for POST
            'department',      # Accepts department ID for POST
            'instructor_display',  # Displays instructor name for GET
            'department_display',  # Displays department name for GET
            'total_seats', 
            'available_seats'
        ]

    def get_instructor_display(self, obj):
        if obj.instructor and obj.instructor.profile:
            return f"{obj.instructor.profile.user.first_name} {obj.instructor.profile.user.last_name}"
        return "TBA"
    

class MajorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Major
        fields = ['uid', 'major_name']


# Student serializer
class StudentSerializer(serializers.ModelSerializer):
    profile = ProfileSerializer()
    major = MajorSerializer()

    class Meta:
        model = Student
        fields = ['profile', 'major', 'year']