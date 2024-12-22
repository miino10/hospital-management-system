import Image from "next/image";

export default function HeroSection() {
  return (
    <section className="relative bg-blue-500 text-white py-20">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-5xl font-bold mb-4">
          Welcome to Our Adna Aden Hospital
        </h2>
        <p className="text-lg mb-6">
          Compassionate care, cutting-edge technology.
        </p>
        <button className="bg-white text-blue-600 px-6 py-2 rounded font-semibold hover:bg-gray-200">
          Learn More
        </button>
      </div>
      <div className="absolute inset-0 z-0 before:content-[''] before:absolute before:inset-0 before:bg-blue-900 before:opacity-70">
        <Image
          src="https://images.unsplash.com/photo-1516549655169-df83a0774514?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="Hospital Background"
          fill
          priority
          className="object-cover object-center"
          quality={100}
        />
      </div>
    </section>
  );
}
