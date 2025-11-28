import { Button } from "@/components/ui/button";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";

import { useForm } from "react-hook-form";
import { Form } from "@/components/ui/form";

const Account = () => {
  const form = useForm({
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
    },
  });

  const onSubmit = (values: { firstName: string; lastName: string; email: string }) => {
    console.log("Form submitted:", values);
  };

  return (
    <div className="flex flex-col gap-16">

      {/* Page Header */}
      <div className="pb-6 border-b border-gray-300">
        <h2 className="text-3xl font-extrabold">Account Settings</h2>
        <p className="text-base text-gray-600 dark:text-gray-500 mt-2">
          Manage your account information, avatar, and email settings.
        </p>
      </div>

      {/* Information Section */}
      <div className="flex flex-col md:flex-row gap-10 items-start border-b border-gray-300 pb-10">

        {/* Left Label Column */}
        <div className="w-full md:w-64">
          <h3 className="font-extrabold text-lg">Information</h3>
          <p className="text-sm font-light mt-1">
            Use an address where you can receive mail.
          </p>
        </div>

        {/* Right Content */}
        <div className="flex flex-col gap-10 w-full max-w-xl">

          {/* Avatar Row */}
          <div className="flex flex-row gap-8 items-center">
            <Avatar>
              <AvatarImage
                src="https://github.com/shadcn.png"
                alt="@shadcn"
                className="rounded-xl w-28 h-28"
              />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>

            <div className="flex flex-col gap-2 items-start">
              <Button
                className="
                  px-8 py-3 font-extrabold border-2 border-violet-400
                  transition-all duration-200
                  hover:bg-violet-100
                  hover:dark:bg-violet-700/50
                  hover:border-violet-500
                  hover:scale-[1.02]
                  active:scale-[0.98]
                "
              >
                Change avatar
              </Button>
              <p className="text-xs font-light">JPG, GIF or PNG. 1MB max.</p>
            </div>
          </div>

          {/* Form */}
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 w-full max-w-xl">

              {/* 2 column grid on desktop */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                {/* First Name */}
                <FormField
                  control={form.control}
                  name="firstName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>First Name</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="John"
                          className="h-11 bg-gray-100 dark:bg-gray-700 border border-violet-400 focus:ring-2 focus:ring-violet-400"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Last Name */}
                <FormField
                  control={form.control}
                  name="lastName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Last Name</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="Doe"
                          className="h-11 bg-gray-100 dark:bg-gray-700 border border-violet-400 focus:ring-2 focus:ring-violet-400"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Email (full-width on desktop) */}
                <div className="md:col-span-2">
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            placeholder="example@mail.com"
                            className="h-11 bg-gray-100 dark:bg-gray-700 border border-violet-400 focus:ring-2 focus:ring-violet-400"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

              </div>

              <Button
                type="submit"
                className="
                  bg-violet-400 text-white font-extrabold px-8 py-3
                  transition-all duration-200
                  hover:bg-violet-500
                  hover:shadow-md
                  hover:scale-[1.02]
                  active:scale-[0.98]
                "
              >
                Save
              </Button>
            </form>
          </Form>
        </div>
      </div>

      {/* Delete Account Section */}
      <div className="flex flex-col md:flex-row gap-10 items-start">
        <div className="w-full md:w-64">
          <h3 className="font-extrabold text-lg">Delete account</h3>
          <p className="text-sm font-light max-w-xs">
            No longer want to use our service? This action is permanent and cannot be undone.
          </p>
        </div>

        <Button
          className="
            bg-violet-400 text-white font-extrabold w-full md:w-56 py-3
            transition-all duration-200
            hover:bg-red-500
            hover:shadow-md
            hover:scale-[1.02]
            active:scale-[0.98]
          "
        >
          Delete my account
        </Button>
      </div>

    </div>
  )
}

export default Account;
