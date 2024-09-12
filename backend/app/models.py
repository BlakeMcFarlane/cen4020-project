# this file defines the tables in our database.
# https://docs.djangoproject.com/en/5.1/topics/db/models/


from django.db import models

# department class table
class Department(models.Model):
    departmentID = models.AutoField(primary_key=True)
    departmentName = models.CharField(max_length=100)

    def __str__(self):
        return self.departmentName
    
# instructor class table
class Instructor(models.Model):
    instructorID = models.AutoField(primary_key=True)
    firstName = models.CharField(max_length=100)
    lastName = models.CharField(max_length=100)
    instructorPhone = models.CharField(max_length=10)
    departmentID = models.ForeignKey(Department, on_delete=models.CASCADE)
    hiredSemster = models.CharField(max_length=20)

    def __str__(self):
        return f'Professor {self.lastName}'
    

