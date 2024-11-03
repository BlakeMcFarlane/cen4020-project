from django.db import models
from django.contrib.auth.models import User

class Profile(models.Model):
    ROLE_CHOICES = (
        ('instructor', 'Instructor'),
        ('student', 'Student'),
        ('staff', 'Staff'),
        ('advisor', 'Advisor'),
    )
    uid = models.AutoField(primary_key=True)
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    role = models.CharField(max_length=10, choices=ROLE_CHOICES)
    phone = models.CharField(max_length=10)

    def __str__(self):
        return f'{self.user.username} - {self.get_role_display()}'

# department class table
class Department(models.Model):
    uid = models.AutoField(primary_key=True)
    department_name = models.CharField(max_length=100)

    def __str__(self):
        return self.department_name
    
# major class table
class Major(models.Model):
    uid = models.AutoField(primary_key=True)
    major_name = models.CharField(max_length=100)
    description = models.TextField(max_length=300)
    department = models.ForeignKey(Department, on_delete=models.CASCADE, null=True)

    def __str__(self):
        return self.major_name
    
# Instructor model
class Instructor(models.Model):
    profile = models.OneToOneField(Profile, on_delete=models.CASCADE, primary_key=True)  
    department = models.ForeignKey(Department, on_delete=models.CASCADE, null=True)
    hired_semester = models.CharField(max_length=20)

    def __str__(self):
        return f'Professor {self.profile.user.last_name}'

# Student model
class Student(models.Model):
    profile = models.OneToOneField(Profile, on_delete=models.CASCADE, primary_key=True)
    starting_semester = models.CharField(max_length=20)
    department = models.ForeignKey(Department, on_delete=models.CASCADE, null=True)
    gpa = models.DecimalField(max_digits=4, decimal_places=2, null=True)
    major = models.ForeignKey(Major, on_delete=models.CASCADE, null=True)
    
    def __str__(self):
        return f'{self.profile.user.first_name} {self.profile.user.last_name}'

    # Method to return active registrations (courses)
    @property
    def active_registration(self):
        return [
            {
                'title': course.title,
                'subject': course.subject,
                'course_number': course.course_number,
                'credits': course.credits,
            }
            for course in self.courses.all()  # Assuming courses is the related_name
        ]

# Staff model
class Staff(models.Model):
    profile = models.OneToOneField(Profile, on_delete=models.CASCADE, primary_key=True)
    starting_semester = models.CharField(max_length=20)
    
    def __str__(self):
        return f'{self.profile.user.first_name} {self.profile.user.last_name}'


# Advisor model
class Advisor(models.Model):
    profile = models.OneToOneField(Profile, on_delete=models.CASCADE, primary_key=True)
    starting_semester = models.CharField(max_length=20)
    department = models.ForeignKey(Department, on_delete=models.CASCADE,  null=True)

    def __str__(self):
        return f'{self.profile.user.first_name} {self.profile.user.last_name}'
    

# Course model
class Course(models.Model):
    uid = models.AutoField(primary_key=True)
    subject = models.CharField(max_length=5)
    course_number = models.IntegerField()
    title = models.CharField(max_length=50)
    credits = models.IntegerField()
    department = models.ForeignKey(Department, on_delete=models.CASCADE, null=True)
    instructor = models.ForeignKey(Instructor, on_delete=models.CASCADE, null=True)
    total_seats = models.IntegerField()
    available_seats = models.IntegerField()
    students = models.ManyToManyField('Student', related_name='courses') 

    def __str__(self):
        return f'{self.subject} {self.course_number} - {self.title}'
    


