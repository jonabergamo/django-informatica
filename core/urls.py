from django.contrib import admin
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from product.views import (
    ViewSetCategory,
    ViewSetProduct,
    CustomUserViewSet,
    CartViewSet,
)

router = DefaultRouter()
router.register("category", ViewSetCategory, basename="Category")
router.register("product", ViewSetProduct, basename="Product")
router.register("users", CustomUserViewSet, basename="User")
router.register("cart", CartViewSet, basename="Cart")

urlpatterns = [
    path("admin/", admin.site.urls),
    path("", include(router.urls)),
]
