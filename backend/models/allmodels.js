// meducare.js

class Role {
    constructor(roleId, roleName) {
      this.roleId = roleId;
      this.roleName = roleName;
    }
  }
  
  class Permission {
    constructor(permissionId, permission) {
      this.permissionId = permissionId;
      this.permission = permission;
    }
  }
  
  class RolePermission {
    constructor(rolePermissionId, roleId, permissionId) {
      this.rolePermissionId = rolePermissionId;
      this.roleId = roleId;
      this.permissionId = permissionId;
    }
  }
  
  class User {
    constructor(
      userId,
      password,
      email,
      dob,
      name,
      sex,
      image,
      roleId,
      status,
      token,
      otp
    ) {
      this.userId = userId;
      this.password = password;
      this.email = email;
      this.dob = dob;
      this.name = name;
      this.sex = sex;
      this.image = image;
      this.roleId = roleId;
      this.status = status;
      this.token = token;
      this.otp = otp;
    }
  }
  
  class Department {
    constructor(departmentId, name, description, image) {
      this.departmentId = departmentId;
      this.name = name;
      this.description = description;
      this.image = image;
    }
  }
  
  class Person { // Base class for Student and Doctor (inheritance)
    constructor(userId, registrationNo) {
      this.userId = userId;
      this.registrationNo = registrationNo;
    }
  }
  
  class Student extends Person {
    constructor(userId, registrationNo, department, session) {
      super(userId, registrationNo);
      this.department = department;
      this.session = session;
    }
  }
  
  class Doctor extends Person {
    constructor(userId, registrationNo, departmentId) {
      super(userId, registrationNo);
      this.departmentId = departmentId;
    }
  }
  
  class Appointment {
    constructor(appointmentId, userId, appointmentDateTime, concern) {
      this.appointmentId = appointmentId;
      this.userId = userId;
      this.appointmentDateTime = appointmentDateTime;
      this.concern = concern;
    }
  }
  
  class AppointmentDoctor {
    constructor(appointmentId, doctorId) {
      this.appointmentId = appointmentId;
      this.doctorId = doctorId;
    }
  }
  
  class Prescription {
    constructor(prescriptionId, appointmentId, medication, dosage, instructions, tests) {
      this.prescriptionId = prescriptionId;
      this.appointmentId = appointmentId;
      this.medication = medication;
      this.dosage = dosage;
      this.instructions = instructions;
      this.tests = tests;
    }
  }
  
  class Medicine {
    constructor(medicineId, name, entryDate, expiryDate, description, stockQuantity) {
      this.medicineId = medicineId;
      this.name = name;
      this.entryDate = entryDate;
      this.expiryDate = expiryDate;
      this.description = description;
      this.stockQuantity = stockQuantity;
    }
  }
  
  class PharmacyStock {
    constructor(stockId, medicineId, quantity, stockDate, status) {
      this.stockId = stockId;
      this.medicineId = medicineId;
      this.quantity = quantity;
      this.stockDate = stockDate;
      this.status = status;
    }
  }
  
  class Dispensation {
    constructor(dispensationId, appointmentId, dispensedQuantity, dispensedDateTime, stockId) {
      this.dispensationId = dispensationId;
      this.appointmentId = appointmentId;
      this.dispensedQuantity = dispensedQuantity;
      this.dispensedDateTime = dispensedDateTime;
      this.stockId = stockId;
    }
  }
  
  class Service {
    constructor(serviceId, name, description, image, date) {
      this.serviceId = serviceId;
      this.name = name;
      this.description = description;
      this.image = image;
      this.date = date;
    }
  }
  
  class Notice {
    constructor(noticeId, title, description, image = null, date) {
      this.noticeId = noticeId;
      this.title = title;
      this.description = description;
      this.image = image;
      this.date = date;
    }
    }

  export {
    Role,
    Permission,
    RolePermission,
    User,
    Department,
    Person,
    Student,
    Doctor,
    Appointment,
    AppointmentDoctor,
    Prescription,
    Medicine,
    PharmacyStock,
    Dispensation,
    Service,
    Notice}