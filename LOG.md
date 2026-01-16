# Daily Progress Logger

## Day One (1/10/2026)
- Started by creating the Expo app in VSCode and connected to EAS via id
- Completed Android Studio Setup Wizard and spun up virtual device (Pixel 9)
- Created Firebase project and added iOS + Android apps into project
- Added Google Service config files into app.json and a few RN Firebase modules
- *Began creating development build for iOS, but I need Apple Developer Account to complete TT*
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
- *Will need to check if user account exists to prevent from always starting at GetStarted screen*
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
- *TODO: Do last onboarding pages (buddy's greeting and user information) and pass data between screens*