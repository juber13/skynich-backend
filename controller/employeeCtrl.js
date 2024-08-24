import { Employee } from "../models/employeeModel.js";
import cloudinary from "cloudinary";
import fs from "fs/promises"; // Use promises for fs

cloudinary.config({
  cloud_name: "your_cloud_name",
  api_key: "your_api_key",
  api_secret: "your_api_secret",
});

export const addEmployee = async (req, res) => {
  try {
    console.log(req.body);
    const { name, lastName, joining, department, designation, salary} = req.body;
    const { path } = req.file;
    // Validate required fields
    console.log(path)
    if (
      [name, lastName, joining, department, designation, salary].some(
        (field) => !field
      )
    ) {
      return res.status(400).json({
        message: "All fields are required",
        success: false,
      });
    }

    const result = await cloudinary.v2.uploader.upload(path);
    console.log("Upload Success:", result);

    const newEmployee = await Employee.create({
      name,
      lastName,
      joining,
      department,
      designation,
      salary,
      imageUrl: result.secure_url, // Store the image URL if needed
    });

    // Delete the local file after upload
    // await fs.unlink(image);
    // console.log("File deleted successfully");

    console.log(newEmployee)

    return res.status(201).json({
      message: "Employee added",
      success: true,
      newEmployee,
    });

  } catch (error) {
    console.error("Error:", error);
    return res.status(500).json({
      message: "Internal server error",
      success: false,
    });
  }
};

export const showEmployeeDetails = async (req, res) => {
  try {
    const { id } = req.params; // Get the employee ID from the request parameters
    console.log(id);
    // Find the employee by ID
    const employee = await Employee.findById(id);

    // Check if employee exists
    if (!employee) {
      return res.status(404).json({
        message: "Employee not found",
        success: false,
      });
    }

    console.log(employee)

    // Return the employee details
    return res.status(200).json({
      message: "Employee details retrieved successfully",
      success: true,
      employee,
    });
  } catch (error) {
    console.error('Error fetching employee details:', error);
    return res.status(500).json({
      message: "Internal server error",
      success: false,
    });
  }
};

export const employeeList = async (req, res) => {
  try {
    const employees = await Employee.find({});
    return res.status(200).json({
      message: "Employee list retrieved",
      success: true,
      employees,
    });
  } catch (error) {
    console.error("Error fetching employees:", error);
    return res.status(500).json({
      message: "Internal server error",
      success: false,
    });
  }
};


export const deleteEmployee = async (req, res) => {
  try {
    const { id } = req.params;
    console.log(id)
    const employee = await Employee.findById(id);

    if (!employee) {
      return res
        .status(404)
        .json({ message: "Employee not found", success: false });
    }

    // await employee.delete();
        await Employee.findByIdAndDelete(id);


    return res
      .status(200)
      .json({ message: "Employee deleted successfully", success: true });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server error", success: false });
  }
};
