# Generated by Django 3.2.20 on 2023-08-24 17:38

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('product', '0002_auto_20230824_1435'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='product',
            name='password',
        ),
        migrations.AlterField(
            model_name='customuser',
            name='password',
            field=models.CharField(max_length=100),
        ),
    ]
