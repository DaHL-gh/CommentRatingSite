from django.db import models


class React(models.Model):
    first_field = models.CharField(max_length=200)
    second_field = models.CharField(max_length=200)

