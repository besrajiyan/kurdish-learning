from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/v1/users/', include('kurdish_learning.apps.users.urls')),
    path('api/v1/lessons/', include('kurdish_learning.apps.lessons.urls')),
    path('api/v1/exercises/', include('kurdish_learning.apps.exercises.urls')),
    path('api/v1/progress/', include('kurdish_learning.apps.progress.urls')),
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
