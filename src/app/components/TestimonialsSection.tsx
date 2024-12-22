import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Quote } from "lucide-react";

const TestimonialsSection = () => {
  const testimonials = [
    {
      quote:
        "The care I received was outstanding! The staff went above and beyond.",
      author: "IZE HAJI",
      role: "Patient",
      image: "https://api.dicebear.com/7.x/avataaars/svg?seed=John",
    },
    {
      quote:
        "Highly recommend this hospital to everyone! Professional and caring team.",
      author: "NIMA HUSSEIN",
      role: "Patient",
      image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Jane",
    },
    {
      quote:
        "Excellent facilities and staff. They made me feel comfortable throughout.",
      author: "HINDA MOHAMED",
      role: "Patient",
      image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Michael",
    },
  ];

  return (
    <section id="testimonials" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h3 className="text-4xl font-bold text-gray-900 mb-4">
            What Our Patients Say
          </h3>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Read about experiences from our valued patients
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow">
              <CardHeader className="flex flex-row items-center gap-4">
                <div className="h-12 w-12 rounded-full overflow-hidden">
                  <img
                    src={testimonial.image}
                    alt={testimonial.author}
                    className="h-full w-full object-cover"
                  />
                </div>
                <div>
                  <p className="font-semibold text-lg">{testimonial.author}</p>
                  <p className="text-gray-600 text-sm">{testimonial.role}</p>
                </div>
              </CardHeader>
              <CardContent>
                <div className="mb-4">
                  <Quote className="h-6 w-6 text-blue-600" />
                </div>
                <p className="text-gray-700">{testimonial.quote}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
