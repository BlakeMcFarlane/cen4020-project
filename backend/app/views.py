from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.contrib.auth import authenticate


# Function for creating a user
@api_view(['POST'])
def registerUser(request):
    email = request.data.get('email')
    password = request.data.get('password')

    user = authenticate(username=email, password=password)

    if user is not None:
        print("HEY!")
    else:
        print("Who are you!")

    return Response({'message': 'User registered successfully'}, status=status.HTTP_201_CREATED)
