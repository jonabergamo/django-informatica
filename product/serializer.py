from .models import Category, Product
from rest_framework.serializers import ModelSerializer
from rest_framework import serializers
from .models import CustomUser, CartItem, Cart


class CustomUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ["email", "name"]  # e outros campos que você queira expor


class CategorySerializer(ModelSerializer):
    subcategories = serializers.PrimaryKeyRelatedField(many=True, read_only=True)

    class Meta:
        model = Category
        fields = ["name", "parent", "subcategories"]


class ProductSerializer(ModelSerializer):
    category = serializers.PrimaryKeyRelatedField(queryset=Category.objects.all())

    class Meta:
        model = Product
        fields = ["id", "name", "category", "price", "quantity"]


class CartItemSerializer(serializers.ModelSerializer):
    product = ProductSerializer()  # Utilizando o serializer do produto
    class Meta:
        model = CartItem
        fields = ['product', 'quantity']

class CartSerializer(serializers.ModelSerializer):
    items = CartItemSerializer(many=True, read_only=True, source='cartitem_set')

    class Meta:
        model = Cart
        fields = ['id', 'user', 'items'] # 'items' irá conter os produtos do carrinho