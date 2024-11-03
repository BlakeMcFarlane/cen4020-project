from django.db.models.signals import post_save
from django.dispatch import receiver
from .models import Profile, Student, Instructor, Staff, Advisor

@receiver(post_save, sender=Profile)
def create_role_based_object(sender, instance, created, **kwargs):
    if created:  # Only run when a new Profile is created
        if instance.role == 'student':
            Student.objects.create(profile=instance)
        elif instance.role == 'instructor':
            Instructor.objects.create(profile=instance)
        elif instance.role == 'staff':
            Staff.objects.create(profile=instance)
        elif instance.role == 'advisor':
            Advisor.objects.create(profile=instance)