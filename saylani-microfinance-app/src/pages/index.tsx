import Link from "next/link";
import { useState } from "react";

export default function Home() {
  const loanCategories = [
    {
      name: "Wedding Loans",
      subcategories: ["Valima", "Furniture", "Valima Food", "Jahez"],
      maxLoan: 500000,
      period: 3,
    },
    {
      name: "Home Construction Loans",
      subcategories: ["Structure", "Finishing"],
      maxLoan: 1000000,
      period: 5,
    },
    {
      name: "Business Startup Loans",
      subcategories: [
        "Buy Stall",
        "Advance Rent for Shop",
        "Shop Assets",
        "Shop Machinery",
      ],
      maxLoan: 1000000,
      period: 5,
    },
    {
      name: "Education Loans",
      subcategories: ["University Fees", "Child Fees Loan"],
      maxLoan: "Based on Requirement",
      period: 4,
    },
  ];

  // Corrected state declarations with proper TypeScript types
  const [selectedCategory, setSelectedCategory] = useState<
    (typeof loanCategories)[number] | null
  >(null);
  const [selectedSubcategory, setSelectedSubcategory] = useState<string>("");
  const [deposit, setDeposit] = useState<number | "">("");
  const [loanPeriod, setLoanPeriod] = useState<number | "">("");
  const [calculatedLoan, setCalculatedLoan] = useState<{
    loanAmount: number;
    monthlyPayment: string;
  } | null>(null);

  const handleCalculate = () => {
    if (selectedCategory && deposit && loanPeriod) {
      const maxLoan =
        selectedCategory.maxLoan !== "Based on Requirement"
          ? selectedCategory.maxLoan
          : 0;
      const remainingLoan = Math.max(0, Number(maxLoan) - Number(deposit));

      setCalculatedLoan({
        loanAmount: remainingLoan,
        monthlyPayment: (remainingLoan / (Number(loanPeriod) * 12)).toFixed(2),
      });
    } else {
      alert("Please fill all fields!");
    }
  };

  return (
    <div className="bg-gradient-to-b from-blue-50 via-white to-blue-100 min-h-screen">
      <header className="bg-blue-600 text-white shadow-md">
        <div className="max-w-7xl mx-auto flex items-center justify-between p-4">
          <h1 className="text-2xl font-bold">Saylani Microfinance</h1>

          <nav>
            <ul className="flex space-x-8 text-lg">
              <li>
                <a href="#" className="hover:text-gray-200 transition">
                  Home
                </a>
              </li>
              <li>
                <a href="#about" className="hover:text-gray-200 transition">
                  About
                </a>
              </li>
            </ul>
          </nav>

          <div className="flex space-x-4">
            <Link href="/login">
              <button className="bg-white text-blue-600 px-4 py-2 rounded-lg font-semibold hover:bg-gray-100 transition">
                Login
              </button>
            </Link>
            <Link href="/signup">
              <button className="bg-yellow-400 text-blue-800 px-4 py-2 rounded-lg font-semibold hover:bg-yellow-300 transition">
                Sign Up
              </button>
            </Link>
          </div>
        </div>
      </header>

      <main className="px-6 py-12">
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-800 text-center mb-8">
            Explore Our Loan Categories
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {loanCategories.map((category, index) => (
              <div
                key={index}
                className="p-6 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col justify-between"
              >
                <div>
                  <h3 className="text-xl font-semibold text-blue-600 mb-4">
                    {category.name}
                  </h3>
                  <ul className="space-y-2 text-gray-600">
                    {category.subcategories.map((sub, subIndex) => (
                      <li key={subIndex} className="flex items-center gap-2">
                        <span className="w-2 h-2 bg-blue-600 rounded-full"></span>
                        {sub}
                      </li>
                    ))}
                  </ul>
                </div>
                <Link href="/login">
                  <button className="mt-6 mx-auto bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-blue-500 transition">
                    Take it
                  </button>
                </Link>
              </div>
            ))}
          </div>
        </section>

        {/* Loan Calculator Section */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-800 text-center mb-8">
            Loan Calculator
          </h2>

          <div className="max-w-3xl mx-auto bg-white p-6 rounded-2xl shadow-lg">
            <div className="mb-4">
              <label className="block text-gray-600 font-semibold mb-2">
                Select Loan Category
              </label>
              <select
                className="w-full border border-gray-300 rounded-lg p-2 focus:border-yellow-600 focus:ring-2 focus:ring-yellow-300"
                onChange={(e) =>
                  setSelectedCategory(
                    loanCategories.find((cat) => cat.name === e.target.value) ||
                      null
                  )
                }
              >
                <option value="">-- Choose a category --</option>
                {loanCategories.map((category, index) => (
                  <option key={index} value={category.name}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>

            {selectedCategory && (
              <div className="mb-4">
                <label className="block text-gray-600 font-semibold mb-2">
                  Select Subcategory
                </label>
                <select
                  className="w-full border border-gray-300 rounded-lg p-2 focus:border-yellow-600 focus:ring-2 focus:ring-yellow-300"
                  onChange={(e) => setSelectedSubcategory(e.target.value)}
                >
                  <option value="">-- Choose a subcategory --</option>
                  {selectedCategory.subcategories.map((sub, subIndex) => (
                    <option key={subIndex} value={sub}>
                      {sub}
                    </option>
                  ))}
                </select>
              </div>
            )}

            <div className="mb-4">
              <label className="block text-gray-600 font-semibold mb-2">
                Enter Initial Deposit (PKR)
              </label>
              <input
                type="number"
                className="w-full border border-yellow-600 rounded-lg p-2 focus:border-blue-600 focus:ring-2 focus:ring-blue-300"
                onChange={(e) => setDeposit(Number(e.target.value))}
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-600 font-semibold mb-2">
                Loan Period (in years)
              </label>
              <input
                type="number"
                className="w-full border border-yellow-600 rounded-lg p-2 focus:border-blue-600 focus:ring-2 focus:ring-blue-300"
                onChange={(e) => setLoanPeriod(Number(e.target.value))}
              />
            </div>

            <button
              className="bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-blue-500 transition w-full"
              onClick={handleCalculate}
            >
              Calculate Loan
            </button>

            {calculatedLoan && (
              <div className="mt-6 p-4 bg-green-50 border border-green-500 rounded-lg">
                <p className="text-gray-800 font-semibold">
                  Loan Amount: PKR {calculatedLoan.loanAmount}
                </p>
                <p className="text-gray-800 font-semibold">
                  Monthly Payment: PKR {calculatedLoan.monthlyPayment}
                </p>
              </div>
            )}
          </div>
        </section>
      </main>
    </div>
  );
}
