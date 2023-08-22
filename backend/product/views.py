from django.shortcuts import render
from rest_framework import viewsets, status
from .serializer import CategorySerializer, ProductSerializer
from .models import Category, Product
from rest_framework.response import Response
from rest_framework.decorators import action
from django.db.models import Q
from .models import CustomUser, Cart, CartItem
from .serializer import CustomUserSerializer, CartItemSerializer, CartSerializer
from django.db import transaction
from django.dispatch import receiver
from django.db.models.signals import post_save
from django.contrib.auth import get_user_model
from django.db import IntegrityError
from bcrypt import hashpw, gensalt, checkpw
from django.contrib.auth import authenticate


class CustomUserViewSet(viewsets.ModelViewSet):
    queryset = CustomUser.objects.all()
    serializer_class = CustomUserSerializer

    @action(detail=False, methods=['post'])
    def register(self, request):
        email = request.data.get('email')
        name = request.data.get('name')
        password = request.data.get('password')

        # Hashing the password
        hashed_password = hashpw(password.encode('utf-8'), gensalt())

        try:
            user = CustomUser.objects.create(email=email, name=name, password=hashed_password.decode('utf-8'))
            # Create an empty cart for this user
            Cart.objects.create(user=user)
            return Response({'status': 'User created'}, status=status.HTTP_201_CREATED)
        except IntegrityError:
            return Response({'error': 'Email already exists'}, status=status.HTTP_400_BAD_REQUEST)

    @action(detail=False, methods=['post'])
    def login(self, request):
        email = request.data.get('email')
        password = request.data.get('password')

        try:
            user = CustomUser.objects.get(email=email)
        except CustomUser.DoesNotExist:
            return Response({'error': 'User not found'}, status=status.HTTP_404_NOT_FOUND)

        if checkpw(password.encode('utf-8'), user.password.encode('utf-8')):
    # You can also generate and return a token here if you are using token-based authentication
            return Response({'status': 'Login successful', 'user_id': user.id}, status=status.HTTP_200_OK)
        else:
            return Response({'error': 'Incorrect password'}, status=status.HTTP_400_BAD_REQUEST)


def get_category_ids(category):
    ids = [category.id]
    for child in category.children.all():
        ids += get_category_ids(child)
    return ids


# Create your views here.
class ViewSetCategory(viewsets.ModelViewSet):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer


class ViewSetProduct(viewsets.ModelViewSet):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer

    @action(detail=False, methods=["get"], url_path="category/(?P<category_id>\d+)")
    def products_by_category(self, request, category_id=None):
        try:
            category = Category.objects.get(id=category_id)
            category_ids = get_category_ids(category)
            query = Q(category_id__in=category_ids)
            products_in_category = Product.objects.filter(query)
            serializer = self.get_serializer(products_in_category, many=True)
            return Response(serializer.data)
        except Category.DoesNotExist:
            return Response(
                {"error": "Categoria não encontrada"}, status=status.HTTP_404_NOT_FOUND
            )

    @action(detail=True, methods=["post"], url_path="add_stock")
    def add_stock(self, request, pk=None):
        product = self.get_object()
        quantity_to_add = request.data.get("quantity", 0)
        product.quantity += int(quantity_to_add)
        product.save()
        return Response(
            {
                "success": f"Adicionado {quantity_to_add} ao estoque",
                "total_quantity": product.quantity,
            },
            status=status.HTTP_200_OK,
        )

    @action(detail=True, methods=["post"], url_path="sell")
    def sell(self, request, pk=None):
        product = self.get_object()
        quantity_to_sell = request.data.get("quantity", 0)
        if product.quantity < int(quantity_to_sell):
            return Response(
                {"error": "Quantidade insuficiente em estoque"},
                status=status.HTTP_400_BAD_REQUEST,
            )
        product.quantity -= int(quantity_to_sell)
        product.save()
        return Response(
            {
                "success": f"Vendidos {quantity_to_sell} itens",
                "total_quantity": product.quantity,
            },
            status=status.HTTP_200_OK,
        )


class CartViewSet(viewsets.ModelViewSet):
    queryset = Cart.objects.all()
    serializer_class = CartSerializer

    @action(detail=True, methods=["post"])
    def add_product(self, request, pk=None):
        cart = self.get_object()
        product_id = request.data.get("product_id")
        quantity = int(request.data.get("quantity", 1))

        try:
            product = Product.objects.get(id=product_id)
        except Product.DoesNotExist:
            return Response(
                {"error": "Product not found"}, status=status.HTTP_404_NOT_FOUND
            )

        cart_item, created = CartItem.objects.get_or_create(cart=cart, product=product)
        cart_item.quantity += quantity
        cart_item.save()

        return Response(CartSerializer(cart).data, status=status.HTTP_200_OK)

    @action(detail=True, methods=["post"])
    def remove_product(self, request, pk=None):
        cart = self.get_object()
        product_id = request.data.get("product_id")

        try:
            product = Product.objects.get(id=product_id)
        except Product.DoesNotExist:
            return Response(
                {"error": "Product not found"}, status=status.HTTP_404_NOT_FOUND
            )

        cart_item = CartItem.objects.filter(cart=cart, product=product).first()
        if cart_item:
            cart_item.delete()
            return Response(CartSerializer(cart).data, status=status.HTTP_200_OK)
        else:
            return Response(
                {"error": "Product not found in cart"}, status=status.HTTP_404_NOT_FOUND
            )

    @action(detail=True, methods=["post"])
    def checkout(self, request, pk=None):
        cart = self.get_object()

        # Buscando os itens do carrinho através do modelo CartItem
        cart_items = CartItem.objects.filter(cart=cart)

        # Inicia uma transação
        with transaction.atomic():
            # Itera pelos itens do carrinho, atualizando o estoque e criando um histórico de pedidos (opcional)
            for item in cart_items:
                product = item.product
                if product.quantity < item.quantity:
                    return Response(
                        {"error": f"Not enough stock for product {product.name}"},
                        status=status.HTTP_400_BAD_REQUEST,
                    )

                product.quantity -= item.quantity
                product.save()

                # (Opcional) Salvar informações no histórico de pedidos

            # Limpa o carrinho
            cart_items.delete()

        return Response(CartSerializer(cart).data, status=status.HTTP_200_OK)
