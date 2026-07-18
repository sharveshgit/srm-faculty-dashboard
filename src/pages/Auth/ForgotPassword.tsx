import React from 'react'
import { Link } from 'react-router-dom'

const ForgotPassword: React.FC = () => {
  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-xl rounded-3xl bg-white shadow-xl overflow-hidden">
        <div className="p-10">
          <h1 className="text-3xl font-semibold text-slate-900">Forgot Password</h1>
          <p className="mt-4 text-slate-600">
            If you forgot your password, please contact your college administration or use the email password for your NetID.
          </p>
          <div className="mt-8 rounded-2xl border border-slate-200 bg-slate-50 p-6">
            <p className="text-sm text-slate-700">NetID examples:</p>
            <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-slate-600">
              <li>Your mail id is <span className="font-medium">abcd@srmist.edu.in</span>, then your NetID is <span className="font-medium">abcd</span>.</li>
            </ul>
          </div>
          <div className="mt-8 flex justify-between items-center">
            <Link to="/login" className="text-sm text-slate-700 hover:text-slate-900">
              Back to login
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ForgotPassword
