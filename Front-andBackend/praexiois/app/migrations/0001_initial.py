# Generated by Django 4.2 on 2023-06-26 12:55

from django.conf import settings
import django.contrib.auth.models
import django.contrib.auth.validators
from django.db import migrations, models
import django.db.models.deletion
import django.utils.timezone


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('auth', '0012_alter_user_first_name_max_length'),
    ]

    operations = [
        migrations.CreateModel(
            name='AxtasyUser',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('password', models.CharField(max_length=128, verbose_name='password')),
                ('last_login', models.DateTimeField(blank=True, null=True, verbose_name='last login')),
                ('is_superuser', models.BooleanField(default=False, help_text='Designates that this user has all permissions without explicitly assigning them.', verbose_name='superuser status')),
                ('username', models.CharField(error_messages={'unique': 'A user with that username already exists.'}, help_text='Required. 150 characters or fewer. Letters, digits and @/./+/-/_ only.', max_length=150, unique=True, validators=[django.contrib.auth.validators.UnicodeUsernameValidator()], verbose_name='username')),
                ('first_name', models.CharField(blank=True, max_length=150, verbose_name='first name')),
                ('last_name', models.CharField(blank=True, max_length=150, verbose_name='last name')),
                ('email', models.EmailField(blank=True, max_length=254, verbose_name='email address')),
                ('is_staff', models.BooleanField(default=False, help_text='Designates whether the user can log into this admin site.', verbose_name='staff status')),
                ('is_active', models.BooleanField(default=True, help_text='Designates whether this user should be treated as active. Unselect this instead of deleting accounts.', verbose_name='active')),
                ('date_joined', models.DateTimeField(default=django.utils.timezone.now, verbose_name='date joined')),
                ('permission_level', models.IntegerField(verbose_name=range(1, 3))),
                ('groups', models.ManyToManyField(related_name='custom_user_set', to='auth.group')),
                ('user_permissions', models.ManyToManyField(related_name='custom_user_set', to='auth.permission')),
            ],
            options={
                'verbose_name': 'user',
                'verbose_name_plural': 'users',
                'abstract': False,
            },
            managers=[
                ('objects', django.contrib.auth.models.UserManager()),
            ],
        ),
        migrations.CreateModel(
            name='Job',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('jobname', models.CharField(max_length=50)),
                ('imagetype', models.CharField(max_length=50, null=True)),
                ('remark', models.CharField(default='', max_length=50)),
                ('createdate', models.CharField(max_length=20)),
                ('webtopurl', models.IntegerField(null=True)),
                ('jobid', models.CharField(max_length=50, null=True, unique=True)),
                ('mem_num', models.IntegerField(null=True)),
                ('cpu_core', models.IntegerField(null=True)),
                ('gpu_num', models.IntegerField(null=True)),
                ('status', models.CharField(max_length=20)),
                ('user', models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='SleepJob',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('jobname', models.CharField(max_length=50)),
                ('imagetype', models.CharField(max_length=50, null=True)),
                ('remark', models.CharField(default='', max_length=50)),
                ('sleepdate', models.CharField(max_length=20)),
                ('jobid', models.CharField(max_length=50, null=True, unique=True)),
                ('mem_num', models.IntegerField(null=True)),
                ('cpu_core', models.IntegerField(null=True)),
                ('gpu_num', models.IntegerField(null=True)),
                ('user', models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='Schedule',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('expectopentime', models.CharField(max_length=20)),
                ('expectclosetime', models.CharField(max_length=20)),
                ('slurmjobs', models.TextField()),
                ('scheduleid', models.CharField(max_length=50, null=True, unique=True)),
                ('job', models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to='app.job')),
            ],
        ),
        migrations.CreateModel(
            name='Detail',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=20, unique=True)),
                ('permission_level', models.IntegerField(verbose_name=range(1, 3))),
                ('user', models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
    ]
