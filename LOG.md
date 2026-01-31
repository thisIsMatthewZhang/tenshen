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
- _TODO: Check AD account and create dev build if synced, create workout card component_

## Day Thirteen (1/22/2026)

- Waited 2+ hours for the queue to reach my build
- Installed development and provisional profile onto my iPhone
- **Note to self: Build queueing took forever...Never use EAS again...just learn native languages**(joke...mostly:|)
- Bruh...
  - I uploaded Google Service files as literal strings and _not_ the actual files🤡🤡🤡
  - This is so annoying...but learned a lot
- Had an issue with EAS Build being unable to find Google Services files
  - Solved by creating an _app.config.ts_ that effectively replaced _app.json_
  - Gave EAS Build access to GOOGLE_SERVICES_PLIST and GOOGLE_SERVICES_JSON env variables this way
- Another BIG issue with RN Firebase and XCode's header modules
  - Had to remove Firebase from my app completely
  - Issue comes from RN Firebase's iOS native code conflicting with the way EAS + Expo build iOS apps
  - Will see if _Firebase JS SDK_ works better
- _TODO: (1) Create new build for Android, (2) flesh out UI in Figma, (3) work on workout card components_

## Day Fourteen (1/23/2026)

- Installed new build for Android with Rive included
  - Should now be allowed to import native C++ (.riv) runtimes
- Started working on layout for showing user's completed workouts
  - Decided to focus on this (instead of cards) since I have a clearer vision for it
- Learned the use of SafeAreaProvider and SafeAreaView
- _TODO: (1) Finish out the display for completed workouts, (2) figure out how I'm gonna get a workout dataset_

## Day Fifteen (1/24/2026)

- _Mostly_ got workout history UI
  - Weird issue with listing exercises in a FlatList
  - Everything is being aligned to the center
  - Might just need to skip for now
  - NVM LOLLL...literally fixed the problem by removing 'flex: 1' from everything
- Workout partner dilemma
  - Too many exercises to animate in a reasonable amount of time
  - At most 10 common exercises (push-ups, squats, sit-ups, etc.) sounds feasible for MVP
- _TODO: (1) Consider animating 5-10 exercises in Rive for MVP, (2) Figure how to limit exercises shown to 3, (3) Begin working on Workout screen_

## Day Sixteen (1/25/2026)

- Fixed part of the date logic on Home
  - Still need to account for midnight edge case if user leaves app open over night
- Worked a lot on WorkoutScreen UI
  - Following Hevy's layout
  - Moved WorkoutSlide to this screen
  - ExtraOptions component now reacts to presses
- Should have pre-made programs (which is a collection of workouts/routines that you can stick to each week) and single workouts/routines
- _TODO: (1) Build out layout for Profile screen and settings_

## Day Seventeen (1/26/2026)

- Did the layout for Profile screen
- Created new dev build with react-native-gifted-charts and react-native-svg
- _TODO: (1) Test charts and calendar, (2) clean up code, (3) start thinking about backend steps_

## Day Eighteen (1/27/2026)

- Important change needed in ChooseWorkoutBuddy screen
  - Use the actual Rive sprites instead of annoying images
  - Currently has a bug when pressing and releasing too fast on the container
  - State machines should help with visual misalignments
- Added and fixed UI throughout app
- Possible alternatives to Analytics (since Firebase JS SDK does not support it)
  - Posthog
  - Aptabase
  - Amplitude
- _TODO: (1) Design and build out workout creation screen, (2) improve more code and UI (ExtraOptions!)_

## Day Nineteen (1/28/2026)

- Changed input fields by removing borders except the bottom border
  - Looks better this way imho
  - Also highlights them with blue when focused
- Got basic structure down for WorkoutBuilder modal
  - Just need to do ExerciseCard layout
- Looking forward to hooking everything up with a backend soon😁
- _TODO: (1) Make the layout for ExerciseCard, (2) replace with an empty state if no exercise has been added yet, (3) go into Rive and separate artboards for Ruby and Rudy_

## Day Twenty (1/29/2026)

- Layout is posing a bit of a challenge
  - Had to fix top buttons and name input to the top to prevent it from being affected by the UI changes
  - Got the rest timer down, luckily
  - Adding sets to an exercise card is becoming a problem - currently causes entire card to change in height and it looks jarring
  - Gemini suggested giving a max height and enabling scrolling if number of set segments exceed the height (might be what I have to do if I can't find another solution)
- Got the empty state to show up when no exercise cards are present (using GIANT RUDY HEAD)
- Separated Rudy and Ruby into separate files
  - Rudy's animation won't transfer to Ruby, so need to figure out how to fix that :|
- Internet went down so couldn't make more progress (Xfinity get it together plz)
- _TODO: (1) Test segment adding functionality and fix if needed (probably will be), (2) make sure segment editing is possible (i.e. deleting), (3) allow removing ExerciseCard_

## Day Twenty-One (1/30/2026)

- Fixed the container flow inside WorkoutBuilder
  - Did this via a combination of applying 'flexGrow: 1' to the ScrollView and making each container (header, cards, footer button) siblings of ScrollView
  - Also a simpler-looking document structure
- Tested the button for adding sets to an exercise and it looks good
- Struggled with RN gestures
  - Probably something to read over tomorrow before implementing 'swipe to delete'
- Fixed YourName and SetAccountCredentials to shift fields up when keyboard is shown
- _TODO: (1) Learn gesture handling, (2) implement 'swipe to delete'_
