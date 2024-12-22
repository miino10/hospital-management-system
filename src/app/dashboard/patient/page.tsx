"use client";
import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogDescription,
  DialogClose,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import {
  Calendar,
  Clock,
  Download,
  FileText,
  CreditCard,
  User,
  AlertCircle,
} from "lucide-react";
import Profile from "../../components/Profile";

interface Appointment {
  id: string;
  doctor: string;
  date: string;
  time: string;
  type: string;
  status: "upcoming" | "completed" | "cancelled";
}

interface MedicalRecord {
  id: string;
  date: string;
  type: string;
  doctor: string;
  description: string;
  attachments: string[];
}

interface Bill {
  id: string;
  date: string;
  amount: number;
  description: string;
  status: "paid" | "pending" | "overdue";
  dueDate: string;
}

export default function PatientDashboard() {
  const [appointments, setAppointments] = useState<Appointment[]>([
    {
      id: "1",
      doctor: "Dr. Sarah Smith",
      date: "2024-12-25",
      time: "10:00",
      type: "checkup",
      status: "upcoming",
    },
  ]);

  const [medicalRecords] = useState<MedicalRecord[]>([
    {
      id: "1",
      date: "2024-12-15",
      type: "Lab Results",
      doctor: "Dr. Sarah Smith",
      description: "Annual blood work results",
      attachments: ["blood_work.pdf", "notes.pdf"],
    },
  ]);

  const [bills] = useState<Bill[]>([
    {
      id: "1",
      date: "2024-12-10",
      amount: 150.0,
      description: "Annual checkup",
      status: "pending",
      dueDate: "2024-12-31",
    },
  ]);

  const [newAppointment, setNewAppointment] = useState({
    doctor: "",
    date: "",
    time: "",
    type: "",
  });

  const handleAppointmentSubmit = () => {
    const appointment: Appointment = {
      id: Math.random().toString(36).substr(2, 9),
      ...newAppointment,
      status: "upcoming",
    };
    setAppointments([...appointments, appointment]);
    setNewAppointment({ doctor: "", date: "", time: "", type: "" });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "upcoming":
        return "bg-blue-100 text-blue-800";
      case "completed":
        return "bg-green-100 text-green-800";
      case "cancelled":
        return "bg-red-100 text-red-800";
      case "paid":
        return "bg-green-100 text-green-800";
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "overdue":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  // Appointments Section
  const AppointmentsTab = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Appointments</h2>
        <Dialog>
          <DialogTrigger asChild>
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              New Appointment
            </button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md">
            <DialogTitle>Schedule New Appointment</DialogTitle>
            <DialogDescription>
              Fill in the details below to schedule a new appointment.
            </DialogDescription>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleAppointmentSubmit();
              }}
              className="space-y-4 mt-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Doctor's Name</label>
                <input
                  type="text"
                  value={newAppointment.doctor}
                  onChange={(e) =>
                    setNewAppointment({
                      ...newAppointment,
                      doctor: e.target.value,
                    })
                  }
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Date</label>
                  <input
                    type="date"
                    value={newAppointment.date}
                    onChange={(e) =>
                      setNewAppointment({
                        ...newAppointment,
                        date: e.target.value,
                      })
                    }
                    className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Time</label>
                  <input
                    type="time"
                    value={newAppointment.time}
                    onChange={(e) =>
                      setNewAppointment({
                        ...newAppointment,
                        time: e.target.value,
                      })
                    }
                    className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Appointment Type</label>
                <select
                  value={newAppointment.type}
                  onChange={(e) =>
                    setNewAppointment({
                      ...newAppointment,
                      type: e.target.value,
                    })
                  }
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                  required>
                  <option value="">Select type</option>
                  <option value="checkup">General Checkup</option>
                  <option value="consultation">Consultation</option>
                  <option value="follow-up">Follow-up</option>
                  <option value="emergency">Emergency</option>
                </select>
              </div>
              <div className="flex justify-end gap-2 mt-4">
                <DialogClose asChild>
                  <button
                    type="button"
                    className="px-4 py-2 border rounded-lg hover:bg-gray-100">
                    Cancel
                  </button>
                </DialogClose>
                <button
                  type="submit"
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg">
                  Schedule Appointment
                </button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-4">
        {appointments.map((appointment) => (
          <Card key={appointment.id}>
            <CardContent className="p-6">
              <div className="flex justify-between items-start">
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <User className="w-5 h-5 text-gray-500" />
                    <span className="font-medium">{appointment.doctor}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="w-5 h-5 text-gray-500" />
                    <span>
                      {new Date(appointment.date).toLocaleDateString()}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-5 h-5 text-gray-500" />
                    <span>{appointment.time}</span>
                  </div>
                </div>
                <Badge className={getStatusColor(appointment.status)}>
                  {appointment.status}
                </Badge>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );

  // Medical Records Section
  const MedicalRecordsTab = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Medical Records</h2>
      <div className="grid gap-4">
        {medicalRecords.map((record) => (
          <Card key={record.id}>
            <CardContent className="p-6">
              <div className="flex justify-between items-start">
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <FileText className="w-5 h-5 text-gray-500" />
                    <span className="font-medium">{record.type}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <User className="w-5 h-5 text-gray-500" />
                    <span>{record.doctor}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="w-5 h-5 text-gray-500" />
                    <span>{new Date(record.date).toLocaleDateString()}</span>
                  </div>
                  <p className="text-gray-600">{record.description}</p>
                </div>
                <button className="flex items-center gap-2 text-blue-600 hover:text-blue-700">
                  <Download className="w-5 h-5" />
                  Download
                </button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );

  // Bills Section
  const BillsTab = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Bills & Payments</h2>
      <div className="grid gap-4">
        {bills.map((bill) => (
          <Card key={bill.id}>
            <CardContent className="p-6">
              <div className="flex justify-between items-start">
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <CreditCard className="w-5 h-5 text-gray-500" />
                    <span className="font-medium">
                      ${bill.amount.toFixed(2)}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="w-5 h-5 text-gray-500" />
                    <span>
                      Due: {new Date(bill.dueDate).toLocaleDateString()}
                    </span>
                  </div>
                  <p className="text-gray-600">{bill.description}</p>
                </div>
                <div className="space-y-2 text-right">
                  <Badge className={getStatusColor(bill.status)}>
                    {bill.status}
                  </Badge>
                  {bill.status !== "paid" && (
                    <button className="block w-full bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg">
                      Pay Now
                    </button>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold">Welcome Back, JAMAC!</h1>
          <p className="text-gray-600 mt-2">Manage your healthcare journey</p>
        </div>

        <Tabs defaultValue="appointments" className="w-full">
          <TabsList className="bg-white p-1 rounded-lg shadow-sm mb-6">
            <TabsTrigger
              value="appointments"
              className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              Appointments
            </TabsTrigger>
            <TabsTrigger value="records" className="flex items-center gap-2">
              <FileText className="w-4 h-4" />
              Medical Records
            </TabsTrigger>
            <TabsTrigger value="bills" className="flex items-center gap-2">
              <CreditCard className="w-4 h-4" />
              Bills & Payments
            </TabsTrigger>
            <TabsTrigger value="profile" className="flex items-center gap-2">
              <User className="w-4 h-4" />
              Profile
            </TabsTrigger>
          </TabsList>

          <TabsContent value="appointments">
            <AppointmentsTab />
          </TabsContent>

          <TabsContent value="records">
            <MedicalRecordsTab />
          </TabsContent>

          <TabsContent value="bills">
            <BillsTab />
          </TabsContent>

          <TabsContent value="profile">
            <Profile />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}
