import { Inter } from "next/font/google";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <div className='bg-custom-image bg-cover bg-center h-96 p-20 pt-40'>
      <div className="text-center text-[#003366]">
        <h1 className="text-5xl font-bold">Welcome to Thakur Bank</h1>
        <p className="text-xl font-medium pl-2">Your Trusted Financial Partner</p>
        <div className="pt-5">
          <Link href="register" className="p-2 bg-[#0033a0] text-white rounded-md cursor-pointer">Open an Account</Link>
        </div>
      </div>
    </div>
    <section className="text-center mt-5 p-10">
      <h2 className="text-4xl font-semibold">Our Services</h2>
      <div className="m-5">
        <h3 className="text-2xl">Personal Banking</h3>
        <p className="text-xl font-light">
          Discover a range of personal banking options tailored to your needs.
        </p>
      </div>
      <div className="m-5">
        <h3 className="text-2xl">Normal Transfer</h3>
        <p className="text-xl font-light">
          Perform Normal Transactions.
        </p>
      </div>
      <div className="m-5">
        <h3 className="text-2xl">Scheduled Transfer</h3>
        <p className="text-xl font-light">Post dated transfer of money.</p>
      </div>
    </section>
    <section className="text-center pb-5">
      <h2 className="text-4xl font-semibold">Why Choose Us</h2>
      <p className="text-xl font-light">
        We provide exceptional financial services that meet your unique needs.
      </p>
    </section>
    </>
  );
}
