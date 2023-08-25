from .models import Category, Product
from rest_framework.serializers import ModelSerializer
from rest_framework import serializers
from .models import CustomUser, CartItem, Cart


class CustomUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ["id", "email", "name", "is_staff", "is_superuser"]
        extra_kwargs = {"password": {"write_only": True}}


class CategorySerializer(ModelSerializer):
    subcategories = serializers.PrimaryKeyRelatedField(many=True, read_only=True)

    class Meta:
        model = Category
        fields = ["name", "parent", "subcategories"]


class ProductSerializer(ModelSerializer):
    category = serializers.PrimaryKeyRelatedField(queryset=Category.objects.all())
    promotional_price = serializers.DecimalField(
        max_digits=10, decimal_places=2, required=False, allow_null=True
    )

    class Meta:
        model = Product
        fields = [
            "id",
            "name",
            "category",
            "price",
            "promotional_price",
            "rating",
            "quantity",
            "image",
        ]


class CartItemSerializer(serializers.ModelSerializer):
    product = ProductSerializer()

    class Meta:
        model = CartItem
        fields = ["product", "quantity"]


class CartSerializer(serializers.ModelSerializer):
    items = CartItemSerializer(many=True, read_only=True)
    total_price = serializers.SerializerMethodField()

    class Meta:
        model = Cart
        fields = ["user", "items", "total_price"]  # removido o "id" daqui

    def get_total_price(self, obj):
        total = sum(item.product.price * item.quantity for item in obj.items.all())
        return total
