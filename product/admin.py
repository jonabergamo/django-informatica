from django.contrib import admin
from .models import Cart, CartItem, CustomUser, Product, Category

# Register your models here.
admin.site.register(Cart)
admin.site.register(CartItem)
admin.site.register(CustomUser)
admin.site.register(Product)
admin.site.register(Category)