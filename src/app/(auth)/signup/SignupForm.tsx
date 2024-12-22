"use client";
import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  User,
  Mail,
  Lock,
  Phone,
  Calendar,
  FileText,
  Award,
  Stethoscope,
  Hospital,
} from "lucide-react";

// Define Zod schema for validation
const signupSchema = z
  .object({
    firstName: z.string().min(2, "First name must be at least 2 characters"),
    lastName: z.string().min(2, "Last name must be at least 2 characters"),
    email: z.string().email("Invalid email address"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z
      .string()
      .min(6, "Password must be at least 6 characters"),
    phone: z.string().regex(/^\d{10}$/, "Invalid phone number"),
    dateOfBirth: z.string().nonempty("Date of birth is required"),
    // Patient-specific fields
    emergencyContact: z
      .string()
      .regex(/^\d{10}$/, "Invalid phone number")
      .optional(),
    bloodGroup: z.string().optional(),
    // Doctor/Staff-specific fields
    specialization: z.string().optional(),
    experience: z
      .number()
      .int()
      .min(0, "Experience must be a positive number")
      .optional(),
    license: z.string().optional(),
    // Admin-specific fields
    adminCode: z.string().optional(),
    department: z.string().optional(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

type SignupFormData = z.infer<typeof signupSchema>;

const SignupForm = () => {
  const [userType, setUserType] = useState("patient");
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupFormData>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
      phone: "",
      dateOfBirth: "",
      emergencyContact: "",
      bloodGroup: "",
      specialization: "",
      experience: undefined,
      license: "",
      adminCode: "",
      department: "",
    },
  });

  const onSubmit = (data: SignupFormData) => {
    console.log("Form submitted:", data);
  };

  const renderPatientFields = () => (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row gap-4">
        {/* Blood Group Field */}
        <div className="flex-1">
          <label className="block text-sm font-medium text-gray-700">
            Blood Group
          </label>
          <div className="mt-1 relative rounded-md shadow-sm">
            <Controller
              name="bloodGroup"
              control={control}
              render={({ field }) => (
                <select
                  {...field}
                  className="block w-full pl-3 pr-10 py-2 rounded-md border border-gray-300 focus:border-blue-500 focus:ring-blue-500 appearance-none">
                  <option value="">Select Blood Group</option>
                  <option value="A+">A+</option>
                  <option value="A-">A-</option>
                  <option value="B+">B+</option>
                  <option value="B-">B-</option>
                  <option value="AB+">AB+</option>
                  <option value="AB-">AB-</option>
                  <option value="O+">O+</option>
                  <option value="O-">O-</option>
                </select>
              )}
            />
          </div>
        </div>
        {/* Emergency Contact Field */}
        <div className="flex-1">
          <label className="block text-sm font-medium text-gray-700">
            Emergency Contact
          </label>
          <div className="mt-1 relative rounded-md shadow-sm">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Phone className="h-5 w-5 text-gray-400" />
            </div>
            <Controller
              name="emergencyContact"
              control={control}
              render={({ field }) => (
                <input
                  {...field}
                  type="tel"
                  className="block w-full pl-10 pr-3 py-2 rounded-md border border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                  placeholder="Emergency Contact Number"
                />
              )}
            />
            {errors.emergencyContact && (
              <p className="text-red-500 text-sm mt-1">
                {errors.emergencyContact.message}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );

  const renderDoctorFields = () => (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row gap-4">
        {/* Specialization Field */}
        <div className="flex-1">
          <label className="block text-sm font-medium text-gray-700">
            Specialization
          </label>
          <div className="mt-1 relative rounded-md shadow-sm">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Stethoscope className="h-5 w-5 text-gray-400" />
            </div>
            <Controller
              name="specialization"
              control={control}
              render={({ field }) => (
                <input
                  {...field}
                  type="text"
                  className="block w-full pl-10 pr-3 py-2 rounded-md border border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                  placeholder="Your Specialization"
                />
              )}
            />
          </div>
        </div>
        {/* Years of Experience Field */}
        <div className="flex-1">
          <label className="block text-sm font-medium text-gray-700">
            Years of Experience
          </label>
          <div className="mt-1 relative rounded-md shadow-sm">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Award className="h-5 w-5 text-gray-400" />
            </div>
            <Controller
              name="experience"
              control={control}
              render={({ field }) => (
                <input
                  {...field}
                  type="number"
                  className="block w-full pl-10 pr-3 py-2 rounded-md border border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                  placeholder="Years of Experience"
                />
              )}
            />
            {errors.experience && (
              <p className="text-red-500 text-sm mt-1">
                {errors.experience.message}
              </p>
            )}
          </div>
        </div>
      </div>
      {/* Medical License Number Field */}
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Medical License Number
        </label>
        <div className="mt-1 relative rounded-md shadow-sm">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <FileText className="h-5 w-5 text-gray-400" />
          </div>
          <Controller
            name="license"
            control={control}
            render={({ field }) => (
              <input
                {...field}
                type="text"
                className="block w-full pl-10 pr-3 py-2 rounded-md border border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                placeholder="License Number"
              />
            )}
          />
        </div>
      </div>
    </div>
  );

  const renderAdminFields = () => (
    <div className="space-y-4">
      {/* Admin Access Code Field */}
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Admin Access Code
        </label>
        <div className="mt-1 relative rounded-md shadow-sm">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Lock className="h-5 w-5 text-gray-400" />
          </div>
          <Controller
            name="adminCode"
            control={control}
            render={({ field }) => (
              <input
                {...field}
                type="password"
                className="block w-full pl-10 pr-3 py-2 rounded-md border border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                placeholder="Enter Admin Access Code"
              />
            )}
          />
        </div>
      </div>
      {/* Department Field */}
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Department
        </label>
        <div className="mt-1 relative rounded-md shadow-sm">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Hospital className="h-5 w-5 text-gray-400" />
          </div>
          <Controller
            name="department"
            control={control}
            render={({ field }) => (
              <input
                {...field}
                type="text"
                className="block w-full pl-10 pr-3 py-2 rounded-md border border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                placeholder="Department Name"
              />
            )}
          />
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Create your account
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          Join our healthcare platform
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          {/* User Type Selection */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              I am a...
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {["patient", "doctor", "admin"].map((type) => (
                <button
                  key={type}
                  type="button"
                  onClick={() => setUserType(type)}
                  className={`py-2 px-4 text-sm font-medium rounded-md capitalize
                    ${
                      userType === type
                        ? "bg-blue-600 text-white"
                        : "bg-gray-100 text-gray-900 hover:bg-gray-200"
                    }`}>
                  {type}
                </button>
              ))}
            </div>
          </div>

          <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
            {/* Common Fields */}
            <div className="space-y-4">
              {/* First Name Field */}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  First Name
                </label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <User className="h-5 w-5 text-gray-400" />
                  </div>
                  <Controller
                    name="firstName"
                    control={control}
                    render={({ field }) => (
                      <input
                        {...field}
                        type="text"
                        className="block w-full pl-10 pr-3 py-2 rounded-md border border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                        placeholder="First Name"
                      />
                    )}
                  />
                </div>
                {errors.firstName && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.firstName.message}
                  </p>
                )}
              </div>
              {/* Last Name Field */}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Last Name
                </label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <User className="h-5 w-5 text-gray-400" />
                  </div>
                  <Controller
                    name="lastName"
                    control={control}
                    render={({ field }) => (
                      <input
                        {...field}
                        type="text"
                        className="block w-full pl-10 pr-3 py-2 rounded-md border border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                        placeholder="Last Name"
                      />
                    )}
                  />
                </div>
                {errors.lastName && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.lastName.message}
                  </p>
                )}
              </div>
              {/* Email Field */}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Email
                </label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Mail className="h-5 w-5 text-gray-400" />
                  </div>
                  <Controller
                    name="email"
                    control={control}
                    render={({ field }) => (
                      <input
                        {...field}
                        type="email"
                        className="block w-full pl-10 pr-3 py-2 rounded-md border border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                        placeholder="Email address"
                      />
                    )}
                  />
                </div>
                {errors.email && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.email.message}
                  </p>
                )}
              </div>
              {/* Password and Confirm Password Fields */}
              <div className="flex flex-col sm:flex-row gap-4">
                {/* Password Field */}
                <div className="flex-1">
                  <label className="block text-sm font-medium text-gray-700">
                    Password
                  </label>
                  <div className="mt-1 relative rounded-md shadow-sm">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Lock className="h-5 w-5 text-gray-400" />
                    </div>
                    <Controller
                      name="password"
                      control={control}
                      render={({ field }) => (
                        <input
                          {...field}
                          type="password"
                          className="block w-full pl-10 pr-3 py-2 rounded-md border border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                          placeholder="Password"
                        />
                      )}
                    />
                  </div>
                  {errors.password && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.password.message}
                    </p>
                  )}
                </div>
                {/* Confirm Password Field */}
                <div className="flex-1">
                  <label className="block text-sm font-medium text-gray-700">
                    Confirm Password
                  </label>
                  <div className="mt-1 relative rounded-md shadow-sm">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Lock className="h-5 w-5 text-gray-400" />
                    </div>
                    <Controller
                      name="confirmPassword"
                      control={control}
                      render={({ field }) => (
                        <input
                          {...field}
                          type="password"
                          className="block w-full pl-10 pr-3 py-2 rounded-md border border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                          placeholder="Confirm Password"
                        />
                      )}
                    />
                  </div>
                  {errors.confirmPassword && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.confirmPassword.message}
                    </p>
                  )}
                </div>
              </div>
              {/* Phone Number and Date of Birth Fields */}
              <div className="flex flex-col sm:flex-row gap-4">
                {/* Phone Number Field */}
                <div className="flex-1">
                  <label className="block text-sm font-medium text-gray-700">
                    Phone Number
                  </label>
                  <div className="mt-1 relative rounded-md shadow-sm">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Phone className="h-5 w-5 text-gray-400" />
                    </div>
                    <Controller
                      name="phone"
                      control={control}
                      render={({ field }) => (
                        <input
                          {...field}
                          type="tel"
                          className="block w-full pl-10 pr-3 py-2 rounded-md border border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                          placeholder="Phone Number"
                        />
                      )}
                    />
                  </div>
                  {errors.phone && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.phone.message}
                    </p>
                  )}
                </div>
                {/* Date of Birth Field */}
                <div className="flex-1">
                  <label className="block text-sm font-medium text-gray-700">
                    Date of Birth
                  </label>
                  <div className="mt-1 relative rounded-md shadow-sm">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Calendar className="h-5 w-5 text-gray-400" />
                    </div>
                    <Controller
                      name="dateOfBirth"
                      control={control}
                      render={({ field }) => (
                        <input
                          {...field}
                          type="date"
                          className="block w-full pl-10 pr-3 py-2 rounded-md border border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                        />
                      )}
                    />
                  </div>
                  {errors.dateOfBirth && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.dateOfBirth.message}
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Role-specific fields */}
            {userType === "patient" && renderPatientFields()}
            {userType === "doctor" && renderDoctorFields()}
            {userType === "admin" && renderAdminFields()}

            <div>
              <button
                type="submit"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                Sign Up
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignupForm;
