CREATE DATABASE roombooking;

USE roombooking;

CREATE TABLE rooms (
  id INT PRIMARY KEY,
  type ENUM('private', 'conference', 'shared')
);

CREATE TABLE users (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(100),
  age INT,
  teamId INT
);

CREATE TABLE teams (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(100)
);

CREATE TABLE bookings (
  id INT PRIMARY KEY AUTO_INCREMENT,
  roomId INT,
  slot VARCHAR(20),
  userId INT,
  teamId INT,
  type VARCHAR(20),
  FOREIGN KEY (roomId) REFERENCES rooms(id)
);
