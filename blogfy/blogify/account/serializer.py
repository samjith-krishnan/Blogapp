from rest_framework import serializers
from django.contrib.auth.models import User
from .models import *

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model=User
        fields=['id','first_name','last_name','email','username','password']

    def create(self, validated_data):
        return User.objects.create_user(**validated_data)
    
class ProfileSerializer(serializers.ModelSerializer):
    user=serializers.CharField(read_only=True)
    class Meta:
        model=Profile
        fields="__all__"

    
class PostSerializer(serializers.ModelSerializer):
    author=ProfileSerializer(read_only=True)
    
    date=serializers.CharField(read_only=True)
    like_count = serializers.ReadOnlyField()

    class Meta:
        model=Post
        fields=['id','title', 'author', 'image', 'blog', 'date', 'like_count']

    def get_like_count(self, obj):
        return obj.like_count
    
    
class CommentSerializer(serializers.ModelSerializer):
    user=serializers.CharField(read_only=True)
    post=serializers.CharField(read_only=True)
    class Meta:
        model=Comment
        fields=['date','comment','user','post']

class Messageserializer(serializers.ModelSerializer):
    sender=serializers.CharField(read_only=True)
    receiver=serializers.CharField(read_only=True)

    class Meta:
        model=MessageModel
        fields='__all__'




