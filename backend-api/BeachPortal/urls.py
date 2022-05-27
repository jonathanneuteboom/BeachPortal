from BeachPortalApi import urls
from django.contrib import admin
from django.urls import path, include
from django.contrib.auth import views as auth_views


urlpatterns = [
    path('password-reset/',
         auth_views.PasswordResetView.as_view(
             template_name="reset-password/password_reset_form.html",
             email_template_name="reset-password/password_reset_email.html",
             subject_template_name="reset-password/password_reset_subject.txt"
         ),
         name="password_reset"),
    path('password-reset/done/',
         auth_views.PasswordResetDoneView.as_view(
             template_name="reset-password/password_reset_done.html"),
         name="password_reset_done"),
    path('reset/<uidb64>/<token>/',
         auth_views.PasswordResetConfirmView.as_view(
             template_name="reset-password/password_reset_confirm.html"),
         name="password_reset_confirm"),
    path('reset/done/',
         auth_views.PasswordResetCompleteView.as_view(
             template_name="reset-password/password_reset_complete.html"),
         name="password_reset_complete"),

    path('admin/', admin.site.urls),
    path('api/', include(urls))
]
