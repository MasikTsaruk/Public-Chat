from rest_framework.decorators import api_view
from rest_framework.response import Response
from .serializers import UserSerializers, LoginSerializer
from .tokenauthentication import JWTAuthentication


@api_view(['POST'])
def register_user(request):
    serializer = UserSerializers(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=201)
    return Response(serializer.errors, status=400)


@api_view(['POST'])
def login_user(request):
    serializer = LoginSerializer(data=request.data)
    if serializer.is_valid():
        token = JWTAuthentication.generate_token(payload=serializer.data)
        return Response({
            "message": "Login Successfull",
            "token": token,
            "user": serializer.data
        }, status=201)
    return Response(serializer.errors, status=400)
