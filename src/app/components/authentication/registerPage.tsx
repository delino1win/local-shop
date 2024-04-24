"use client";
import Link from "next/link";
import React, { useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

const RegisterPage = () => {
  const [firstName, setFirstName] = useState<User["firstName"]>("");
  const [lastName, setLastName] = useState<User["lastName"]>("");
  const [email, setEmail] = useState<User["email"]>("");
  const [username, setUsername] = useState<User["username"]>("");
  const [phoneNumber, setPhoneNumber] = useState<User["phoneNumber"]>();
  const [address, setAddress] = useState<User["address"]>("");
  const [password, setPassword] = useState<User["password"]>("");
  const [confPass, setConfPass] = useState<User["password"]>("");
  const [userRole, setRole] = useState<User["userRole"]>("");
  const [errors, setErrors] = useState<Record<string, string>>({});

  const [isPending, setIsPending] = useState<boolean>(false)

  const { data: session } = useSession();
  const route = useRouter();

  const handler = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // if (confPass !== password) {
    //   alert("Password = Conf");
    //   return;
    // }

    // if (!userRole) {
    //   alert("Role cant be empty");
    //   return;
    // }
    setIsPending(true)

    try {
      const res = await fetch("/api/register", {
        method: "POST",
        body: JSON.stringify({
          firstName,
          lastName,
          email,
          username,
          userRole,
          phoneNumber,
          address,
          password,
        }),
      });

      if (!res.ok) {
        setErrors(await res.json());
        console.log(errors)
      } else {
        const data = await res.json();

        route.push(`/registerPage/activation?confirmId=${data.confirmId}`);
      }
    } catch (error) {
      console.log(error);
    }

    setIsPending(false)
  };

  if (session?.user) {
    route.push("/denied");
  }

  return (
    <div className={`flex justify-center max-sm:size-fit max-lg:shrink`}>
      <div className="px-2 mt-20 max-sm:my-8 max-sm:mt-10 rounded-md bg-slate-100">
        <form
          onSubmit={handler}
          className={`${isPending ? 'pointer-events-none' : 'pointer-events-auto'} grid grid-cols-1 gap-1 min-w-[310px] w-[650px] max-sm:w-[320px] max-sm:gap-2 text-lg border-2 p-1 rounded-lg bg-slate-50 shadow-md`}
        >
          <div className="grid grid-cols-2 max-sm:grid-cols-1 bg-transparent py-2 rounded-lg border-2 border-gray-200">
            <div className="grid grid-row-2 ml-2">
              <div className="flex flex-row gap-2 ">
                <label className="font-extrabold text-xs" htmlFor="firstName">
                  First Name
                </label>
                {errors && (
                  <p className="text-xs text-red-400">{errors?.firstName}</p>
                )}
              </div>
              <input
                id="firstName"
                value={firstName}
                onChange={(event) => setFirstName(event.target.value)}
                className="p-1 m-w-[100px] w-[300px] text-sm font-semibold focus:outline-none bg-transparent border-b-2 border-gray-300 focus:border-indigo-400 transition-all duration-300 ease-in-out"
                type="text"
                placeholder="..."
                maxLength={20}
                minLength={2}
                // required
              />
            </div>
            <div className="grid grid-row-2 ml-2">
              <label className="font-extrabold text-xs" htmlFor="lastName">
                Last Name
              </label>
              <input
                id="lastName"
                value={lastName}
                onChange={(event) => setLastName(event.target.value)}
                className="p-1 m-w-[100px] w-[300px] text-sm font-semibold focus:outline-none bg-transparent border-b-2 border-gray-300 focus:border-indigo-400 transition-all duration-300 ease-in-out"
                type="text"
                maxLength={20}
                minLength={2}
                placeholder="..."
              />
            </div>
          </div>

          <div className="grid grid-cols-2 max-sm:grid-cols-1">
            <div>
              <div className="grid grid-rows-2 bg-transparent py-2 rounded-lg border-2 pl-2">
                <div className="flex flex-row gap-2">
                  <label className="font-extrabold text-xs" htmlFor="email">
                    Email
                  </label>
                  {errors && (
                    <p className="text-xs text-red-400">{errors?.email}</p>
                  )}
                </div>
                <input
                  id="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  className="m-w-[100px] w-[96%] text-sm font-semibold focus:outline-none bg-transparent border-b-2 border-gray-300 focus:border-indigo-400 transition-all duration-300 ease-in-out"
                  type="email"
                  placeholder="..."
                  maxLength={32}
                  minLength={10}
                  // required
                />
              </div>

              <div className="grid grid-rows-2 bg-transparent py-2 rounded-lg border-2 pl-2">
                <div className="flex flex-row gap-2">
                  <label className="font-extrabold text-xs" htmlFor="username">
                    Username*
                  </label>
                  {errors && (
                    <p className="text-xs text-red-400">{errors?.username}</p>
                  )}
                </div>
                <input
                  id="username"
                  value={username}
                  onChange={(event) => setUsername(event.target.value)}
                  className="m-w-[100px] w-[96%] text-sm font-semibold focus:outline-none bg-transparent border-b-2 border-gray-300 focus:border-indigo-400 transition-all duration-300 ease-in-out"
                  type="text"
                  placeholder="..."
                  maxLength={20}
                  minLength={4}
                  // required
                />
              </div>
            </div>
            <div className="grid grid-row-2 border-2 border-gray-200 ml-1 p-2 rounded-lg">
              <label className="border-b-2 font-bold text-xs flex justify-center">
                Role*
              </label>
              <div className="flex py-7 justify-evenly rounded-xl font-bold text-xs">
                <div className="flex place-self-center gap-1">
                  <input
                    value="buyer"
                    onChange={(event) => setRole(event.target.value)}
                    id="buyer"
                    type="radio"
                    name="role"
                  />
                  <label>Buyer/Customer</label>
                </div>
                <div className="flex place-self-center gap-1">
                  <input
                    value="seller"
                    onChange={(event) => setRole(event.target.value)}
                    id="seller"
                    type="radio"
                    name="role"
                  />
                  <label>Seller/Merchant</label>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 max-sm:grid-cols-1">
            <div className="grid grid-rows-2 bg-transparent py-2 rounded-lg border-2 pl-2">
              <label className="font-bold text-xs" htmlFor="phoneNumber">
                Phone Number*
              </label>
              <input
                id="phoneNumber"
                value={phoneNumber}
                onChange={(event) => setPhoneNumber(event.target.value)}
                className="m-w-[100px] w-[96%] text-sm font-semibold focus:outline-none bg-transparent border-b-2 border-gray-300 focus:border-indigo-400 transition-all duration-300 ease-in-out"
                type="text"
                // required
                placeholder="+62 or 08 ..."
                maxLength={16}
                minLength={9}
              />
            </div>

            <div className="grid grid-rows-2 bg-transparent py-2 rounded-lg border-2 pl-2 ml-1">
              <label className="font-bold text-xs" htmlFor="address">
                address
              </label>
              <input
                id="address"
                value={address}
                onChange={(event) => setAddress(event.target.value)}
                className="m-w-[100px] w-[96%] text-sm font-semibold focus:outline-none bg-transparent border-b-2 border-gray-300 focus:border-indigo-400 transition-all duration-300 ease-in-out"
                type="text"
                placeholder="..."
                maxLength={64}
              />
            </div>
          </div>

          <div className="grid grid-cols-2">
            <div className="grid grid-rows-2 bg-transparent py-2 rounded-lg border-2 pl-2">
              <label className="font-bold text-xs" htmlFor="password">
                Password*
              </label>
              <input
                id="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                className="m-w-[100px] w-[96%] text-sm font-semibold focus:outline-none bg-transparent border-b-2 border-gray-300 focus:border-indigo-400 transition-all duration-300 ease-in-out"
                type="password"
                // required
                placeholder="****"
                maxLength={50}
                minLength={6}
              />
            </div>

            <div className="grid grid-rows-2 bg-transparent py-2 rounded-lg border-2 pl-2 ml-1">
              <label className="font-bold text-xs" htmlFor="confPassword">
                Confirm Password
              </label>
              <input
                id="confPassword"
                value={confPass}
                onChange={(event) => setConfPass(event.target.value)}
                className="m-w-[100px] w-[96%] text-sm font-semibold focus:outline-none bg-transparent border-b-2 border-gray-300 focus:border-indigo-400 transition-all duration-300 ease-in-out"
                type="password"
                // required
                placeholder="****"
                maxLength={50}
                minLength={6}
              />
            </div>
          </div>

          <button
            type="submit"
            // onClick={() => {
            //   setIsLoading(!isLoading)
            // }}
            // disabled={isLoading}
            disabled={isPending}
            className={`bg-transparent font-semibold border-2 mx-[35%] my-[2%] text-xs py-4 hover:shadow-lg hover:font-extrabold hover:text-base transition-all duration-300 ease-in-out`}
          >
            Sign Up
          </button>
        </form>
        <Link
          className="font-semibold text-xs flex justify-center p-4 hover:font-extrabold transition-all duration-150 ease-in-out"
          href="/api/auth/signin"
        >
          Aready Have an Account? Login Here!
        </Link>
      </div>
    </div>
  );
};

export default RegisterPage;
