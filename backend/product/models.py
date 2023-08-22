from django.db import models
from django.contrib.auth.models import User
from django.contrib.auth.models import AbstractBaseUser
from django.db.models.signals import post_save
from django.dispatch import receiver


class CustomUser(AbstractBaseUser):
    email = models.EmailField(unique=True)
    name = models.CharField(max_length=100)
    password = models.CharField(max_length=50)
    # outros campos...

    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = ["name"]

    def __str__(self):
        return self.email



class Category(models.Model):
    name = models.CharField("Category Name", max_length=25)
    parent = models.ForeignKey(
        "self", blank=True, null=True, related_name="children", on_delete=models.CASCADE
    )

    def __str__(self):
        return self.name


# Create your models here.
class Product(models.Model):
    name = models.CharField("Name", max_length=250)
    category = models.ForeignKey(Category, on_delete=models.CASCADE)
    image = models.CharField("img_url", max_length=250)
    price = models.DecimalField(max_digits=10, decimal_places=2)
    quantity = models.IntegerField(default=0)

    def __str__(self):
        return self.name


class Cart(models.Model):
    user = models.OneToOneField(CustomUser, primary_key=True, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)


class CartItem(models.Model):
    cart = models.ForeignKey(Cart, related_name="items", on_delete=models.CASCADE)
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    quantity = models.PositiveIntegerField(default=0)


@receiver(post_save, sender=CustomUser)
def create_cart(sender, instance=None, created=False, **kwargs):
    if created:
        Cart.objects.create(user=instance)
