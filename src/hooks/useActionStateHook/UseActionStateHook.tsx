import { useActionState } from "react";

type DataType = { message?: string; error?: string };

async function saveData(
  prevState: unknown,
  formData: FormData,
): Promise<DataType> {
  await wait(3000);
  const { firstName } = Object.fromEntries(formData.entries()) as {
    firstName: string;
  };

  formData.set("firstName", "");

  if (!firstName.trim()) {
    return Promise.resolve({ error: "Value is empty" });
  }
  return Promise.resolve({ message: "Value is correct" });
}

function wait(duration: number): Promise<unknown> {
  return new Promise((resolve) => setTimeout(resolve, duration));
}

const UseActionStateHook: React.FC = () => {
  const [data, action, isPending] = useActionState(saveData, undefined);

  return (
    <>
      <form action={action}>
        <div className="input-group">
          <label htmlFor="firstName">
            FirstName : <input type="text" name="firstName" id="firstName" />
          </label>
        </div>
        <button type="submit" disabled={isPending}>
          Submit
        </button>
      </form>
      <div>
        {data?.message && <p style={{ color: "green" }}>{data?.message}</p>}
        {data?.error && <p style={{ color: "red" }}>{data?.error}</p>}
      </div>
    </>
  );
};

export default UseActionStateHook;
