# Local SQLite - University of Oklahoma

A mobile application built with React Native and Expo that demonstrates local data storage using SQLite. The app allows users to create, read, update, and delete (CRUD) user entries with persistent storage.

## Features

- **Create**: Add new users with name and email
- **Read**: Display all stored users in a list
- **Update**: Edit existing user information
- **Delete**: Remove users from the database
- **Persistent Storage**: Data is saved locally using SQLite
- **University of Oklahoma Branding**: Styled with Crimson (#841617) and Cream (#EEE6D9) colors

## Tech Stack

- **Framework**: React Native with Expo
- **Navigation**: Expo Router
- **Database**: expo-sqlite (SQLite)
- **Language**: TypeScript
- **UI**: React Native components with custom styling

## Project Structure

```
local_sqlite/
├── app/
│   ├── _layout.tsx           # Root layout with SQLite provider setup
│   ├── modal.tsx             # Modal screen for adding/editing users
│   └── (tabs)/
│       ├── _layout.tsx       # Tab navigation layout
│       ├── index.tsx         # Home screen - displays user list
│       └── settings.tsx      # Settings screen (placeholder)
├── components/               # Reusable components
├── constants/                # App constants (colors, etc.)
├── assets/                   # Images, fonts, etc.
├── package.json
├── tsconfig.json
└── app.json                  # Expo configuration
```

## Key Implementation Details

### Root Layout (`app/_layout.tsx`)
- Sets up the SQLite database provider
- Creates the `users` table on app initialization
- Schema: `users (id, name, email)`

### Modal Screen (`app/modal.tsx`)
- Used for both creating new users and editing existing ones
- Determines mode based on URL parameters (`?id=<userId>`)
- Features:
  - Name and email input fields
  - Cancel and Save/Update buttons
  - Auto-loads user data when editing
  - Crimson-themed UI with cream background

### Home Screen (`app/(tabs)/index.tsx`)
- Displays all users in a scrollable list
- Shows user name and email
- Action buttons for each user:
  - **Edit**: Opens modal to update user information
  - **Delete**: Removes user from database
- Plus icon in header to add new users
- Auto-refreshes when modal is closed

### Tab Navigation (`app/(tabs)/_layout.tsx`)
- Home tab: User list management
- Settings tab: Placeholder for future settings
- Active tab icons are styled in Crimson color
- Cream background for consistent theming

## Color Scheme

**University of Oklahoma Colors:**
- **Crimson**: `#841617` - Primary accent color for buttons and icons
- **Cream**: `#EEE6D9` - Primary background color

## Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn
- Expo CLI

### Installation

```bash
# Install dependencies
npm install

# or
yarn install
```

### Running the App

```bash
# Start the development server
npx expo start

# Run on iOS simulator
npx expo run:ios

# Run on Android emulator
npx expo run:android

# Or use Expo Go app on your device
# Scan the QR code in the terminal
```

## Database Schema

```sql
CREATE TABLE IF NOT EXISTS users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  email TEXT NOT NULL UNIQUE
)
```

## Usage

1. **Add a User**: Tap the plus icon (+) in the header
   - Enter name and email
   - Tap "Save"

2. **Edit a User**: Tap the "Edit" button next to a user
   - Modify the information
   - Tap "Update"

3. **Delete a User**: Tap the "Delete" button next to a user
   - User is removed from the database immediately

## UI/UX Features

- **Responsive Design**: Works on various screen sizes
- **Color-Coded Actions**:
  - Edit button: Crimson background
  - Delete button: Cream background with Crimson outline and text
- **Intuitive Navigation**: Modal-based entry creation/editing
- **Real-time Updates**: List refreshes automatically after changes

## Development

### Available Scripts

```bash
# Format code
npm run format

# Type check
npm run type-check

# Start development server
npm start
```

## Future Enhancements

- Search and filter functionality
- Sort users by name or email
- Export/Import user data
- User profile pictures
- Multiple database tables for related data
- Cloud sync capabilities

## License

This project is part of the University of Oklahoma Mobile Development course.

## Support

For issues or questions, please contact the course instructor or refer to the Expo documentation at https://docs.expo.dev
