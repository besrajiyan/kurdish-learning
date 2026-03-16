from django.urls import path
from .views import MyProgressView, ChildProgressView, MyChildrenView

urlpatterns = [
    path('me/', MyProgressView.as_view(), name='my-progress'),
    path('children/', MyChildrenView.as_view(), name='my-children'),
    path('children/<int:child_id>/', ChildProgressView.as_view(), name='child-progress'),
]
