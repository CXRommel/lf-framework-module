import { useMemo, useState } from "react";

const DEFAULT_USER = {
  id: 1,
  name: "Rommel",
  countryId: 3,
  position: "Developer",
  description: "UI Developer",
  avatar: "https://api.dicebear.com/9.x/adventurer/svg?seed=Rommel",
  email: "rommel@example.com",
  phone: "123-456-7890",
};

export const UserForm = ({
  countries = [],
  initialValue = DEFAULT_USER,
  onSubmit,
}) => {
  const [form, setForm] = useState(initialValue);

  const countryOptions = useMemo(() => {
    if (!Array.isArray(countries)) return [];
    return countries;
  }, [countries]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => {
      if (name === "id" || name === "countryId") {
        return { ...prev, [name]: value === "" ? "" : Number(value) };
      }
      return { ...prev, [name]: value };
    });
  };

  const handleReset = () => {
    setForm(initialValue);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    onSubmit?.(form);
  };

  const countrySelectValue = countryOptions.length === 0 ? "" : form.countryId;

  return (
    <form onSubmit={handleSubmit} className="mb-6">
      <fieldset className="fieldset bg-base-200 border-base-300 rounded-box border p-4">
        <legend className="fieldset-legend">User</legend>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="md:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="label">Id</label>
              <input
                type="number"
                className="input input-bordered w-full"
                name="id"
                value={form.id}
                onChange={handleChange}
                min={1}
              />
            </div>

            <div>
              <label className="label">Country</label>
              <select
                className="select select-bordered w-full"
                name="countryId"
                value={countrySelectValue}
                onChange={handleChange}
                disabled={countryOptions.length === 0}
              >
                {countryOptions.length === 0 ? (
                  <option value="">Loading countries…</option>
                ) : (
                  countryOptions.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.name}
                    </option>
                  ))
                )}
              </select>
            </div>

            <div className="md:col-span-2">
              <label className="label">Name</label>
              <input
                type="text"
                className="input input-bordered w-full"
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="John Doe"
                required
              />
            </div>

            <div>
              <label className="label">Position</label>
              <input
                type="text"
                className="input input-bordered w-full"
                name="position"
                value={form.position}
                onChange={handleChange}
                placeholder="Developer"
              />
            </div>

            <div>
              <label className="label">Phone</label>
              <input
                type="tel"
                className="input input-bordered w-full"
                name="phone"
                value={form.phone}
                onChange={handleChange}
                placeholder="123-456-7890"
              />
            </div>

            <div>
              <label className="label">Email</label>
              <input
                type="email"
                className="input input-bordered w-full"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="john.doe@example.com"
                required
              />
            </div>

            <div className="md:col-span-2">
              <label className="label">Avatar URL</label>
              <input
                type="url"
                className="input input-bordered w-full"
                name="avatar"
                value={form.avatar}
                onChange={handleChange}
                placeholder="https://..."
              />
            </div>

            <div className="md:col-span-2">
              <label className="label">Description</label>
              <textarea
                className="textarea textarea-bordered w-full"
                name="description"
                value={form.description}
                onChange={handleChange}
                placeholder="Desktop Developer"
                rows={3}
              />
            </div>
          </div>

          <div className="md:col-span-1">
            <label className="label">Preview</label>
            <div className="bg-base-100 border border-base-300 rounded-box p-4">
              <div className="flex items-center gap-3">
                <div className="avatar">
                  <div className="mask mask-squircle h-16 w-16">
                    <img src={form.avatar} alt="avatar preview" />
                  </div>
                </div>
                <div>
                  <div className="font-bold">{form.name || "(no name)"}</div>
                  <div className="text-sm opacity-60">
                    {form.position || "(no position)"}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-4 flex gap-2">
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
          <button type="button" className="btn" onClick={handleReset}>
            Reset
          </button>
        </div>
      </fieldset>
    </form>
  );
};
