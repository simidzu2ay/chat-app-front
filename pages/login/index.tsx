import { NextPage } from 'next';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useAuth } from '../../context/AuthContext';

interface Input {
  password: string;
  username: string;
}

const LoginPage: NextPage = () => {
  const { logIn, user } = useAuth();
  const { register, handleSubmit } = useForm<Input>();
  const onSubmit: SubmitHandler<Input> = data => {
    logIn(data.username, data.password);
    console.log(user);
  };

  return (
    <>
      <main className="flex h-[100%] w-[100%] items-center justify-center">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col space-y-4 rounded-md bg-gray-600 p-12"
        >
          <h2 className="text-2xl text-[#e2e2e2]">Log In</h2>
          <input
            type="text"
            placeholder="Username"
            className="login_input"
            {...register('username')}
          />
          <input
            type="password"
            placeholder="Password"
            className="login_input"
            {...register('password')}
          />
          <button
            type="submit"
            className="flex-start w-16 rounded bg-[#E50914]"
          >
            Log In
          </button>
        </form>
      </main>
    </>
  );
};

export default LoginPage;
