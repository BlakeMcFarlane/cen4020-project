from django.contrib import admin
from .models import Instructor, Department, Profile, Staff, Student, Advisor, Course

# Register your models here.
admin.site.register(Profile)
admin.site.register(Department)
admin.site.register(Instructor)
admin.site.register(Staff)
admin.site.register(Advisor)
admin.site.register(Student)
admin.site.register(Course)


