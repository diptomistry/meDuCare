USE meducare;
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

-- Assign permissions to the student role
INSERT INTO RolePermissions (RoleID, PermissionID) VALUES (3, 8); -- student -> BookAppointment

-- Assign permissions to the teacher role
INSERT INTO RolePermissions (RoleID, PermissionID) VALUES (4, 7); -- teacher -> ViewDoctorList

-- Assign permissions to the staff role
-- No specific permissions assigned for the staff role

-- Assign permissions to the dispensary_officer role
INSERT INTO RolePermissions (RoleID, PermissionID) VALUES (6, 10); -- dispensary_officer -> DispenseMedicine
INSERT INTO RolePermissions (RoleID, PermissionID) VALUES (6, 11); -- dispensary_officer -> GenerateDailyReport

-- Assign permissions to the senior_officer role
INSERT INTO RolePermissions (RoleID, PermissionID) VALUES (7, 12); -- senior_officer -> AddNewMedicineStock
INSERT INTO RolePermissions (RoleID, PermissionID) VALUES (7, 13); -- senior_officer -> AllocateDailyMedicine

-- Assign permissions to the section_officer role
-- No specific permissions assigned for the section_officer role

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

INSERT INTO Users (Password, Email, DOB, Name, Sex, RoleID, Image ,Token ,Status,RegisteredFrom) VALUES (
    '$2a$10$B15mFmQkK5ZjzVq0ZFV6QOYi.b7508bBvu.bGgAzVnQdr7bxtrlki', 'admin@gmail.com', '1998-01-01', 'Admin','male', 1, 'https://localhost:8000/public/avatar.jpeg', '$2a$10$dTB5zKRMDDpilQizJINYF.iJhMBxVAWf6IzZxaY4gVBrDNa9lTFIm',
    'Approved','Web');


-- Insert an Admin

-- Insert a Doctor
INSERT INTO Users (Password, Email, DOB, Name, Sex, RoleID, Image, Token, Status, RegisteredFrom) 
VALUES ( '$2a$10$B15mFmQkK5ZjzVq0ZFV6QOYi.b7508bBvu.bGgAzVnQdr7bxtrlki', 'doc@gmail.com', '1985-05-05', 'Doctor User', 'female', 2, 'https://localhost:8000/public/doctor_avatar.jpeg', '$2a$10$ULQJaAFiCDVozHpmi2VZTOztqSY0IJqzGQx5USuP3v5e7J8ajKGES', 'Approved', 'Web');

INSERT INTO Doctors (UserID, DepartmentID) VALUES (2, 1); -- Doctor User is assigned to the Pathology department

INSERT INTO Users (Password, Email, DOB, Name, Sex, RoleID, Image, Token, Status, RegisteredFrom) 
VALUES ( '$2a$10$B15mFmQkK5ZjzVq0ZFV6QOYi.b7508bBvu.bGgAzVnQdr7bxtrlki', 'sec@gmail.com', '1985-05-05', 'Section Officer Kuddus', 'female', 8, 'https://localhost:8000/public/avatar.jpeg','$2a$10$TtFMyWC4/zqVgx8Bzoncvu6ta44rSO5msEFlKbcnKSjZIcnCWnzZm', 'Approved', 'Web');


INSERT INTO Users (Password, Email, DOB, Name, Sex, RoleID, Image, Token, Status, RegisteredFrom) 
VALUES ( '$2a$10$B15mFmQkK5ZjzVq0ZFV6QOYi.b7508bBvu.bGgAzVnQdr7bxtrlki', 'senior@gmail.com', '1985-05-05', 'Senior Officer Kuddus', 'male', 7, 'https://localhost:8000/public/avatar.jpeg','$2a$10$R9eSbeMMtHnPn9xLj6CThOzN8LY0WblOTZo4cy3q3gH2LWUJP3gy2', 'Approved', 'Web');


INSERT INTO Users (Password, Email, DOB, Name, Sex, RoleID, Image, Token, Status, RegisteredFrom) 
VALUES ( '$2a$10$B15mFmQkK5ZjzVq0ZFV6QOYi.b7508bBvu.bGgAzVnQdr7bxtrlki', 'pharma@gmail.com', '1985-05-05', 'Dispendary OFficer Rafiq', 'male', 6, 'https://localhost:8000/public/avatar.jpeg','$2a$10$6FD7UAi3NNUB6BAurorr2OPCXOBSP2frEP0e/lQW/xCtxy/TZfOGG', 'Approved', 'Web');