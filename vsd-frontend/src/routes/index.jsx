import { Routes, Route, Navigate } from 'react-router-dom'

import {
  ForgotPassword,
  ResetPassword,
  SignIn,
  SignUp,
  Dashboard,
  Profile,
  Lists,
  Heroes,
  Hero,
  ListDetails,
} from '../pages'

import { Layout } from '../shared/components/layout'
import { PrivateRoutes } from './PrivateRoutes'

export const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<SignIn />} />
      <Route path="/sign-up" element={<SignUp />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/reset-password/:token" element={<ResetPassword />} />

      <Route element={<PrivateRoutes />}>
        <Route
          path="/home"
          element={
            <Layout>
              <Dashboard />
            </Layout>
          }
        />

        <Route
          path="/profile"
          element={
            <Layout>
              <Profile />
            </Layout>
          }
        />

        <Route
          path="/lists"
          element={
            <Layout>
              <Lists />
            </Layout>
          }
        />

        <Route
          path="/heroes"
          element={
            <Layout>
              <Heroes />
            </Layout>
          }
        />
      </Route>

      <Route
        path="/heroes/details/:heroId"
        element={
          <Layout>
            <Hero />
          </Layout>
        }
      />

      <Route
        path="/lists/details/:id"
        element={
          <Layout>
            <ListDetails />
          </Layout>
        }
      />

      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  )
}
