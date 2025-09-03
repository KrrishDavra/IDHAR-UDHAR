import { useState, useEffect } from 'react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from 'recharts';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const Earnings = () => {
  const [timeFrame, setTimeFrame] = useState('week');
  const [hoveredBar, setHoveredBar] = useState(null);
  const [cashOutModalOpen, setCashOutModalOpen] = useState(false);
  const [cashOutAmount, setCashOutAmount] = useState('');
  const [cashOutMethod, setCashOutMethod] = useState('bank');
  const [payoutHistory, setPayoutHistory] = useState([
    { id: 1, date: 'Oct 24, 2025', amount: 320.85, method: 'Bank Account (**1234)', status: 'completed' },
    { id: 2, date: 'Oct 17, 2025', amount: 254.30, method: 'Bank Account (**1234)', status: 'completed' },
    { id: 3, date: 'Oct 10, 2025', amount: 198.45, method: 'Bank Account (**1234)', status: 'completed' },
  ]);
  const [showAllPayouts, setShowAllPayouts] = useState(false);
  const [cashOutLoading, setCashOutLoading] = useState(false);
  const [cashOutSuccess, setCashOutSuccess] = useState(false);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [customRangeSelected, setCustomRangeSelected] = useState(false);

  // Initialize dates on component mount
  useEffect(() => {
    const today = new Date();
    if (timeFrame === 'week') {
      const startOfWeek = new Date(today);
      startOfWeek.setDate(today.getDate() - today.getDay() + 1); // Monday
      setStartDate(startOfWeek);
      setEndDate(today);
    } else if (timeFrame === 'month') {
      const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
      setStartDate(startOfMonth);
      setEndDate(today);
    } else if (timeFrame === 'year') {
      const startOfYear = new Date(today.getFullYear(), 0, 1);
      setStartDate(startOfYear);
      setEndDate(today);
    }
  }, [timeFrame]);

  // Generate data based on date range
  const generateDataForRange = (start, end) => {
    if (!start || !end) return { labels: [], earnings: [], rides: [] };

    const daysDiff = Math.ceil((end - start) / (1000 * 60 * 60 * 24)) + 1;
    const labels = [];
    const earnings = [];
    const rides = [];
    
    for (let i = 0; i < daysDiff; i++) {
      const currentDate = new Date(start);
      currentDate.setDate(start.getDate() + i);
      
      // Format label based on time frame
      if (daysDiff <= 7) {
        labels.push(currentDate.toLocaleDateString('en-US', { weekday: 'short' }));
      } else if (daysDiff <= 31) {
        labels.push(currentDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }));
      } else {
        labels.push(currentDate.toLocaleDateString('en-US', { month: 'short', year: 'numeric' }));
      }
      
      // Generate realistic data
      const baseEarning = 50 + Math.random() * 100;
      const dayFactor = (currentDate.getDay() === 0 || currentDate.getDay() === 6) ? 1.5 : 1;
      earnings.push(Math.round(baseEarning * dayFactor));
      rides.push(Math.round(baseEarning * dayFactor / (15 + Math.random() * 5)));
    }
    
    return { labels, earnings, rides };
  };

  const earningsData = {
    week: {
      labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      earnings: [65, 85, 72, 90, 120, 145, 110],
      rides: [5, 7, 6, 7, 9, 12, 8]
    },
    month: {
      labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
      earnings: [420, 385, 510, 470],
      rides: [35, 30, 42, 38]
    },
    year: {
      labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
      earnings: [1200, 1350, 1420, 1280, 1500, 1600, 1550, 1400, 1450, 1380, 1600, 1800],
      rides: [95, 105, 110, 100, 115, 125, 120, 110, 115, 105, 130, 145]
    },
    custom: generateDataForRange(startDate, endDate)
  };

  const currentData = customRangeSelected ? earningsData.custom : earningsData[timeFrame];
  const totalEarnings = currentData.earnings.reduce((a, b) => a + b, 0);
  const totalRides = currentData.rides.reduce((a, b) => a + b, 0);
  const avgPerRide = totalRides > 0 ? (totalEarnings / totalRides) : 0;
  const availableForCashOut = totalEarnings * 0.9;

  const timeFrameOptions = [
    { value: 'week', label: 'This Week' },
    { value: 'month', label: 'This Month' },
    { value: 'year', label: 'This Year' },
    { value: 'custom', label: 'Custom Range' }
  ];

  const handleStartDateChange = (date) => {
    setStartDate(date);
    if (date && endDate) {
      setCustomRangeSelected(true);
    } else {
      setCustomRangeSelected(false);
    }
  };

  const handleEndDateChange = (date) => {
    setEndDate(date);
    if (startDate && date) {
      setCustomRangeSelected(true);
    } else {
      setCustomRangeSelected(false);
    }
  };

  const handleTimeFrameChange = (value) => {
    setTimeFrame(value);
    setCustomRangeSelected(false);
  };

  const handleCashOut = () => {
    setCashOutAmount(availableForCashOut.toFixed(2));
    setCashOutModalOpen(true);
  };

  const submitCashOut = () => {
    setCashOutLoading(true);
    setTimeout(() => {
      const newPayout = {
        id: payoutHistory.length + 1,
        date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
        amount: parseFloat(cashOutAmount),
        method: cashOutMethod === 'bank' ? 'Bank Account (**1234)' : 'PayPal (user@example.com)',
        status: 'pending'
      };
      
      setPayoutHistory([newPayout, ...payoutHistory]);
      setCashOutLoading(false);
      setCashOutSuccess(true);
      
      setTimeout(() => {
        setCashOutModalOpen(false);
        setCashOutSuccess(false);
      }, 1500);
    }, 2000);
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'completed':
        return (
          <span className="bg-orange-600  px-2 sm:px-3 py-1 text-xs rounded-full flex items-center gap-1 w-fit">
            <i className="fas fa-check-circle"></i>
            Completed
          </span>
        );
      case 'pending':
        return (
          <span className="bg-yellow-900/20 dark:bg-yellow-900/50 text-yellow-600 dark:text-yellow-400 px-2 sm:px-3 py-1 text-xs rounded-full flex items-center gap-1 w-fit">
            <i className="fas fa-clock"></i>
            Pending
          </span>
        );
      case 'failed':
        return (
          <span className="bg-red-900/20 dark:bg-red-900/50 text-red-600 dark:text-red-400 px-2 sm:px-3 py-1 text-xs rounded-full flex items-center gap-1 w-fit">
            <i className="fas fa-times-circle"></i>
            Failed
          </span>
        );
      default:
        return null;
    }
  };

  return (
    <div className="dark:bg-gray-950 bg-gray-50 text-gray-800 dark:text-white min-h-screen p-4 sm:p-6">
      {/* Cash Out Modal */}
      {cashOutModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="dark:bg-gray-800 bg-white rounded-lg p-6 w-full max-w-md">
            {cashOutSuccess ? (
              <div className="text-center py-8">
                <div className="w-16 h-16 bg-orange-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <i className="fas fa-check text-white text-2xl"></i>
                </div>
                <h3 className="text-xl font-bold mb-2">Cash Out Successful!</h3>
                <p className="dark:text-gray-400 text-gray-600 mb-6">Your payment of ${cashOutAmount} is being processed.</p>
                <button
                  onClick={() => setCashOutModalOpen(false)}
                  className="bg-orange-600 hover:bg-orange-700 transition-all px-6 py-2 rounded-lg text-white"
                >
                  Close
                </button>
              </div>
            ) : (
              <>
                <h3 className="text-xl font-bold mb-4">Cash Out</h3>
                <div className="mb-4">
                  <label className="block text-sm font-medium mb-2 dark:text-gray-300 text-gray-700">Amount</label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">₹</span>
                    <input
                      type="number"
                      value={cashOutAmount}
                      onChange={(e) => setCashOutAmount(e.target.value)}
                      className="w-full dark:bg-gray-700 bg-gray-100 border dark:border-gray-600 border-gray-300 rounded-lg pl-8 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-white"
                    />
                  </div>
                  <p className="text-xs mt-1 dark:text-gray-400 text-gray-500">
                    Available: ₹{availableForCashOut.toFixed(2)}
                  </p>
                </div>
                
                <div className="mb-6">
                  <label className="block text-sm font-medium mb-2 dark:text-gray-300 text-gray-700">Payment Method</label>
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      onClick={() => setCashOutMethod('bank')}
                      className={`p-3 rounded-lg border ${cashOutMethod === 'bank' ? 'border-white bg-orange-600' : 'dark:border-gray-600 border-gray-300'} flex items-center gap-2`}
                    >
                      <i className="fas fa-university text-lg"></i>
                      <span>Bank Transfer</span>
                    </button>
                    <button
                      onClick={() => setCashOutMethod('paypal')}
                      className={`p-3 rounded-lg border ${cashOutMethod === 'paypal' ? 'border-white bg-orange-600' : 'dark:border-gray-600 border-gray-300'} flex items-center gap-2`}
                    >
                     <i className="fas fa-wallet text-lg text-blue-500"></i>
                      <span>Razorpay</span>
                    </button>
                  </div>
                </div>
                
                <div className="flex justify-end gap-3">
                  <button
                    onClick={() => setCashOutModalOpen(false)}
                    className="px-4 py-2 rounded-lg border dark:border-gray-600 border-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={submitCashOut}
                    disabled={cashOutLoading || parseFloat(cashOutAmount) > availableForCashOut}
                    className="bg-orange-600 hover:bg-orange-700 transition-all px-6 py-2 rounded-lg text-white disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                  >
                    {cashOutLoading ? (
                      <>
                        <i className="fas fa-spinner fa-spin"></i>
                        Processing...
                      </>
                    ) : (
                      <>
                        <i className="fas fa-credit-card"></i>
                        Confirm Cash Out
                      </>
                    )}
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
      
      <div className="mb-6 sm:mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold mb-1 sm:mb-2">Earnings</h1>
        <p className="dark:text-gray-400 text-gray-600">Track your performance and income</p>
      </div>

      {/* Filter + Action */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 sm:mb-8 gap-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 w-full sm:w-auto">
          <div className="flex items-center gap-3 w-full sm:w-auto">
            <i className="fas fa-calendar-alt text-orange-600 text-lg sm:text-xl"></i>
            <select
              value={timeFrame}
              onChange={(e) => handleTimeFrameChange(e.target.value)}
              className="dark:bg-gray-800 bg-white dark:border-gray-700 border-gray-200 rounded-lg px-3 sm:px-4 py-2 focus:outline-none text-sm hover:dark:bg-gray-700 hover:bg-gray-50 transition-colors cursor-pointer w-full sm:w-auto"
            >
              {timeFrameOptions.map((opt) => (
                <option key={opt.value} value={opt.value}>{opt.label}</option>
              ))}
            </select>
          </div>
          
          {timeFrame === 'custom' && (
            <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
              <div className="w-full sm:w-auto">
                <DatePicker
                  selected={startDate}
                  onChange={handleStartDateChange}
                  selectsStart
                  startDate={startDate}
                  endDate={endDate}
                  placeholderText="Start Date"
                  className="dark:bg-gray-800 bg-white dark:border-gray-700 border-gray-200 rounded-lg px-3 sm:px-4 py-2 focus:outline-none text-sm hover:dark:bg-gray-700 hover:bg-gray-50 transition-colors cursor-pointer w-full"
                  dateFormat="d MMM , yyyy"
                />
              </div>
              <div className="w-full sm:w-auto">
                <DatePicker
                  selected={endDate}
                  onChange={handleEndDateChange}
                  selectsEnd
                  startDate={startDate}
                  endDate={endDate}
                  minDate={startDate}
                  placeholderText="End Date"
                  className="dark:bg-gray-800 bg-white dark:border-gray-700 border-gray-200 rounded-lg px-3 sm:px-4 py-2 focus:outline-none text-sm hover:dark:bg-gray-700 hover:bg-gray-50 transition-colors cursor-pointer w-full"
                  dateFormat="d MMM , yyyy"
                />
              </div>
            </div>
          )}
        </div>
        <button 
          onClick={handleCashOut}
          className="bg-orange-600 hover:bg-orange-700 transition-all px-4 py-2 rounded-lg text-white text-sm flex items-center gap-2 hover:shadow-lg hover:shadow-green-600/20 w-full sm:w-auto justify-center"
        >
          <i className="fas fa-credit-card"></i>
          Cash Out
        </button>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 mb-6 sm:mb-8">
        <div className="dark:bg-gray-200/10 bg-white p-4 sm:p-6 rounded-lg hover:dark:bg-gray-200/15 hover:bg-gray-50 transition-all hover:shadow-lg dark:hover:shadow-gray-200/5 hover:shadow-gray-200/20">
          <div className="flex items-center gap-2 mb-2 sm:mb-3">
            <div className="bg-orange-600 p-2 rounded-full">
              <i className="fas fa-money-bill-wave text-white text-lg"></i>
            </div>
            <span className="text-sm dark:text-gray-400 text-gray-600">Total Earnings</span>
          </div>
          <div className="text-xl sm:text-2xl font-bold mb-1">₹{totalEarnings.toFixed(2)}</div>
          <div className="text-xs dark:text-gray-500 text-gray-400">From {totalRides} trips</div>
        </div>

        <div className="dark:bg-gray-200/10 bg-white p-4 sm:p-6 rounded-lg hover:dark:bg-gray-200/15 hover:bg-gray-50 transition-all hover:shadow-lg dark:hover:shadow-gray-200/5 hover:shadow-gray-200/20">
          <div className="flex items-center gap-2 mb-2 sm:mb-3">
            <div className="bg-blue-400/20 p-2 rounded-full">
              <i className="fas fa-wallet text-blue-400 text-lg"></i>
            </div>
            <span className="text-sm dark:text-gray-400 text-gray-600">Available for Cashout</span>
          </div>
          <div className="text-xl sm:text-2xl font-bold mb-1">₹{availableForCashOut.toFixed(2)}</div>
          <div className="text-xs text-orange-600 flex items-center gap-1">
            <i className="fas fa-bolt"></i>
            Instant transfer available
          </div>
        </div>

        <div className="dark:bg-gray-200/10 bg-white p-4 sm:p-6 rounded-lg hover:dark:bg-gray-200/15 hover:bg-gray-50 transition-all hover:shadow-lg dark:hover:shadow-gray-200/5 hover:shadow-gray-200/20">
          <div className="flex items-center gap-2 mb-2 sm:mb-3">
            <div className="bg-yellow-400/20 p-2 rounded-full">
              <i className="fas fa-chart-line text-yellow-400 text-lg"></i>
            </div>
            <span className="text-sm dark:text-gray-400 text-gray-600">Avg Per Trip</span>
          </div>
          <div className="text-xl sm:text-2xl font-bold mb-1">₹{avgPerRide.toFixed(2)}</div>
          <div className="text-xs dark:text-gray-500 text-gray-400 flex items-center gap-1">
            <i className="fas fa-arrow-up text-orange-600"></i>
            +5% from last {timeFrame}
          </div>
        </div>
      </div>

      {/* Chart Area */}
      <div className="dark:bg-gray-200/10 bg-white p-4 sm:p-6 rounded-lg mb-6 sm:mb-8 hover:shadow-sm dark:hover:shadow-gray-200/5 hover:shadow-gray-200/10 transition-all">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 sm:mb-6 gap-2">
          <h3 className="font-semibold text-lg">Earnings Breakdown</h3>
          <div className="flex items-center gap-2">
            <span className="text-sm dark:text-gray-400 text-gray-600 dark:bg-gray-800 bg-gray-100 px-3 py-1 rounded-full">
              {customRangeSelected ? 
                `${startDate?.toLocaleDateString()} - ${endDate?.toLocaleDateString()}` : 
                timeFrameOptions.find(t => t.value === timeFrame)?.label}
            </span>
          </div>
        </div>

        <div className="w-full h-[250px] sm:h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={currentData.labels.map((label, idx) => ({
                name: label,
                earnings: currentData.earnings[idx],
                rides: currentData.rides[idx]
              }))}
              margin={{ top: 10, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid 
                strokeDasharray="3 3" 
                strokeOpacity={0.3} 
                vertical={false}
                stroke={window.matchMedia('(prefers-color-scheme: dark)').matches ? '#2d2d2d' : '#e5e7eb'}
              />
              <XAxis 
                dataKey="name" 
                stroke={window.matchMedia('(prefers-color-scheme: dark)').matches ? '#aaa' : '#6b7280'} 
                tickMargin={10}
              />
              <YAxis 
                stroke={window.matchMedia('(prefers-color-scheme: dark)').matches ? '#aaa' : '#6b7280'} 
                tickFormatter={(value) => `₹${value}`}
                tickMargin={10}
              />
              <Tooltip
                contentStyle={{ 
                  backgroundColor: window.matchMedia('(prefers-color-scheme: dark)').matches ? '#111827' : '#ffffff',
                  border: 'none', 
                  borderRadius: '6px',
                  boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
                }}
                labelStyle={{ 
                  color: window.matchMedia('(prefers-color-scheme: dark)').matches ? '#ccc' : '#4b5563',
                  fontWeight: 'bold'
                }}
                itemStyle={{
                  color: window.matchMedia('(prefers-color-scheme: dark)').matches ? '#fff' : '#111827'
                }}
                formatter={(value, name) => {
                  if (name === 'earnings') return [`₹${value}`, 'Earnings']
                  if (name === 'rides') return [`${value} rides`, 'Trips']
                  return [value, name]
                }}
              />
              <Bar
                dataKey="earnings"
                fill="orange"
                radius={[4, 4, 0, 0]}
                onMouseEnter={(_, index) => setHoveredBar(index)}
                onMouseLeave={() => setHoveredBar(null)}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Payouts Table */}
      <div className="dark:bg-gray-200/10 bg-white p-4 sm:p-6 rounded-lg hover:shadow-lg dark:hover:shadow-gray-200/5 hover:shadow-gray-200/10 transition-all">
        <h3 className="text-lg font-semibold mb-4 sm:mb-6">Recent Payouts</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left border-b dark:border-gray-800 border-gray-200">
                <th className="pb-3 dark:text-gray-400 text-gray-600 font-medium">Date</th>
                <th className="pb-3 dark:text-gray-400 text-gray-600 font-medium">Amount</th>
                <th className="pb-3 dark:text-gray-400 text-gray-600 font-medium">Method</th>
                <th className="pb-3 dark:text-gray-400 text-gray-600 font-medium">Status</th>
              </tr>
            </thead>
            <tbody>
              {(showAllPayouts ? payoutHistory : payoutHistory.slice(0, 3)).map((row) => (
                <tr 
                  key={row.id} 
                  className="border-b dark:border-gray-800 border-gray-200 hover:dark:bg-gray-800/50 hover:bg-gray-50 transition-colors"
                >
                  <td className="py-3 sm:py-4">{row.date}</td>
                  <td className="py-3 sm:py-4 font-medium">₹{row.amount.toFixed(2)}</td>
                  <td className="py-3 sm:py-4">{row.method}</td>
                  <td className="py-3 sm:py-4">
                    {getStatusBadge(row.status)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="mt-3 sm:mt-4 text-right">
          <button 
            onClick={() => setShowAllPayouts(!showAllPayouts)}
            className="text-sm dark:text-gray-400 text-gray-600 hover:dark:text-white hover:text-gray-800 transition-colors flex items-center gap-1 ml-auto"
          >
            {showAllPayouts ? 'Show less' : 'View all payouts'} <i className={`fas fa-chevron-${showAllPayouts ? 'up' : 'right'} text-xs`}></i>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Earnings;