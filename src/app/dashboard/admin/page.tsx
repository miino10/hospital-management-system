"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState } from "react";
import {
  Users,
  UserPlus,
  Calculator,
  PiggyBank,
  Wallet,
  Search,
  Mail,
  Phone,
  Trash2,
  AlertCircle,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function AdminDashboard() {
  const [openDialog, setOpenDialog] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});

  const [staffMembers, setStaffMembers] = useState([
    {
      id: 1,
      name: "Dr. Sarah Wilson",
      role: "doctor",
      specialty: "Cardiology",
      email: "sarah.wilson@hospital.com",
      phone: "+1 (555) 123-4567",
      avatar: "/api/placeholder/32/32",
    },
    {
      id: 2,
      name: "Dr. Michael Chen",
      role: "doctor",
      specialty: "Neurology",
      email: "michael.chen@hospital.com",
      phone: "+1 (555) 234-5678",
      avatar: "/api/placeholder/32/32",
    },
  ]);

  const [formData, setFormData] = useState({
    name: "",
    role: "doctor",
    specialty: "",
    email: "",
    phone: "",
  });

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    // Name validation
    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    } else if (formData.name.length < 3) {
      newErrors.name = "Name must be at least 3 characters";
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    // Phone validation
    const phoneRegex = /^\+1 \(\d{3}\) \d{3}-\d{4}$/;
    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required";
    } else if (!phoneRegex.test(formData.phone)) {
      newErrors.phone = "Phone must match format: +1 (555) 555-5555";
    }

    // Specialty validation for doctors
    if (formData.role === "doctor" && !formData.specialty) {
      newErrors.specialty = "Specialty is required for doctors";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const stats = [
    {
      title: "Total Doctors",
      value: staffMembers.filter((s) => s.role === "doctor").length,
      icon: Users,
      color: "text-blue-500",
    },
    {
      title: "Total Nurses",
      value: staffMembers.filter((s) => s.role === "nurse").length,
      icon: Users,
      color: "text-green-500",
    },
    {
      title: "Total Staff",
      value: staffMembers.length,
      icon: Users,
      color: "text-purple-500",
    },
    {
      title: "Hospital Expenses",
      value: "$50,000",
      icon: Calculator,
      color: "text-red-500",
    },
    {
      title: "Total Revenue",
      value: "$150,000",
      icon: PiggyBank,
      color: "text-green-500",
    },
    {
      title: "Total Salaries",
      value: "$80,000",
      icon: Wallet,
      color: "text-yellow-500",
    },
  ];

  const handleInputChange = (e: any) => {
    const { id, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }));
    // Clear error when user starts typing
    if (errors[id]) {
      setErrors((prev) => ({
        ...prev,
        [id]: "",
      }));
    }
  };

  const handleSubmit = () => {
    if (validateForm()) {
      const newStaffMember = {
        id: staffMembers.length + 1,
        ...formData,
        avatar: "/api/placeholder/32/32",
      };
      setStaffMembers((prev) => [...prev, newStaffMember]);
      setFormData({
        name: "",
        role: "doctor",
        specialty: "",
        email: "",
        phone: "",
      });
      setErrors({});
      setOpenDialog(false);
    }
  };

  const handleDelete = (id: number) => {
    setStaffMembers((prev) => prev.filter((staff) => staff.id !== id));
  };

  const filteredStaff = staffMembers.filter(
    (staff) =>
      staff.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      staff.specialty.toLowerCase().includes(searchTerm.toLowerCase()) ||
      staff.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const FormField = ({ label, id, type = "text", error }: any) => (
    <div className="grid gap-2">
      <Label htmlFor={id}>{label}</Label>
      <Input
        id={id}
        type={type}
        value={formData[id as keyof typeof formData]}
        onChange={handleInputChange}
        className={error ? "border-red-500" : ""}
        placeholder={
          id === "phone"
            ? "+1 (555) 000-0000"
            : id === "email"
            ? "john.doe@hospital.com"
            : "Dr. John Doe"
        }
      />
      {error && (
        <span className="text-sm text-red-500 flex items-center gap-1">
          <AlertCircle className="h-4 w-4" />
          {error}
        </span>
      )}
    </div>
  );

  const StaffForm = () => (
    <div className="grid gap-4 py-4">
      <FormField label="Full Name" id="name" error={errors.name} />

      <div className="grid gap-2">
        <Label htmlFor="role">Role</Label>
        <Select
          value={formData.role}
          onValueChange={(value) =>
            setFormData((prev) => ({ ...prev, role: value }))
          }>
          <SelectTrigger>
            <SelectValue placeholder="Select role" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="doctor">Doctor</SelectItem>
            <SelectItem value="nurse">Nurse</SelectItem>
            <SelectItem value="staff">Staff</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {formData.role === "doctor" && (
        <div className="grid gap-2">
          <Label htmlFor="specialty">Specialty</Label>
          <Select
            value={formData.specialty}
            onValueChange={(value) =>
              setFormData((prev) => ({ ...prev, specialty: value }))
            }>
            <SelectTrigger className={errors.specialty ? "border-red-500" : ""}>
              <SelectValue placeholder="Select specialty" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="cardiology">Cardiology</SelectItem>
              <SelectItem value="neurology">Neurology</SelectItem>
              <SelectItem value="pediatrics">Pediatrics</SelectItem>
              <SelectItem value="general">General Medicine</SelectItem>
            </SelectContent>
          </Select>
          {errors.specialty && (
            <span className="text-sm text-red-500 flex items-center gap-1">
              <AlertCircle className="h-4 w-4" />
              {errors.specialty}
            </span>
          )}
        </div>
      )}

      <FormField label="Email" id="email" type="email" error={errors.email} />
      <FormField label="Phone Number" id="phone" error={errors.phone} />
    </div>
  );

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="flex justify-between items-center">
          <h1 className="text-4xl font-bold text-gray-900">
            Adna Hospital Dashboard
          </h1>
          <Button onClick={() => setOpenDialog(true)} className="gap-2">
            <UserPlus className="h-4 w-4" />
            Add Staff
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {stats.map((stat, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-gray-500">
                  {stat.title}
                </CardTitle>
                <stat.icon className={`h-4 w-4 ${stat.color}`} />
              </CardHeader>
              <CardContent>
                <div className={`text-2xl font-bold ${stat.color}`}>
                  {stat.value}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <Tabs defaultValue="all" className="w-full">
          <div className="flex justify-between items-center mb-4">
            <TabsList>
              <TabsTrigger value="all">All Staff</TabsTrigger>
              <TabsTrigger value="doctors">Doctors</TabsTrigger>
              <TabsTrigger value="nurses">Nurses</TabsTrigger>
            </TabsList>
            <div className="relative">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
              <Input
                placeholder="Search staff..."
                className="pl-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          <TabsContent value="all">
            <StaffList staff={filteredStaff} onDelete={handleDelete} />
          </TabsContent>
          <TabsContent value="doctors">
            <StaffList
              staff={filteredStaff.filter((s) => s.role === "doctor")}
              onDelete={handleDelete}
            />
          </TabsContent>
          <TabsContent value="nurses">
            <StaffList
              staff={filteredStaff.filter((s) => s.role === "nurse")}
              onDelete={handleDelete}
            />
          </TabsContent>
        </Tabs>

        <Dialog open={openDialog} onOpenChange={setOpenDialog}>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Add New Staff Member</DialogTitle>
              <DialogDescription>
                Enter the details of the new staff member below.
              </DialogDescription>
            </DialogHeader>
            {Object.keys(errors).length > 0 && (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>
                  Please fix the errors in the form before submitting.
                </AlertDescription>
              </Alert>
            )}
            <StaffForm />
            <DialogFooter>
              <Button variant="outline" onClick={() => setOpenDialog(false)}>
                Cancel
              </Button>
              <Button type="submit" onClick={handleSubmit}>
                Add Staff Member
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}

const StaffList = ({ staff, onDelete }: any) => (
  <Card>
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Role</TableHead>
          <TableHead>Specialty</TableHead>
          <TableHead>Contact</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {staff.map((member: any) => (
          <TableRow key={member.id}>
            <TableCell className="font-medium">
              <div className="flex items-center gap-2">
                <Avatar className="h-8 w-8">
                  <AvatarImage src={member.avatar} alt={member.name} />
                  <AvatarFallback>
                    {member.name
                      .split(" ")
                      .map((n: any) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                {member.name}
              </div>
            </TableCell>
            <TableCell className="capitalize">{member.role}</TableCell>
            <TableCell>{member.specialty || "-"}</TableCell>
            <TableCell>
              <div className="flex flex-col gap-1">
                <div className="flex items-center gap-2">
                  <Mail className="h-4 w-4 text-gray-500" />
                  <span className="text-sm">{member.email}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="h-4 w-4 text-gray-500" />
                  <span className="text-sm">{member.phone}</span>
                </div>
              </div>
            </TableCell>
            <TableCell>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => onDelete(member.id)}
                className="text-red-500 hover:text-red-700 hover:bg-red-50">
                <Trash2 className="h-4 w-4" />
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </Card>
);
