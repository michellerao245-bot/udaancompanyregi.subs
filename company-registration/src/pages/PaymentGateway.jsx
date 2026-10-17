import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRegistration } from '../context/RegistrationContext';

export default function PaymentGateway() {
  const navigate = useNavigate();
  const { companyData, selectedPlan } = useRegistration();

  const [method, setMethod] = useState('card');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Card form
  const [card, setCard] = useState({
    number: '',
    name: '',
    expiry: '',
    cvv: '',
  });

  // UPI form
  const [upi, setUpi] = useState('');

  // Netbanking
  const [bank, setBank] = useState('');

  // ==================== PAYMENT HANDLER ====================
  const handlePay = async () => {
    setError('');

    // Validation
    if (method === 'card') {
      if (!card.number || card.number.replace(/\s/g, '').length !== 16) {
        setError('Card number 16 digits ka hona chahiye');
        return;
      }
      if (!card.name) {
        setError('Card holder name zaroori hai');
        return;
      }
      if (!card.expiry) {
        setError('Expiry date zaroori hai');
        return;
      }
      if (!card.cvv || card.cvv.length !== 3) {
        setError('CVV 3 digits ka hona chahiye');
        return;
      }
    }

    if (method === 'upi') {
      if (!upi || !upi.includes('@')) {
        setError('Valid UPI ID daalo (e.g. name@paytm)');
        return;
      }
    }

    if (method === 'netbanking') {
      if (!bank) {
        setError('Bank select karo');
        return;
      }
    }

    setLoading(true);

    // Fake payment processing (2 sec)
    setTimeout(() => {
      setLoading(false);
      navigate('/success');
    }, 2000);
  };

  // ==================== CARD FORMATTING ====================
  const formatCardNumber = (value) => {
    const digits = value.replace(/\D/g, '').slice(0, 16);
    return digits.replace(/(\d{4})(?=\d)/g, '$1 ');
  };

  const formatExpiry = (value) => {
    const digits = value.replace(/\D/g, '').slice(0, 4);
    if (digits.length >= 2) {
      return digits.slice(0, 2) + '/' + digits.slice(2);
    }
    return digits;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50 py-8 px-4">

      {/* ==================== HEADER ==================== */}
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-6">
          <h1 className="text-2xl font-black text-gray-800">
            🔒 Secure Payment
          </h1>
          <p className="text-sm text-gray-500">
            100% Secure • SSL Encrypted
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

          {/* ==================== LEFT: PAYMENT METHODS ==================== */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-xl p-6">

              {/* Amount to pay */}
              <div className="bg-gradient-to-r from-green-500 to-emerald-600 rounded-xl p-4 text-white mb-6">
                <p className="text-xs uppercase opacity-90">Amount to Pay</p>
                <p className="text-3xl font-black">
                  ₹{selectedPlan?.price?.toLocaleString('en-IN') || 0}
                </p>
                <p className="text-xs opacity-90 mt-1">
                  {selectedPlan?.name} Plan • {selectedPlan?.period}
                </p>
              </div>

              {/* Method Tabs */}
              <div className="grid grid-cols-3 gap-2 mb-6">
                <button
                  onClick={() => setMethod('card')}
                  className={`py-3 rounded-xl text-xs font-bold uppercase transition-all ${
                    method === 'card'
                      ? 'bg-blue-600 text-white shadow-lg'
                      : 'bg-gray-100 text-gray-600'
                  }`}
                >
                  💳 Card
                </button>
                <button
                  onClick={() => setMethod('upi')}
                  className={`py-3 rounded-xl text-xs font-bold uppercase transition-all ${
                    method === 'upi'
                      ? 'bg-blue-600 text-white shadow-lg'
                      : 'bg-gray-100 text-gray-600'
                  }`}
                >
                  📱 UPI
                </button>
                <button
                  onClick={() => setMethod('netbanking')}
                  className={`py-3 rounded-xl text-xs font-bold uppercase transition-all ${
                    method === 'netbanking'
                      ? 'bg-blue-600 text-white shadow-lg'
                      : 'bg-gray-100 text-gray-600'
                  }`}
                >
                  🏦 Netbanking
                </button>
              </div>

              {/* ==================== CARD FORM ==================== */}
              {method === 'card' && (
                <div className="space-y-4 animate-fade-in">
                  <div>
                    <label className="block text-xs font-bold text-gray-600 uppercase mb-1">
                      Card Number
                    </label>
                    <input
                      type="text"
                      value={card.number}
                      onChange={(e) =>
                        setCard({ ...card, number: formatCardNumber(e.target.value) })
                      }
                      placeholder="1234 5678 9012 3456"
                      maxLength={19}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl text-sm font-mono tracking-wider focus:border-blue-500 outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-600 uppercase mb-1">
                      Card Holder Name
                    </label>
                    <input
                      type="text"
                      value={card.name}
                      onChange={(e) =>
                        setCard({ ...card, name: e.target.value.toUpperCase() })
                      }
                      placeholder="RAHUL SHARMA"
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl text-sm uppercase focus:border-blue-500 outline-none"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-bold text-gray-600 uppercase mb-1">
                        Expiry
                      </label>
                      <input
                        type="text"
                        value={card.expiry}
                        onChange={(e) =>
                          setCard({ ...card, expiry: formatExpiry(e.target.value) })
                        }
                        placeholder="MM/YY"
                        maxLength={5}
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl text-sm font-mono text-center focus:border-blue-500 outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-gray-600 uppercase mb-1">
                        CVV
                      </label>
                      <input
                        type="password"
                        value={card.cvv}
                        onChange={(e) =>
                          setCard({
                            ...card,
                            cvv: e.target.value.replace(/\D/g, '').slice(0, 3),
                          })
                        }
                        placeholder="•••"
                        maxLength={3}
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl text-sm font-mono text-center focus:border-blue-500 outline-none"
                      />
                    </div>
                  </div>

                  <p className="text-[10px] text-gray-400 text-center">
                    🔒 Aapka card data safe hai • SSL encrypted
                  </p>
                </div>
              )}

              {/* ==================== UPI FORM ==================== */}
              {method === 'upi' && (
                <div className="space-y-4 animate-fade-in">
                  <div>
                    <label className="block text-xs font-bold text-gray-600 uppercase mb-1">
                      UPI ID
                    </label>
                    <input
                      type="text"
                      value={upi}
                      onChange={(e) => setUpi(e.target.value)}
                      placeholder="yourname@paytm"
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl text-sm focus:border-blue-500 outline-none"
                    />
                  </div>

                  <div className="bg-blue-50 border-2 border-blue-200 rounded-xl p-4">
                    <p className="text-xs text-blue-700 font-medium">
                      💡 UPI apps: Paytm, PhonePe, Google Pay, BHIM
                    </p>
                  </div>
                </div>
              )}

              {/* ==================== NETBANKING ==================== */}
              {method === 'netbanking' && (
                <div className="space-y-4 animate-fade-in">
                  <div>
                    <label className="block text-xs font-bold text-gray-600 uppercase mb-1">
                      Select Bank
                    </label>
                    <select
                      value={bank}
                      onChange={(e) => setBank(e.target.value)}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl text-sm focus:border-blue-500 outline-none bg-white"
                    >
                      <option value="">-- Select Bank --</option>
                      <option value="sbi">State Bank of India</option>
                      <option value="hdfc">HDFC Bank</option>
                      <option value="icici">ICICI Bank</option>
                      <option value="axis">Axis Bank</option>
                      <option value="kotak">Kotak Mahindra Bank</option>
                      <option value="pnb">Punjab National Bank</option>
                      <option value="bob">Bank of Baroda</option>
                    </select>
                  </div>
                </div>
              )}

              {/* Error */}
              {error && (
                <div className="bg-red-50 border-2 border-red-200 rounded-xl px-4 py-3 mt-4">
                  <p className="text-sm text-red-700 font-medium text-center">
                    {error}
                  </p>
                </div>
              )}

              {/* ==================== PAY BUTTON ==================== */}
              <button
                onClick={handlePay}
                disabled={loading}
                className="w-full mt-6 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 disabled:opacity-60 text-white font-black py-4 rounded-2xl shadow-xl text-base uppercase tracking-wider transition-all active:scale-95"
              >
                {loading ? (
                  <span className="flex items-center justify-center gap-2">
                    <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                    Processing Payment...
                  </span>
                ) : (
                  `🔒 Pay ₹${selectedPlan?.price?.toLocaleString('en-IN') || 0}`
                )}
              </button>

            </div>
          </div>

          {/* ==================== RIGHT: ORDER SUMMARY ==================== */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-xl p-6 sticky top-6">
              <h2 className="text-sm font-bold text-gray-700 uppercase mb-4">
                📋 Order Summary
              </h2>

              {companyData && (
                <div className="mb-4 pb-4 border-b border-gray-100">
                  <p className="text-xs text-gray-500 uppercase">Company</p>
                  <p className="text-sm font-bold text-gray-800">
                    {companyData.companyName}
                  </p>
                  <p className="text-xs text-gray-500">{companyData.email}</p>
                </div>
              )}

              {selectedPlan && (
                <>
                  <div className="mb-4 pb-4 border-b border-gray-100">
                    <p className="text-xs text-gray-500 uppercase">Plan</p>
                    <p className="text-sm font-bold text-gray-800">
                      {selectedPlan.name}
                    </p>
                    <p className="text-xs text-gray-500">
                      {selectedPlan.description}
                    </p>
                  </div>

                  <div className="space-y-2 mb-4">
                    <div className="flex justify-between text-xs">
                      <span className="text-gray-500">Subtotal</span>
                      <span className="font-medium">
                        ₹{selectedPlan.price?.toLocaleString('en-IN')}
                      </span>
                    </div>
                    <div className="flex justify-between text-xs">
                      <span className="text-gray-500">GST (18%)</span>
                      <span className="font-medium">
                        ₹{Math.round((selectedPlan.price || 0) * 0.18).toLocaleString('en-IN')}
                      </span>
                    </div>
                    <div className="flex justify-between text-xs">
                      <span className="text-gray-500">Discount</span>
                      <span className="font-medium text-green-600">-₹0</span>
                    </div>
                  </div>

                  <div className="pt-4 border-t-2 border-dashed border-gray-200">
                    <div className="flex justify-between">
                      <span className="text-sm font-bold text-gray-700">Total</span>
                      <span className="text-xl font-black text-green-600">
                        ₹{Math.round((selectedPlan.price || 0) * 1.18).toLocaleString('en-IN')}
                      </span>
                    </div>
                  </div>
                </>
              )}

              <div className="mt-6 bg-green-50 border border-green-200 rounded-xl p-3">
                <p className="text-[10px] text-green-800 text-center font-medium">
                  🔒 100% Secure • 7-day money back
                </p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}