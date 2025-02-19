import Link from 'next/link';

const SignUp = () => {
  return (
    <div className="relative h-screen flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0">
      {/* Signup Section */}
      <div className="relative hidden h-full flex-col bg-muted p-10 text-white lg:flex dark:border-r">
        <div className="absolute inset-0 bg-zinc-900" />
        <div className="relative z-20 flex flex-col items-center justify-center h-full text-lg font-medium">
          <h2 className="text-2xl font-semibold mb-4">Welcome!!</h2>
          <p className="text-sm text-muted-foreground mb-6">
            Sign in to create a account as a user.
          </p>
          {/* signup Form */}
          <form className="w-full max-w-sm space-y-4">
            <input 
              type="email" 
              placeholder="Email" 
              className="w-full p-2 rounded bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input 
              type="password" 
              placeholder="Password" 
              className="w-full p-2 rounded bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button className="w-full p-2 bg-blue-600 rounded hover:bg-blue-700">Sign In</button>
          </form>
          <p className="text-sm mt-4">
            already have an account?{' '}
            <Link href="/login" className="underline text-blue-400">      
              Log In
            </Link>
          </p>
        </div>
      </div>
      
      {/* Signup Section */}
      <div className="flex h-full items-center p-4 lg:p-8">
        <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
          <div className="flex flex-col space-y-2 text-center">
            <h1 className="text-2xl font-semibold tracking-tight">
              Create an account as a Creater!!
            </h1>
            <p className="text-sm text-muted-foreground">
              Enter your email below to create your account
            </p>
          </div>
          <form className="w-full max-w-sm space-y-4">
            <input 
              type="email" 
              placeholder="Email" 
              className="w-full p-2 rounded bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input 
              type="password" 
              placeholder="Password" 
              className="w-full p-2 rounded bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button className="w-full p-2 bg-blue-600 rounded hover:bg-blue-700">Sign In</button>
          </form>
          <p className="px-8 text-center text-sm text-muted-foreground">
            already have an account?{' '}
            <Link href="/login" className="underline text-blue-400">      
              Log In
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
