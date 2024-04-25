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
('teacher');
INSERT INTO Roles (RoleName) VALUES
('staff');
INSERT INTO Roles (RoleName) VALUES
('dispensary_officer');
INSERT INTO Roles (RoleName) VALUES
('senior_officer');
INSERT INTO Roles (RoleName) VALUES
('section_officer');

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
CREATE TABLE Department (
    DepartmentID INT AUTO_INCREMENT PRIMARY KEY,
    Name VARCHAR(100) NOT NULL,
    Description TEXT,
    Image VARCHAR(200)
);
INSERT INTO Department (Name, Description, Image) 
VALUES ('Pathology', 'Department specializing in the study of diseases through examination of tissues, organs, and bodily fluids.',
 'pathology_image.jpg');

INSERT INTO Department (Name, Description, Image) 
VALUES ('X-ray', 'Department responsible for conducting diagnostic imaging tests using X-rays to visualize the internal structures of the body.', 
'xray_image.jpg');

INSERT INTO Department (Name, Description, Image) 
VALUES ('Dental', 'Department focused on oral health, providing services such as dental check-ups, cleanings, and treatments for dental issues.',
 'dental_image.jpg');

INSERT INTO Department (Name, Description, Image) 
VALUES ('Ophthalmology', 'Department specializing in the diagnosis and treatment of eye diseases and disorders, including vision correction procedures.', 
'ophthalmology_image.jpg');

INSERT INTO Department (Name, Description, Image) 
VALUES ('Physiotherapy', 'Department offering rehabilitative services to help patients recover from injuries or surgeries through exercises, stretches, and manual therapy techniques.',
 'physiotherapy_image.jpg');

INSERT INTO Department (Name, Description, Image) 
VALUES ('Ultrasonogram', 'Department providing diagnostic imaging using ultrasound waves to visualize internal organs and tissues.',
 'ultrasonogram_image.jpg');

INSERT INTO Department (Name, Description, Image) 
VALUES ('Pharmacy', 'Department responsible for dispensing medications and providing pharmaceutical services to patients and healthcare professionals.', 
'pharmacy_image.jpg');

INSERT INTO Department (Name, Description, Image) 
VALUES ('Nursing', 'Department comprising skilled nurses who provide patient care, assist with medical procedures, and educate patients and families about health management.',
 'nursing_image.jpg');

INSERT INTO Department (Name, Description, Image) 
VALUES ('ICU', 'Intensive Care Unit department specializing in providing critical care to patients with life-threatening illnesses or injuries.', 'icu_image.jpg');


CREATE TABLE Doctors (
    DoctorID INT AUTO_INCREMENT PRIMARY KEY,
    UserID INT UNIQUE,
    DepartmentID INT,
    FOREIGN KEY (DepartmentID) REFERENCES Department(DepartmentID)
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
CREATE TABLE Services (
    ServiceID INT AUTO_INCREMENT PRIMARY KEY,
    Name VARCHAR(100) NOT NULL,
    Description TEXT,
    Image VARCHAR(200)
);


