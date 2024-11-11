from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.contrib.auth import authenticate
from django.contrib.auth.models import User
from app.models import Profile, Student, Instructor, Staff, Advisor, Course  # Import all role-specific models
from .serializers import CourseSerializer

@api_view(['GET'])
def search_courses(request):
    query = request.GET.get('q', '')  # Get the query parameter from the request
    if query:
        # Search by subject, course number, or title
        courses = Course.objects.filter(
            subject__icontains=query
        ) | Course.objects.filter(
            course_number__icontains=query
        ) | Course.objects.filter(
            title__icontains=query
        )
    else:
        courses = Course.objects.all()  # Return all courses if no query

    serializer = CourseSerializer(courses, many=True)
    return Response(serializer.data)


# API endpoint that handles user authenticate and builds user object
@api_view(['POST'])
def authenticate_user(request):
    email = request.data.get('email')                   # requested email
    password = request.data.get('password')             # requested password

    user = authenticate(username=email, password=password)      # django authenticate

    # requested credentials match user. 
    if user is not None:
        try:
            profile = Profile.objects.get(user=user)
        except Profile.DoesNotExist:
            return Response({'error': 'Profile not found'}, status=status.HTTP_404_NOT_FOUND)

        role_model_mapping = {
            'student': Student,
            'instructor': Instructor,
            'staff': Staff,
            'advisor': Advisor,
        }

        # get models attributes of profile
        model = role_model_mapping.get(profile.role)

        if model:
            try:
                role_specific_obj = model.objects.get(profile=profile)
                role_data = {}

                # storing role unique date inside of role_data
                if profile.role == 'student':
                    role_data = {
                        'uid': role_specific_obj.profile.uid,
                        'starting_semester': role_specific_obj.starting_semester,
                        'department': role_specific_obj.department.department_name if role_specific_obj.department else None,
                        'gpa': role_specific_obj.gpa,
                        'major': role_specific_obj.major.major_name if role_specific_obj.major else None,
                        'active_registration': role_specific_obj.active_registration,
                        'class': role_specific_obj.year,
                    }
                elif profile.role == 'instructor':
                    role_data = {
                        'hired_semester': role_specific_obj.hired_semester,
                        'department': role_specific_obj.department.department_name if role_specific_obj.department else None,
                    }
            except model.DoesNotExist:
                return Response({'error': f'{profile.role.capitalize()} profile not found'}, status=status.HTTP_404_NOT_FOUND)
        else:
            role_data = {}

        # return object
        user_data = {
            'name': user.get_full_name(),
            'first_name': user.first_name,
            'last_name': user.last_name,
            'email': user.email,
            'phone': profile.phone,
            'role': profile.role,
            'citizen': profile.citizen,
            'gender': profile.gender,
            'ethnicity': profile.ethnicity,
        }
        user_data.update(role_data)         # adding unique role information

        return Response(user_data, status=status.HTTP_200_OK)
    else:
        return Response({'error': 'Invalid credentials'}, status=status.HTTP_400_BAD_REQUEST)

# API endpoint that adds user to course
@api_view(['POST'])
def register_course(request):
    try: 
        student_id = request.data.get('student_id')
        course_id = request.data.get('course_id')

        # Retrieve the student and course instances
        student = Student.objects.get(pk=student_id)
        course = Course.objects.get(pk=course_id)

        student.courses.add(course)  # Add the course to the student's active courses
        student.save()

        return Response({'message': 'Course registered successfully'}, status=status.HTTP_200_OK)
    
    except Exception as e:
        return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)
    
# API endpoint that removes user from course
@api_view(['POST'])
def remove_course(request):
    try: 
        student_id = request.data.get('student_id')
        course_id = request.data.get('course_id')
        print(student_id)
        print(course_id)

        # Retrieve the student and course instances
        student = Student.objects.get(pk=student_id)
        course = Course.objects.get(pk=course_id)

        # Remove the course from the student's active courses
        student.courses.remove(course)
        student.save()

        return Response({'message': 'Course removed successfully'}, status=status.HTTP_200_OK)
    
    except Exception as e:
        return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)