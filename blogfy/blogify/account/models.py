from django.db import models
from django.contrib.auth.models import User

# Create your models here.

class Profile(models.Model):
    user=models.OneToOneField(User,on_delete=models.CASCADE)
    dp=models.ImageField(upload_to='media')
    bio=models.CharField(max_length=100)

class Post(models.Model):
    title=models.CharField(max_length=100)
    author=models.ForeignKey(Profile,on_delete=models.CASCADE)
    image=models.ImageField(upload_to='media-post')
    blog=models.TextField()
    date=models.DateTimeField(auto_now_add=True)
    likes = models.ManyToManyField(User, related_name='liked_posts', blank=True)

    @property
    def like_count(self):
        return self.likes.all().count
    
    def __str__(self):
        return self.title

class Comment(models.Model):
    comment=models.CharField(max_length=100)
    user=models.ForeignKey(User,on_delete=models.CASCADE)
    post=models.ForeignKey(Post,on_delete=models.CASCADE)
    date=models.DateTimeField(auto_now_add=True)

class MessageModel(models.Model):
    sender=models.ForeignKey(User,on_delete=models.CASCADE,related_name='sent_messages')
    receiver=models.ForeignKey(User,on_delete=models.CASCADE,related_name='receive_messages')
    message=models.TextField()
    img=models.ImageField(upload_to='message',null=True)






    




