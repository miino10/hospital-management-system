import React from "react";
import { Calendar } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const DoctorDashboard = () => {
  // Sample data - in a real app, this would come from an API
  const appointments = [
    {
      id: 1,
      patient: "MOHamed Ali",
      time: "09:00 AM",
      type: "Check-up",
      status: "Confirmed",
    },
    {
      id: 2,
      patient: "JAMAAL",
      time: "10:30 AM",
      type: "Follow-up",
      status: "Pending",
    },
    {
      id: 3,
      patient: "CISE KALIIL",
      time: "02:00 PM",
      type: "Consultation",
      status: "Confirmed",
    },
  ];

  const patients = [
    {
      id: 1,
      name: "NURA ABDI",
      age: 45,
      lastVisit: "2024-12-15",
      condition: "Hypertension",
    },
    {
      id: 2,
      name: "KAYSE QUULE",
      age: 32,
      lastVisit: "2024-12-18",
      condition: "Diabetes",
    },
    {
      id: 3,
      name: "FADUMO JAMA",
      age: 28,
      lastVisit: "2024-12-20",
      condition: "Asthma",
    },
  ];

  const stats = [
    { title: "Total Patients", value: "150" },
    { title: "Today's Appointments", value: "8" },
    { title: "Pending Reports", value: "3" },
    { title: "Total Revenue", value: "$2,500" },
  ];

  return (
    <div className="p-6 space-y-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Doctor Dashboard</h1>
          <p className="text-gray-500">Welcome back, Dr. ABDIFATAH DAHIR</p>
        </div>
        <div className="flex items-center space-x-4">
          <Calendar className="h-6 w-6 text-gray-500" />
          <span className="text-gray-600">December 21, 2024</span>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <Card key={stat.title}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-gray-500">
                {stat.title}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Main Content */}
      <Tabs defaultValue="appointments" className="space-y-4">
        <TabsList>
          <TabsTrigger value="appointments">Appointments</TabsTrigger>
          <TabsTrigger value="patients">Patients</TabsTrigger>
          <TabsTrigger value="schedule">Schedule</TabsTrigger>
        </TabsList>

        <TabsContent value="appointments" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Today's Appointments</CardTitle>
              <CardDescription>
                Manage your appointments for today
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="divide-y">
                {appointments.map((appointment) => (
                  <div
                    key={appointment.id}
                    className="py-3 flex justify-between items-center">
                    <div>
                      <p className="font-medium">{appointment.patient}</p>
                      <p className="text-sm text-gray-500">
                        {appointment.type}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">{appointment.time}</p>
                      <p
                        className={`text-sm ${
                          appointment.status === "Confirmed"
                            ? "text-green-500"
                            : "text-yellow-500"
                        }`}>
                        {appointment.status}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="patients" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Patient List</CardTitle>
              <CardDescription>View and manage your patients</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="divide-y">
                {patients.map((patient) => (
                  <div
                    key={patient.id}
                    className="py-3 flex justify-between items-center">
                    <div>
                      <p className="font-medium">{patient.name}</p>
                      <p className="text-sm text-gray-500">
                        Age: {patient.age}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm">Last Visit: {patient.lastVisit}</p>
                      <p className="text-sm text-gray-500">
                        {patient.condition}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="schedule" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Weekly Schedule</CardTitle>
              <CardDescription>Manage your weekly schedule</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-7 gap-4 text-center">
                {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map(
                  (day) => (
                    <div key={day} className="p-4 border rounded-lg">
                      <p className="font-medium">{day}</p>
                      <p className="text-sm text-gray-500">9 AM - 5 PM</p>
                    </div>
                  )
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default DoctorDashboard;
