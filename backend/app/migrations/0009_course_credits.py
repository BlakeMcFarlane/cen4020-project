# Generated by Django 5.1.1 on 2024-11-14 04:04

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('app', '0008_remove_course_credits'),
    ]

    operations = [
        migrations.AddField(
            model_name='course',
            name='credits',
            field=models.IntegerField(blank=True, null=True),
        ),
    ]
