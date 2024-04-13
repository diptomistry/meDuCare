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

INSERT INTO Roles (RoleName) VALUES
('admin');
INSERT INTO Roles (RoleName) VALUES
('doctor');
INSERT INTO Roles (RoleName) VALUES
('student');
INSERT INTO Roles (RoleName) VALUES
('teacher_staff');
INSERT INTO Roles (RoleName) VALUES
('dispensary_officer');
INSERT INTO Roles (RoleName) VALUES
('senior_officer');

INSERT INTO Permissions (Permission) VALUES ('ManageUsers');
INSERT INTO Permissions (Permission) VALUES ('ManageDoctors');
INSERT INTO Permissions (Permission) VALUES ('ManageMedicine');
INSERT INTO Permissions (Permission) VALUES ('GenerateReports');
INSERT INTO Permissions (Permission) VALUES ('PrescribeMedicine');
INSERT INTO Permissions (Permission) VALUES ('ViewMedicineList');
INSERT INTO Permissions (Permission) VALUES ('ViewDoctorList');
INSERT INTO Permissions (Permission) VALUES ('BookAppointment');
INSERT INTO Permissions (Permission) VALUES ('ViewPrescription');
INSERT INTO Permissions (Permission) VALUES ('DispenseMedicine');
INSERT INTO Permissions (Permission) VALUES ('GenerateDailyReport');
INSERT INTO Permissions (Permission) VALUES ('AddNewMedicineStock');
INSERT INTO Permissions (Permission) VALUES ('AllocateDailyMedicine');

-- Assign permissions to the admin role
INSERT INTO RolePermissions (RoleID, PermissionID) VALUES (1, 1); -- admin -> ManageUsers
INSERT INTO RolePermissions (RoleID, PermissionID) VALUES (1, 2); -- admin -> ManageDoctors
INSERT INTO RolePermissions (RoleID, PermissionID) VALUES (1, 3); -- admin -> ManageMedicine
INSERT INTO RolePermissions (RoleID, PermissionID) VALUES (1, 4); -- admin -> GenerateReports

-- Assign permissions to the doctor role
INSERT INTO RolePermissions (RoleID, PermissionID) VALUES (2, 5); -- doctor -> PrescribeMedicine
INSERT INTO RolePermissions (RoleID, PermissionID) VALUES (2, 6); -- doctor -> ViewMedicineList
INSERT INTO RolePermissions (RoleID, PermissionID) VALUES (2, 9); -- doctor -> ViewPrescription

-- -- Assign permissions to the user role
-- INSERT INTO RolePermissions (RoleID, PermissionID) VALUES (3, 7); -- user -> ViewDoctorList
-- INSERT INTO RolePermissions (RoleID, PermissionID) VALUES (3, 8); -- user -> BookAppointment

-- Assign permissions to the dispensary_officer role
INSERT INTO RolePermissions (RoleID, PermissionID) VALUES (5, 10); -- dispensary_officer -> DispenseMedicine
INSERT INTO RolePermissions (RoleID, PermissionID) VALUES (5, 11); -- dispensary_officer -> GenerateDailyReport

-- Assign permissions to the senior_officer role
INSERT INTO RolePermissions (RoleID, PermissionID) VALUES (6, 12); -- senior_officer -> AddNewMedicineStock
INSERT INTO RolePermissions (RoleID, PermissionID) VALUES (6, 13); -- senior_officer -> AllocateDailyMedicine


CREATE TABLE Users (
    UserID INT AUTO_INCREMENT PRIMARY KEY,
    Username VARCHAR(50) UNIQUE NOT NULL,
    Password VARCHAR(100) NOT NULL,
    Email VARCHAR(100) UNIQUE NOT NULL,
    DOB DATE,
    Name VARCHAR(100) NOT NULL,
    Sex VARCHAR(10),
    Image VARCHAR(200),
    RoleID INT,
    FOREIGN KEY (RoleID) REFERENCES Roles(RoleID)
);
CREATE TABLE Student (
    RegistrationNo INT  PRIMARY KEY,
    UserID INT UNIQUE,
    Department VARCHAR(100) NOT NULL,
    Session VARCHAR(100) NOT NULL,
    FOREIGN KEY (UserID) REFERENCES Users(UserID)
);



CREATE TABLE Doctors (
    DoctorID INT AUTO_INCREMENT PRIMARY KEY,
    UserID INT UNIQUE,
    Specialization VARCHAR(100) NOT NULL,
    FOREIGN KEY (UserID) REFERENCES Users(UserID)
);
CREATE TABLE Appointments (
    AppointmentID INT AUTO_INCREMENT PRIMARY KEY,
    UserID INT,
    DoctorID INT,
    AppointmentDateTime DATETIME,
    FOREIGN KEY (UserID) REFERENCES Users(UserID),
    FOREIGN KEY (DoctorID) REFERENCES Doctors(DoctorID)
);
CREATE TABLE Prescriptions (
    PrescriptionID INT AUTO_INCREMENT PRIMARY KEY,
    AppointmentID INT,
    PrescriptionDetails TEXT,
    FOREIGN KEY (AppointmentID) REFERENCES Appointments(AppointmentID)
);
CREATE TABLE Medicines (
    MedicineID INT AUTO_INCREMENT PRIMARY KEY,
    Name VARCHAR(100) NOT NULL,
    Description TEXT,
    StockQuantity INT NOT NULL
);
CREATE TABLE Dispensation (
    DispensationID INT AUTO_INCREMENT PRIMARY KEY,
    AppointmentID INT,
    MedicineID INT,
    DispensedQuantity INT NOT NULL,
    DispensedDateTime DATETIME,
    FOREIGN KEY (AppointmentID) REFERENCES Appointments(AppointmentID),
    FOREIGN KEY (MedicineID) REFERENCES Medicines(MedicineID)
);


