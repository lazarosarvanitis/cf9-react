import {useState} from "react";

type FormValues = {
  name: string,
  email: string,
  message: string,
}
const initialValues: FormValues = {
  name: "",
  email: "",
  message: "",
}

const MultiFieldForm = () => {
  const [values, setValues] = useState<FormValues>(initialValues);
  const [submittedData, setSubmittedData] = useState<FormValues | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) =>{
    const { name, value } = e.target;
    setValues((prev) => ({ ...prev, [name]: value }));
  }

  const handleClear = () => {
    setValues(initialValues);
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmittedData(values)
    setValues(initialValues)
  }

  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="max-w-md mx-auto space-y-4">
        <input
          type="text"
          name="name"
          value={values.name}
          onChange={handleChange}
          placeholder="Type your Name"
          className="w-full border rounded px-4 py-2"
        />
        <input
          type="email"
          name="email"
          value={values.email}
          onChange={handleChange}
          placeholder="Type your Email"
          className="w-full border rounded px-4 py-2"
        />
        <textarea
          name="message"
          value={values.message}
          onChange={handleChange}
          placeholder="Type your Message"
          className="w-full border rounded px-4 py-2"
          minLength={5}
        ></textarea>

        <div className="flex gap-4">
          <button
            type="submit"
            className="bg-cf-dark-red text-white px-4 py-2 rounded">
            Submit
          </button>
          <button
            onClick={handleClear}
            className="bg-cf-dark-gray text-white px-4 py-2 rounded">
            Clear
          </button>
        </div>

      </form>
      {submittedData && (
        <>
        <div className="mt-6 pt-4 max-w-md mx-auto border-t space-y-2">
          <p><strong>Name:</strong> {submittedData.name}</p>
          <p><strong>Email:</strong> {submittedData.email}</p>
          <p><strong>Message:</strong> {submittedData.message}</p>
        </div>
        </>
      )}
    </>
  )
}
export default MultiFieldForm;