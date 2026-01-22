# Daily Progress Logger

## Day One (1/10/2026)

- Started by creating the Expo app in VSCode and connected to EAS via id
- Completed Android Studio Setup Wizard and spun up virtual device (Pixel 9)
- Created Firebase project and added iOS + Android apps into project
- Added Google Service config files into app.json and a few RN Firebase modules
- _Began creating development build for iOS, but I need Apple Developer Account to complete TT_
- Successfully created development build for Android
- Updated project directory structure

## Day Two (1/11/2026)

- Started reading through docs
- Added constants to project theme file (APP_BACKGROUND_COLOR, GOLD, BUTTONTEXT)
- Worked on first component (Button) and Onboarding page
- Mostly done, but still need to complete logic and figure out screen routing

## Day Three (1/12/2026)

- Gave onboarding button a visual response (opacity change) when clicked
- Read through what Expo Router does and how it's different from RN's Stack Navigation system
- Implemented routing between screens using enums and then string literal unions
- _Will need to check if user account exists to prevent from always starting at GetStarted screen_
- Moved Onboarding styles to common theme file

## Day Four (1/13/2026)

- Tried figuring out RN's Animated API
- Read up on the importance of type safety
- Got selection boxes to scale up when pressed on
- Added toggling between avatar selections
- Imported and added avatars to selection boxes

## Day Five (1/14/2026)

- Wrestled with using animations input validation in YourNameScreen
- Just ended up generating standard error message
- Remembered that I should also check the web app version works too
- Refactor, refactor, refactor
- _TODO: Do last onboarding pages (buddy's greeting and user information) and pass data between screens_

## Day Six (1/15/2O26)

- Less time to work today
- Added data passing between screens using router params and useLocalSearchParams
- Restructured root directory (src/app) with separate '\_layout.tsx' file for different groups
- _TODO: Begin screen UI for buddy greeting (after use picks buddy) and setting account credentials_

## Day Seven (1/16/2026)

- Another short work day (will be the same for 1/17 - 1/20)
- Set up routing logic from buddy greeting screen to account credentials screen
- Added some basic logic to the two screens
- _TODO: Apply more strict input validation for setting account credentials screen. Also need to import Rive runtime soon for workout buddy_

## Day Eight (1/17/2026)

- Added account sign up page with validation
- _TODO: Integrate Rive animation into buddy greeting page and test that it works_

## Day Nine (1/18/2026)

- Added some Rive code into BuddyGreetingScreen
- _TODO: Shift plan to building as much UI as possible before buying subscription. Build Tab Bar for main app_

## Day Ten (1/19/2026)

- Added Tab Bar to main app
  - Used Ionicons library from @expo/vector-icons
- Running into an issue with Nitro Modules
  - Will likely need to rebuild app with new native module installations
- _TODO: Finalize design for Home tab and get Apple Developer Account to begin iOS testing_

## Day Eleven (1/20/2026)

- Some weird shit was happening today
  - Got an error trying to start the web app ("react-native" package was being imported instead of "react-native-web")
  - Thinking that Nitro Modules affected this
- DateCircle component for Home screen
  - Need props that will tell the current day and days of the current week (Date API)
- _TODO: Try adding dates to each Circle and enroll in ADP before starting new build for iOS & Android_

## Day Twelve (1/21/2026)

- Date circles look pretty good
  - Got dates to display inside each circle w/ day of the week underneath
  - Outlined current day of the week
  - Will eventually need to mark days where workouts were completed
  - Need to wait a week or two to test that days are displayed correctly after a month ends
- Added streak icon to the right of the date circles, as well
  - Counter is stuck at 0
- Added Google Service Files to EAS server development environment variables
- Enrolled in ADP, but...
  - Status is still _pending_
  - Wait 24-48 hours before calling support
    _TODO: Check AD account and create dev build if synced, create workout card component_

## Day Thirteen (1/22/2026)

- Waited 2+ hours for the queue to reach my build
- Installed development and provisional profile onto my iPhone
- **Note to self: Build queueing took forever...Never use EAS again...just learn native languages**:|
-
