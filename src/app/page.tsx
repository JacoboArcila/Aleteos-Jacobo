"use client";
interface UserData {
  username: string;
  email: string;
  password: string;
  role: string;
  createdAt: Date;
}

export default function Home() {
  const createUser = async (userData: UserData) => {
    try {
      const response = await fetch("http://localhost:5000/api/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });

      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error creating user:", error);
    }
  };

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <button
        onClick={() =>
          createUser({
            username: "Jacobo",
            email: "Jacobo@example.com",
            password: "password1",
            role: "admin",
            createdAt: new Date(),
          })
        }>
        Create User
      </button>
    </div>
  );
}
