  import Employee from "../models/employee.model.js";
  import bcryptjs from "bcryptjs";
  import { errorHandler } from "../utills/error.js";
  import jwt from "jsonwebtoken";


  export const create = async (req, res, next) => {
    // First, log the incoming request body for debugging
    console.log('Incoming request body:', req.body);

    const { firstname, lastname, address, email, nic, phone, role, shift } = req.body;

    // Trim all string inputs to remove whitespace
    const trimmedFirstName = firstname?.trim();
    const trimmedLastName = lastname?.trim();
    const trimmedAddress = address?.trim();
    const trimmedEmail = email?.trim();
    const trimmedNic = nic?.trim();
    const trimmedPhone = phone?.trim();
    const trimmedRole = role?.trim();
    const trimmedShift = shift?.trim();

    // Validation patterns
    const nicRegex = /^(?:[0-9]{9}[VvXx]|[0-9]{12})$/; // Fixed regex (removed duplicate |)
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^[0-9]{10}$/;

    // Check required fields
    if (
      !trimmedFirstName ||
      !trimmedLastName ||
      !trimmedAddress ||
      !trimmedEmail ||
      !trimmedNic ||
      !trimmedPhone ||
      !trimmedRole
    ) {
      return next(errorHandler(400, "All required fields must be provided"));
    }

    // Check NIC validity
    if (!nicRegex.test(trimmedNic)) {
      return next(errorHandler(400, "NIC is invalid. Format: 123456789V or 123456789012"));
    }

    // Check email validity
    if (!emailRegex.test(trimmedEmail)) {
      return next(errorHandler(400, "Email is invalid"));
    }

    // Check phone number validity
    if (!phoneRegex.test(trimmedPhone)) {
      return next(errorHandler(400, "Phone number must be 10 digits"));
    }

    // Check if data already exists in the database
    try {
      const existingEmployeeByEmail = await Employee.findOne({ email: trimmedEmail });
      const existingEmployeeByPhone = await Employee.findOne({ phone: trimmedPhone });
      const existingEmployeeByNIC = await Employee.findOne({ nic: trimmedNic });

      if (existingEmployeeByEmail) {
        return next(errorHandler(400, "Employee with this email already exists"));
      }
      if (existingEmployeeByPhone) {
        return next(errorHandler(400, "Employee with this phone number already exists"));
      }
      if (existingEmployeeByNIC) {
        return next(errorHandler(400, "Employee with this NIC already exists"));
      }

      // Create new employee
      const hashedPassword = bcryptjs.hashSync(trimmedNic, 10);
      const fullName = trimmedFirstName + trimmedLastName;
      const nameToUsername = fullName.split(" ").join("") + Math.random().toString(9).slice(-4);
      
      const newEmployee = new Employee({
        firstname: trimmedFirstName,
        lastname: trimmedLastName,
        address: trimmedAddress,
        email: trimmedEmail,
        nic: trimmedNic,
        phone: trimmedPhone,
        username: nameToUsername,
        password: hashedPassword,
        role: trimmedRole,
        shift: trimmedShift,
      });

      await newEmployee.save();
      res.status(201).json({ success: true, message: "Employee created successfully" });
      
    } catch (error) {
      console.error('Error creating employee:', error);
      next(errorHandler(500, "Internal server error while creating employee"));
    }
  };

  export const login = async (req, res, next) => {
    const { email, password } = req.body;

    if (!email || !password || email === "" || password === "") {
      next(errorHandler(400, "All fields are required"));
    }

    try {
      const validEmployee = await Employee.findOne({ email });
      if (!validEmployee) {
        next(errorHandler(404, "User not found"));
        
      }
      const validPassword = bcryptjs.compareSync(
        password,
        validEmployee.password
      );
      if (!validPassword) {
        return next(errorHandler(400, `Invalid credentials\nPassword: ${password}\n validEmployeePassword: ${validEmployee.password}`));
      }
      const token = jwt.sign(
        {
          empId: validEmployee._id,
          isAdmin: validEmployee.isAdmin,
          role: validEmployee.role,
          username: validEmployee.username,
          name: validEmployee.firstname + " " + validEmployee.lastname,
        },
        "ivadhfvuiadhfviahuivyfvIEYR8AYB"
      );
      
      const { password: pass, ...rest} = validEmployee._doc;

      res
        .status(200)
        .cookie("access_token", token, {
          httpOnly: true,
        })
        .json(rest);
    } catch (error) {
      
      next(error);
    }
  };
