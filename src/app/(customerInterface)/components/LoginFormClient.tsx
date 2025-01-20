/*
file that uses shadcn login functionality for our admin users
*/

"use client"
import { useState } from 'react';
import { useForm, SubmitHandler, FormProvider } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { FormField, FormControl, FormErrorMessage, FormItem, FormLabel } from '@/components/ui/form';

type FormValues = {
  username: string;
  password: string;
};

export default function LoginFormClient() {
  const methods = useForm<FormValues>();
  const { handleSubmit, control, formState: { errors } } = methods;
  const [error, setError] = useState('');
  const [mode, setMode] = useState('login'); // 'login' or 'signup'

  const onSubmit: SubmitHandler<FormValues> = data => {
    if (mode === 'login') {
      // Add your login logic here
      if (data.username === 'admin' && data.password === 'password') {
        // Redirect to admin dashboard
        window.location.href = '/';
      } else {
        setError('Invalid credentials');
      }
    } else {
      // Add your sign-up logic here
      if (data.username && data.password) {
        // Create new user and redirect to dashboard
        window.location.href = '/dashboard';
      } else {
        setError('Invalid credentials');
      }
    }
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormField
          name="username"
          control={control}
          render={({ field }) => (
            <FormItem>
              <FormLabel htmlFor="username">Username</FormLabel>
              <FormControl>
                <Input
                  type="text"
                  id="username"
                  {...field}
                  required
                />
              </FormControl>
              {errors.username && <FormErrorMessage message={errors.username.message || 'Username is required'} />}
              {error && <FormErrorMessage message={error} />}
            </FormItem>
          )}
        />
        <FormField
          name="password"
          control={control}
          render={({ field }) => (
            <FormItem>
              <FormLabel htmlFor="password">Password</FormLabel>
              <FormControl>
                <Input
                  type="password"
                  id="password"
                  {...field}
                  required
                />
              </FormControl>
              {errors.password && <FormErrorMessage message={errors.password.message || 'Password is required'} />}
              {error && <FormErrorMessage message={error} />}
            </FormItem>
          )}
        />
        <Button className="mt-4 bg-orange-800" type="submit">Login</Button>
        <Button onClick={() => setMode('signup')} className="bg-orange-800 ml-8">Sign Up</Button>
      </form>
    </FormProvider>
  );
}
