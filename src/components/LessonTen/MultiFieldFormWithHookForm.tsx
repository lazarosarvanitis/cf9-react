import {useState} from "react";
import {z} from "zod";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";

const formSchema = z.object({
  name: z.string().trim().min(1, {error: "Name is required"}),
  email: z
    .email()
    .min(1, {error: "Email is required"}),
  message: z
    .string()
    .trim()
    .min(5, {error: "Message must be at least 5 characters long"})
    .min(1, {error: "Message is required"})
    .max(8, {error: "Message must be at most 8 characters long"})
})
type FormValues = z.infer<typeof formSchema>;

const MultiFieldFormWithHookForm = () => {

  const [submittedData, setSubmittedData] = useState<FormValues | null>(null)

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      message: ""
    }
  });

  const onSubmit = (data: FormValues) => {
    setSubmittedData(data)
    reset()
  }

  const onClear = () => {
    setSubmittedData(null)
    reset()
  }

  const watchedValues = watch();


  return (
    <>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="max-w-md mx-auto space-y-4">
        <div>
          <input
            {...register("name")}
            type="text"
            placeholder="Type your Name"
            className="w-full border rounded px-4 py-2"
          />
          {errors.name && (
            <p className="text-cf-dark-red text-sm mt-1">{errors.name.message}</p>
          )}
        </div>
        <div>
          <input
            {...register("email")}
            type="text"
            placeholder="Type your Email"
            className="w-full border rounded px-4 py-2"
          />
          {errors.email && (
          <p className="text-cf-dark-red text-sm mt-1">{errors.email.message}</p>
          )}
        </div>
        <div>
          <textarea
            {...register("message")}
            placeholder="Type your Message"
            className="w-full border rounded px-4 py-2"
          ></textarea>
          {errors.message && (
          <p className="text-cf-dark-red text-sm mt-1">{errors.message.message}</p>
          )}
        </div>

        <div className="flex gap-4">
          <button
            type="submit"
            className="bg-cf-dark-red text-white px-4 py-2 rounded">
            Submit
          </button>
          <button
            onClick={onClear}
            className="bg-cf-dark-gray text-white px-4 py-2 rounded">
            Clear
          </button>
        </div>

      </form>
      {submittedData && (
        <>
        <div className="mt-6 pt-4 max-w-md mx-auto border-t space-y-2">
          <strong>Submitted Data</strong>
          <p><strong>Name:</strong> {submittedData.name}</p>
          <p><strong>Email:</strong> {submittedData.email}</p>
          <p><strong>Message:</strong> {submittedData.message}</p>
        </div>
        </>
      )}

      <div className="mt-6 pt-4 max-w-md mx-auto border-t space-y-2">
        <strong>Watched Data</strong>
        <p><strong>Name:</strong> {watchedValues.name}</p>
        <p><strong>Email:</strong> {watchedValues.email}</p>
        <p><strong>Message:</strong> {watchedValues.message}</p>
      </div>


    </>
  )
}
export default MultiFieldFormWithHookForm;