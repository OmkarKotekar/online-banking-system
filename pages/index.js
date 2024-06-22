import Link from "next/link";
import Carousel from "@/components/Carousel";

export default function Home() {
  return (
    <>
      <div className="bg-gradient-to-b from-indigo-200 to-white">
        <Carousel />
      </div>
      <section className="text-center mt-10 p-10 bg-white shadow-lg rounded-lg mx-5">
        <h2 className="text-4xl font-semibold text-indigo-900 mb-6">Our Services</h2>
        <div className="m-5 p-5 bg-indigo-50 rounded-lg shadow-md transform hover:scale-105 transition duration-300">
          <h3 className="text-2xl font-bold text-indigo-800">Personal Banking</h3>
          <p className="text-xl font-light text-indigo-700 mt-2">
            Discover a range of personal banking options tailored to your needs.
          </p>
        </div>
        <div className="m-5 p-5 bg-indigo-50 rounded-lg shadow-md transform hover:scale-105 transition duration-300">
          <h3 className="text-2xl font-bold text-indigo-800">Normal Transfer</h3>
          <p className="text-xl font-light text-indigo-700 mt-2">
            Perform Normal Transactions.
          </p>
        </div>
        <div className="m-5 p-5 bg-indigo-50 rounded-lg shadow-md transform hover:scale-105 transition duration-300">
          <h3 className="text-2xl font-bold text-indigo-800">Scheduled Transfer</h3>
          <p className="text-xl font-light text-indigo-700 mt-2">
            Post dated transfer of money.
          </p>
        </div>
      </section>
      <section className="text-center py-10 bg-indigo-100 shadow-lg rounded-lg mx-5 mt-10">
        <h2 className="text-4xl font-semibold text-indigo-900 mb-6">Why Choose Us</h2>
        <p className="text-xl font-light text-indigo-700">
          We provide exceptional financial services that meet your unique needs.
        </p>
      </section>
    </>
  );
}
