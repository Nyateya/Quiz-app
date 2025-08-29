import React, { useState, useEffect } from "react";


export default function Settings() {
  // Settings state
  const [sound, setSound] = useState(true);
  const [music, setMusic] = useState(true);
  const [fontSize, setFontSize] = useState("base");
  const [profileName, setProfileName] = useState("");
  const [profileEmail, setProfileEmail] = useState("");
  const [profileAvatar, setProfileAvatar] = useState("");

  // Load saved settings
  useEffect(() => {
    const savedSound = localStorage.getItem("sound");
    const savedMusic = localStorage.getItem("music");
    const savedFontSize = localStorage.getItem("fontSize");
    const savedName = localStorage.getItem("profileName");
    const savedEmail = localStorage.getItem("profileEmail");
    const savedAvatar = localStorage.getItem("profileAvatar");

    if (savedSound !== null) setSound(savedSound === "true");
    if (savedMusic !== null) setMusic(savedMusic === "true");
    if (savedFontSize) setFontSize(savedFontSize);
    if (savedName) setProfileName(savedName);
    if (savedEmail) setProfileEmail(savedEmail);
    if (savedAvatar) setProfileAvatar(savedAvatar);
  }, []);

  const saveSettings = () => {
    localStorage.setItem("sound", sound);
    localStorage.setItem("music", music);
    localStorage.setItem("fontSize", fontSize);
    localStorage.setItem("profileName", profileName);
    localStorage.setItem("profileEmail", profileEmail);
    localStorage.setItem("profileAvatar", profileAvatar);
    alert("Settings saved!");
  };

  return (
    <div className="settings p-6 max-w-2xl mx-auto space-y-6">
      <h1 className="text-3xl font-bold mb-4">Settings</h1>

      {/* Sound & Music */}
      <div className="appearance-settings border p-4 rounded shadow space-y-4">
        <h2 className="text-xl font-semibold mb-2">Appearance & Audio</h2>
        <div className="flex items-center justify-between">
          <label>Sound Effects</label>
          <input
            type="checkbox"
            checked={sound}
            onChange={() => setSound(!sound)}
          />
        </div>
        <div className="flex items-center justify-between">
          <label>Background Music</label>
          <input
            type="checkbox"
            checked={music}
            onChange={() => setMusic(!music)}
          />
        </div>
        <div>
          <label className="block mb-1">Font Size</label>
          <select
            value={fontSize}
            onChange={(e) => setFontSize(e.target.value)}
            className="border p-2 rounded w-full"
          >
            <option value="sm">Small</option>
            <option value="base">Base</option>
            <option value="lg">Large</option>
            <option value="xl">Extra Large</option>
          </select>
        </div>
      </div>

      {/* Profile */}
      <div className="profile-settings border p-4 rounded shadow space-y-4">
        <h2 className="text-xl font-semibold mb-2">Profile</h2>
        <div>
          <label className="block mb-1">Name</label>
          <input
            type="text"
            value={profileName}
            onChange={(e) => setProfileName(e.target.value)}
            placeholder="Enter your name"
            className="border p-2 rounded w-full"
          />
        </div>
        <div>
          <label className="block mb-1">Email</label>
          <input
            type="email"
            value={profileEmail}
            onChange={(e) => setProfileEmail(e.target.value)}
            placeholder="Enter your email"
            className="border p-2 rounded w-full"
          />
        </div>
        <div>
          <label className="block mb-1">Avatar URL</label>
          <input
            type="text"
            value={profileAvatar}
            onChange={(e) => setProfileAvatar(e.target.value)}
            placeholder="Enter avatar image URL"
            className="border p-2 rounded w-full"
          />
        </div>
        {profileAvatar && (
          <div className="mt-2">
            <p className="text-sm mb-1">Preview:</p>
            <img
              src={profileAvatar}
              alt="avatar"
              className="w-24 h-24 rounded-full object-cover"
            />
          </div>
        )}
      </div>

      <button
        onClick={saveSettings}
        className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600"
      >
        Save Settings
      </button>
    </div>
  );
}
