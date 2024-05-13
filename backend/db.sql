CREATE DATABASE IF NOT EXISTS meducare;
USE meducare;

CREATE TABLE Roles (
    RoleID INT AUTO_INCREMENT PRIMARY KEY,
    RoleName VARCHAR(50) UNIQUE NOT NULL
);

CREATE TABLE Permissions (
    PermissionID INT AUTO_INCREMENT PRIMARY KEY,
    Permission VARCHAR(100) NOT NULL
);

CREATE TABLE RolePermissions (
    RolePermissionID INT AUTO_INCREMENT PRIMARY KEY,
    RoleID INT,
    PermissionID INT,
    FOREIGN KEY (RoleID) REFERENCES Roles(RoleID),
    FOREIGN KEY (PermissionID) REFERENCES Permissions(PermissionID)
);

CREATE TABLE Users (
    UserID INT AUTO_INCREMENT PRIMARY KEY,
    Password VARCHAR(100) NOT NULL,
    Email VARCHAR(100) UNIQUE NOT NULL,
    DOB DATE,
    Name VARCHAR(100) NOT NULL,
    Sex VARCHAR(10),
    Phone VARCHAR(20),
    Image VARCHAR(200),
    RoleID INT,
    Status VARCHAR(20) DEFAULT 'Pending',
    Token VARCHAR(100),
    otp VARCHAR(100),
    RegisteredFrom VARCHAR(100),
    FOREIGN KEY (RoleID) REFERENCES Roles(RoleID)
);

CREATE TABLE Department (
    DepartmentID INT AUTO_INCREMENT PRIMARY KEY,
    Name VARCHAR(100) NOT NULL,
    Description TEXT,
    Image VARCHAR(200)
);

CREATE TABLE Student (
    RegistrationNo VARCHAR(200) PRIMARY KEY,
    UserID INT UNIQUE,
    Department VARCHAR(100) NOT NULL,
    Session VARCHAR(100) NOT NULL,
    FOREIGN KEY (UserID) REFERENCES Users(UserID)
);

CREATE TABLE Doctors (
    DoctorID INT AUTO_INCREMENT PRIMARY KEY,
    UserID INT UNIQUE,
    DepartmentID INT,
    FOREIGN KEY (UserID) REFERENCES Users(UserID),
    FOREIGN KEY (DepartmentID) REFERENCES Department(DepartmentID)
);

CREATE TABLE Appointments (
    AppointmentID INT AUTO_INCREMENT PRIMARY KEY,
    UserID INT,
    AppointmentDateTime DATETIME,
    Concern TEXT,
    Status VARCHAR(20) DEFAULT 'Pending',
    FOREIGN KEY (UserID) REFERENCES Users(UserID)
);

CREATE TABLE appoinment_doctors (
    PrescriptionID INT AUTO_INCREMENT PRIMARY KEY,
    AppointmentID INT,
    DoctorID INT,
    Intructions TEXT,
    Tests VARCHAR(200),
    FOREIGN KEY (AppointmentID) REFERENCES Appointments(AppointmentID),
    FOREIGN KEY (DoctorID) REFERENCES Doctors(DoctorID),
    UNIQUE KEY (AppointmentID, DoctorID)
);

CREATE TABLE Prescriptions (
    PrescriptionID INT,
    MedicinePrescriptionID INT
);
CREATE TABLE MedicinePresription(
    MedicinePrescriptionID INT AUTO_INCREMENT PRIMARY KEY,
    MedicineID INT,
    Quantity VARCHAR(100),
    Duration VARCHAR(100),
    AfterBefore VARCHAR(20),
    FOREIGN KEY (MedicineID) REFERENCES Medicines(MedicineID)
);

CREATE TABLE Medicines (
    MedicineID INT AUTO_INCREMENT PRIMARY KEY,
    Name VARCHAR(100) NOT NULL,
    EntryDate DATE,
    ExpiryDate DATE,
    Description TEXT,
    Price DECIMAL(10, 2),
    AddedBy INT,
    FOREIGN KEY (AddedBy) REFERENCES Users(UserID),
    StockQuantity INT NOT NULL
);


CREATE TABLE PharmacyStock (
    StockID INT AUTO_INCREMENT PRIMARY KEY,
    MedicineID INT,
    Quantity INT NOT NULL,
    StockDate DATE,
    Status VARCHAR(20) DEFAULT 'Pending',
    FOREIGN KEY (MedicineID) REFERENCES Medicines(MedicineID)
);

CREATE TABLE Dispensation (
    DispensationID INT AUTO_INCREMENT PRIMARY KEY,
    AppointmentID INT,
    DispensedQuantity INT NOT NULL,
    DispensedDateTime DATETIME,
    StockID INT,
    FOREIGN KEY (AppointmentID) REFERENCES Appointments(AppointmentID),
    FOREIGN KEY (StockID) REFERENCES PharmacyStock(StockID)
);

CREATE TABLE Services (
    ServiceID INT AUTO_INCREMENT PRIMARY KEY,
    Name VARCHAR(100) NOT NULL,
    Description TEXT,
    Image VARCHAR(200),
    Date DATE
);

CREATE TABLE Notices (
    NoticeID INT AUTO_INCREMENT PRIMARY KEY,
    Title VARCHAR(100) NOT NULL,
    Description TEXT,
    Image VARCHAR(200),
    MainPage BOOLEAN,
    isAdmin BOOLEAN,
    Date DATE,
    Link VARCHAR(200)
);

CREATE TABLE DutyRoster (
    DutyID INT AUTO_INCREMENT PRIMARY KEY,
    DoctorID INT,
    FOREIGN KEY (DoctorID) REFERENCES Doctors(DoctorID)
);

CREATE TABLE Slot (
    SlotID INT AUTO_INCREMENT PRIMARY KEY,
    StartTime TIME,
    EndTime TIME
);

CREATE TABLE SlotDay (
    SlotID INT,
    Day VARCHAR(20),
    FOREIGN KEY (SlotID) REFERENCES Slot(SlotID)
);

CREATE TABLE DoctorSlot (
    DutyID INT,
    SlotID INT,
    FOREIGN KEY (DutyID) REFERENCES DutyRoster(DutyID),
    FOREIGN KEY (SlotID) REFERENCES Slot(SlotID)
);

CREATE TABLE PhotoGallery (
    PhotoID INT AUTO_INCREMENT PRIMARY KEY,
    Image VARCHAR(200),
    Date DATE,
    Title VARCHAR(100)
);


