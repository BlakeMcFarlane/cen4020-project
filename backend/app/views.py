from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.contrib.auth import authenticate
from django.contrib.auth.models import User
from app.models import Profile, Student, Instructor, Staff, Advisor  # Import all role-specific models

@api_view(['POST'])
def authenticateUser(request):
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
                        'starting_semester': role_specific_obj.starting_semester,
                        'department': role_specific_obj.department.department_name if role_specific_obj.department else None,
                        'gpa': role_specific_obj.gpa,
                        'major': role_specific_obj.major.major_name if role_specific_obj.major else None,
                        'active_registration': role_specific_obj.active_registration,
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
            'role': profile.role,
        }
        user_data.update(role_data)         # adding unique role information

        return Response(user_data, status=status.HTTP_200_OK)
    else:
        return Response({'error': 'Invalid credentials'}, status=status.HTTP_400_BAD_REQUEST)
