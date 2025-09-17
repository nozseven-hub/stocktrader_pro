import React, { useState } from 'react';
import { User, Mail, Phone, CreditCard, Calendar, Shield } from 'lucide-react';

const AccountSettings = ({ onChange }) => {
  const [profile, setProfile] = useState({
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@example.com',
    phone: '+1 (555) 123-4567',
    timezone: 'America/New_York',
    language: 'en',
    avatar: null
  });

  const [subscription, setSubscription] = useState({
    plan: 'Pro',
    status: 'Active',
    nextBilling: '2025-01-17',
    amount: '$29.99',
    paymentMethod: '**** **** **** 4532'
  });

  const [billingHistory] = useState([
    { date: '2024-12-17', amount: '$29.99', status: 'Paid', invoice: 'INV-001' },
    { date: '2024-11-17', amount: '$29.99', status: 'Paid', invoice: 'INV-002' },
    { date: '2024-10-17', amount: '$29.99', status: 'Paid', invoice: 'INV-003' }
  ]);

  const handleProfileChange = (field, value) => {
    setProfile(prev => ({
      ...prev,
      [field]: value
    }));
    onChange();
  };

  const handlePasswordChange = () => {
    // Handle password change
    console.log('Opening password change dialog');
  };

  const handlePlanChange = (newPlan) => {
    setSubscription(prev => ({
      ...prev,
      plan: newPlan
    }));
    onChange();
  };

  const plans = [
    {
      name: 'Basic',
      price: '$9.99',
      features: ['Basic pattern detection', 'Email alerts', '5 watchlists']
    },
    {
      name: 'Pro',
      price: '$29.99',
      features: ['Advanced patterns', 'Real-time alerts', 'Unlimited watchlists', 'Custom reports']
    },
    {
      name: 'Premium',
      price: '$59.99',
      features: ['All Pro features', 'API access', 'Priority support', 'Advanced analytics']
    }
  ];

  return (
    <div className="p-6 space-y-8">
      <div className="border-b pb-4">
        <h3 className="text-lg font-semibold flex items-center">
          <User className="h-5 w-5 mr-2 text-blue-600" />
          Account Settings
        </h3>
        <p className="text-gray-600 text-sm mt-1">
          Manage your profile information, subscription, and billing details
        </p>
      </div>
      {/* Profile Information */}
      <div>
        <h4 className="text-md font-medium mb-4">Profile Information</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              First Name
            </label>
            <input
              type="text"
              value={profile?.firstName}
              onChange={(e) => handleProfileChange('firstName', e?.target?.value)}
              className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Last Name
            </label>
            <input
              type="text"
              value={profile?.lastName}
              onChange={(e) => handleProfileChange('lastName', e?.target?.value)}
              className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <Mail className="h-4 w-4 inline mr-1" />
              Email Address
            </label>
            <input
              type="email"
              value={profile?.email}
              onChange={(e) => handleProfileChange('email', e?.target?.value)}
              className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <Phone className="h-4 w-4 inline mr-1" />
              Phone Number
            </label>
            <input
              type="tel"
              value={profile?.phone}
              onChange={(e) => handleProfileChange('phone', e?.target?.value)}
              className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Timezone
            </label>
            <select
              value={profile?.timezone}
              onChange={(e) => handleProfileChange('timezone', e?.target?.value)}
              className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="America/New_York">Eastern Time (EST)</option>
              <option value="America/Chicago">Central Time (CST)</option>
              <option value="America/Denver">Mountain Time (MST)</option>
              <option value="America/Los_Angeles">Pacific Time (PST)</option>
              <option value="Europe/London">London (GMT)</option>
              <option value="Europe/Paris">Paris (CET)</option>
              <option value="Asia/Tokyo">Tokyo (JST)</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Language
            </label>
            <select
              value={profile?.language}
              onChange={(e) => handleProfileChange('language', e?.target?.value)}
              className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="en">English</option>
              <option value="es">Spanish</option>
              <option value="fr">French</option>
              <option value="de">German</option>
              <option value="ja">Japanese</option>
              <option value="zh">Chinese</option>
            </select>
          </div>
        </div>

        {/* Password Change */}
        <div className="mt-6 p-4 border rounded-lg bg-gray-50">
          <h5 className="font-medium mb-2 flex items-center">
            <Shield className="h-4 w-4 mr-2" />
            Password & Security
          </h5>
          <p className="text-sm text-gray-600 mb-4">
            Last changed: December 1, 2024
          </p>
          <button
            onClick={handlePasswordChange}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Change Password
          </button>
        </div>
      </div>
      {/* Subscription Management */}
      <div>
        <h4 className="text-md font-medium mb-4 flex items-center">
          <CreditCard className="h-4 w-4 mr-2" />
          Subscription Management
        </h4>
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
          <div className="flex justify-between items-start">
            <div>
              <h5 className="font-medium text-blue-900">{subscription?.plan} Plan</h5>
              <p className="text-sm text-blue-700">Status: {subscription?.status}</p>
              <p className="text-sm text-blue-700">
                Next billing: {subscription?.nextBilling} ({subscription?.amount})
              </p>
            </div>
            <span className="text-lg font-bold text-blue-900">{subscription?.amount}/month</span>
          </div>
        </div>

        {/* Plan Options */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          {plans?.map((plan) => (
            <div
              key={plan?.name}
              className={`p-4 rounded-lg border-2 ${
                subscription?.plan === plan?.name
                  ? 'border-blue-600 bg-blue-50' :'border-gray-200 hover:border-gray-300'
              }`}
            >
              <h6 className="font-medium">{plan?.name}</h6>
              <p className="text-lg font-bold text-blue-600 my-2">{plan?.price}<span className="text-sm text-gray-500">/month</span></p>
              <ul className="space-y-1 text-sm text-gray-600">
                {plan?.features?.map((feature, index) => (
                  <li key={index}>• {feature}</li>
                ))}
              </ul>
              {subscription?.plan !== plan?.name && (
                <button
                  onClick={() => handlePlanChange(plan?.name)}
                  className="w-full mt-3 px-3 py-2 text-sm bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                  Upgrade
                </button>
              )}
            </div>
          ))}
        </div>

        {/* Payment Method */}
        <div className="p-4 border rounded-lg">
          <h5 className="font-medium mb-2">Payment Method</h5>
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600">
              Credit Card ending in {subscription?.paymentMethod?.slice(-4)}
            </span>
            <button className="text-sm text-blue-600 hover:text-blue-700">
              Update Payment Method
            </button>
          </div>
        </div>
      </div>
      {/* Billing History */}
      <div>
        <h4 className="text-md font-medium mb-4 flex items-center">
          <Calendar className="h-4 w-4 mr-2" />
          Billing History
        </h4>
        <div className="overflow-x-auto">
          <table className="w-full border rounded-lg">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Date</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Amount</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Status</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Invoice</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {billingHistory?.map((record, index) => (
                <tr key={index}>
                  <td className="px-4 py-3 text-sm text-gray-900">{record?.date}</td>
                  <td className="px-4 py-3 text-sm text-gray-900">{record?.amount}</td>
                  <td className="px-4 py-3">
                    <span className="px-2 py-1 text-xs font-medium bg-green-100 text-green-800 rounded">
                      {record?.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-sm">
                    <button className="text-blue-600 hover:text-blue-700">
                      {record?.invoice}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AccountSettings;