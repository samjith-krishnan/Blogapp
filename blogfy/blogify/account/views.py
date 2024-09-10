from django.shortcuts import render
from rest_framework import serializers, viewsets
from rest_framework.views import APIView
from .serializer import *
from rest_framework.response import Response
from .models import *
from rest_framework.decorators import action
from rest_framework import generics
from rest_framework import permissions,authentication
from rest_framework import status



# Create your views here.


class UserView(viewsets.ModelViewSet):
    serializer_class=UserSerializer
    queryset=User.objects.all()

    def create(self,request,*args,**kw):
        serializer=UserSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(data=serializer.data)
        else:
            return Response(data=serializer.errors)
        

class UserDelete(APIView):
    authentication_classes = [authentication.TokenAuthentication]
    permission_classes = [permissions.IsAuthenticated]

    def delete(self, request, *args, **kwargs):
        user_id = request.user.id
        try:
            user = User.objects.get(id=user_id)
            user.delete()
            return Response('deleted')
        except User.DoesNotExist:
            return Response('error')

        
        
class UserProfile(viewsets.ModelViewSet):
    authentication_classes = [authentication.TokenAuthentication]
    permission_classes = [permissions.IsAuthenticated]
    
    serializer_class=ProfileSerializer
    queryset=Profile.objects.all()


    def create(self,request,*args,**kwargs):
        
        serializer=ProfileSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(user=request.user)
            return Response(data=serializer.data)
        else:
            return Response(data=serializer.errors)
    
    def put(self, request, *args, **kwargs):
        profile=Profile.objects.get(user=request.user)
        serializer=ProfileSerializer(profile,data=request.data,partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(data=serializer.data)
        else:
            return Response(data=serializer.errors)
    
class PostView(viewsets.ModelViewSet):
    authentication_classes = [authentication.TokenAuthentication]
    permission_classes = [permissions.IsAuthenticated]

    serializer_class=PostSerializer
    queryset=Post.objects.all()

    def create(self, request, *args, **kwargs):
        serializer=PostSerializer(data=request.data)
        if serializer.is_valid():
            profile = Profile.objects.get(user=request.user)
            serializer.save(author=profile)
            return Response(data=serializer.data)
        else:
            return Response(data=serializer.errors)
        
        
    def destroy(self, request, *args, **kwargs):

        object=self.get_object()
        profile = Profile.objects.filter(user=request.user).first()
        if profile == object.author:
            object.delete()
            return Response(data='data deleted')
        else:
            return Response(data="cant delete data")


    @action(methods=['POST'],detail=True)
    def comment(self,request,*args,**kwargs):

        object=self.get_object()
        user=request.user
        serializer=CommentSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(post=object,user=user)
            return Response(data=serializer.data)
        else:
            return Response(data=serializer.errors)


    @action(methods=['POST'],detail=True)
    def like(self,request,*args,**kwargs):

        object  =self.get_object()
        user = request.user
        if object.likes.filter(id=user.id).exists():
            object.likes.remove(user)
            liked=False
            return Response({"liked":liked,'count':object.likes.count()},status=status.HTTP_200_OK)
        else:

            object.likes.add(user)
            liked=True
            return Response({"liked":liked,'count':object.likes.count()},status=status.HTTP_200_OK)
     
class CommentView(generics.ListAPIView):
    serializer_class=CommentSerializer

    def get_queryset(self):
        post_id=self.kwargs['post_id']
        return Comment.objects.filter(post_id=post_id)
    

    
class UserProfileView(APIView):
    authentication_classes = [authentication.TokenAuthentication]
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request, *args, **kwargs):
        user = request.user
        # Get the user's profile
        profile = Profile.objects.filter(user=user).first()
        # Get the user's posts
        posts = Post.objects.filter(author=profile)
        post_serializer = PostSerializer(posts, many=True)

        return Response(post_serializer.data)
    
class LogUserView(APIView):
    authentication_classes = [authentication.TokenAuthentication]
    permission_classes = [permissions.IsAuthenticated]
    def get(self, request, *args, **kwargs):
        user=request.user
        profile=Profile.objects.filter(user=user).first()
        serializer=ProfileSerializer(profile)
        return Response(data=serializer.data)

    
class UserLikedPostsView(APIView):
    authentication_classes = [authentication.TokenAuthentication]
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request, *args, **kwargs):
        user = request.user 
        liked_posts = Post.objects.filter(likes=user)
        post_serializer = PostSerializer(liked_posts, many=True)

        return Response(post_serializer.data)
    


class OtherUser(APIView):
    authentication_classes = [authentication.TokenAuthentication]
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request, *args, **kwargs):
        user = User.objects.get(id=kwargs.get('id'))
        profile = Profile.objects.filter(user=user).first()
        posts = Post.objects.filter(author=profile)
        post_serializer = PostSerializer(posts, many=True)

        return Response(post_serializer.data)
    
class MessageView(viewsets.ModelViewSet):
    authentication_classes = [authentication.TokenAuthentication]
    permission_classes = [permissions.IsAuthenticated]

    serializer_class=Messageserializer
    def create(self, request, *args, **kwargs):
        sender=request.user
        reviever=User.objects.get(id=kwargs.get('id'))
        serializer=Messageserializer(data=request.data)
        if serializer.is_valid():
            serializer.save(sender=sender,receiver=reviever)
            return Response(data=serializer.data)
        else:
            return Response(data=serializer.errors)

    def get_queryset(self):
        user_id = self.kwargs.get('id')
        if user_id:
            return MessageModel.objects.filter(receiver_id=user_id)
        return MessageModel.objects.all()



    


        
    



