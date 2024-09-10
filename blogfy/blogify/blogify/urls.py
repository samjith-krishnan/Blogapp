"""
URL configuration for blogify project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path,include
from account.views import *
from rest_framework.routers import DefaultRouter
from django.conf import settings
from django.conf.urls.static import static
from rest_framework.authtoken.views import obtain_auth_token


router = DefaultRouter()

router.register('users',UserView,basename='user')
# router.register('users/delete',UserDelete,basename='userdelete')

router.register('post',PostView,basename='post')
router.register('profile',UserProfile,basename='profile')
router.register('message',MessageView,basename='message')







urlpatterns = [
    path('admin/', admin.site.urls),    
    path('post/<int:post_id>/comments/', CommentView.as_view(), name='post-comments'),
    path('token',obtain_auth_token),
    path('detail',UserProfileView.as_view(),name='detail'),
    path('other/<int:id>',OtherUser.as_view(),name='other'),
    path('profile/liked/', UserLikedPostsView.as_view(),name='liked'),
    path('user/log',LogUserView.as_view(),name='loguser'),
    path('user/delete',UserDelete.as_view(),name='deleteuser'),
    path('user/<int:id>/', include(router.urls)),

    


    
]+router.urls+static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)


