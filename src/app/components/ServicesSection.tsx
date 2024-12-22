"use client";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import { motion } from "framer-motion";

const ServicesSection = () => {
  const services = [
    {
      title: "General Consultation",
      description: "Expert advice from experienced doctors available 24/7.",
      icon: "https://images.unsplash.com/photo-1576091358783-a212ec293ff3?q=80&w=2825&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      badge: "24/7 Available",
    },
    {
      title: "Emergency Services",
      description: "Round-the-clock emergency care with rapid response teams.",
      icon: "https://images.unsplash.com/photo-1599700403969-f77b3aa74837?q=80&w=2835&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      badge: "Urgent Care",
    },
    {
      title: "Diagnostics",
      description: "State-of-the-art diagnostic services with quick results.",
      icon: "https://images.unsplash.com/photo-1576671414121-aa0c81c869e1?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      badge: "Quick Results",
    },
  ];

  return (
    <section
      id="services"
      className="py-20 bg-gradient-to-b from-white to-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 space-y-4">
          <h3 className="text-4xl font-bold text-gray-900 tracking-tight">
            Our Services
          </h3>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Comprehensive healthcare solutions tailored to your needs
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}>
              <Card className="hover:shadow-xl transition-all duration-300 border-none">
                <CardHeader className="text-center">
                  <div className="mb-6 relative h-32 flex items-center justify-center">
                    <Image
                      src={service.icon}
                      alt={service.title}
                      width={100}
                      height={100}
                      className="w-24 h-24 rounded-full object-cover shadow-md transition-transform hover:scale-105"
                    />
                  </div>
                  <div className="space-y-2">
                    <Badge variant="secondary" className="mb-2">
                      {service.badge}
                    </Badge>
                    <CardTitle className="text-xl font-bold text-gray-900">
                      {service.title}
                    </CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-gray-600 text-center">
                    {service.description}
                  </CardDescription>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
