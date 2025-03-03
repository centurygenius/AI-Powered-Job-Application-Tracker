# Generated by Django 5.1.6 on 2025-03-03 09:28

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('tracker', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='jobapplication',
            name='applied_date',
            field=models.DateField(blank=True, null=True),
        ),
        migrations.AlterField(
            model_name='jobapplication',
            name='status',
            field=models.CharField(choices=[('applied', 'Applied'), ('interview_scheduled', 'Interview Scheduled'), ('offer_received', 'Offer Received'), ('rejected', 'Rejected')], default='applied', max_length=50),
        ),
    ]
