from django.contrib import admin
from .models import Cart, CartItem, CustomUser, Product, Category


class ProductAdmin(admin.ModelAdmin):
    pass  # Adicionei essa linha aqui


admin.site.register(Product, ProductAdmin)

# Register your models here.
admin.site.register(Cart)
admin.site.register(CartItem)
admin.site.register(CustomUser)
admin.site.register(Category)
