import { useState } from "react";

interface ProfileData {
  name: string;
  email: string;
  phone: string;
  address: string;
  dob: string; // Date of Birth
}

export default function Profile() {
  const [profile, setProfile] = useState<ProfileData>({
    name: "JAMAC HASSAN",
    email: "jamac12@gmail.com",
    phone: "123-456-7890",
    address: "taman melawati, kuala lumpur",
    dob: "1992-01-01",
  });

  const [isEditing, setIsEditing] = useState(false);
  const [updatedProfile, setUpdatedProfile] = useState(profile);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUpdatedProfile((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    setProfile(updatedProfile);
    setIsEditing(false);
  };

  return (
    <div className="bg-white p-6 shadow-md rounded-lg max-w-xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Profile</h2>

      {!isEditing ? (
        <div>
          <div className="mb-4">
            <p className="font-medium">Name:</p>
            <p className="text-gray-600">{profile.name}</p>
          </div>
          <div className="mb-4">
            <p className="font-medium">Email:</p>
            <p className="text-gray-600">{profile.email}</p>
          </div>
          <div className="mb-4">
            <p className="font-medium">Phone:</p>
            <p className="text-gray-600">{profile.phone}</p>
          </div>
          <div className="mb-4">
            <p className="font-medium">Address:</p>
            <p className="text-gray-600">{profile.address}</p>
          </div>
          <div className="mb-4">
            <p className="font-medium">Date of Birth:</p>
            <p className="text-gray-600">{profile.dob}</p>
          </div>
          <button
            onClick={() => setIsEditing(true)}
            className="bg-blue-600 text-white px-4 py-2 rounded">
            Edit Profile
          </button>
        </div>
      ) : (
        <form onSubmit={(e) => e.preventDefault()} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Name</label>
            <input
              type="text"
              name="name"
              value={updatedProfile.name}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border rounded"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Email</label>
            <input
              type="email"
              name="email"
              value={updatedProfile.email}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border rounded"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Phone</label>
            <input
              type="tel"
              name="phone"
              value={updatedProfile.phone}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border rounded"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Address</label>
            <input
              type="text"
              name="address"
              value={updatedProfile.address}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border rounded"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">
              Date of Birth
            </label>
            <input
              type="date"
              name="dob"
              value={updatedProfile.dob}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border rounded"
            />
          </div>
          <div className="flex justify-end space-x-2">
            <button
              type="button"
              onClick={() => setIsEditing(false)}
              className="bg-gray-400 text-white px-4 py-2 rounded">
              Cancel
            </button>
            <button
              type="button"
              onClick={handleSave}
              className="bg-blue-600 text-white px-4 py-2 rounded">
              Save
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
