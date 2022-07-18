import { NextPage } from 'next';
import { SubmitHandler, useForm } from 'react-hook-form';
import Input from '../../components/small/Input';
import { useAuth } from '../../context/AuthContext';

interface InputFields {
  password: string;
  username: string;
}

const LoginPage: NextPage = () => {
  const { logIn, user } = useAuth();
  const { register, handleSubmit } = useForm<InputFields>();
  const onSubmit: SubmitHandler<InputFields> = data => {
    logIn(data.username, data.password);
  };

  const Inputs = (['username', 'password'] as (keyof InputFields)[]).map(
    name => (
      <Input placeholder={name} register={() => register(name)} key={name} />
    )
  );

  return (
    <main className="flex h-full w-full items-center justify-center">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col space-y-4 rounded-md bg-gray-600 p-12"
      >
        <h2 className="text-2xl text-[#e2e2e2]">Log In</h2>
        {Inputs}
        <button type="submit" className="flex-start w-16 rounded bg-[#E50914]">
          Log In
        </button>
      </form>
    </main>
  );
};

export default LoginPage;
