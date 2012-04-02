/*create database*/
CREATE DATABASE storyboard CHARACTER SET utf8 COLLATE utf8_unicode_ci;

/*export local database schema*/
mysqldump -u root -p --database storyboard >storyboard.sql
