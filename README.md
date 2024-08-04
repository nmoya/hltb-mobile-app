# This project is retired! I don't have an Android phone anymore and the updates are very time consuming.
# I recommend using the mobile version of https://howlongtobeat.com in your browser

# HLTB Mobile App

![hltb Version][hltb-image]
![React native Version][react-native-image]

This is a open-source, unofficial, and non-commercial mobile app for [How Long To Beat](https://howlongtobeat.com).

![](src/assets/img/hltb_icon.png)

## Requirements
- node (v13.13.0)
- npm (v6.4.1) or Yarn (v1.22.10)
- react-native (v0.63.4)

Take a look at React native [Getting started](https://facebook.github.io/react-native/docs/getting-started.html) page.

## Installation

Install dependencies using yarn or npm

```sh
yarn install
```
or
```sh
npm install
```

## Start bundling server

Now you can run the packager using yarn or npm

```sh
yarn start
```
or
```sh
npm start
```

Finally, while you keep this packager running, you can run the app on iOS or Android device.

```sh
npx react-native run-ios
npx react-native run-android
```

## Production APK

If the local assets are not appearing in the production APK, try running this:
`npx react-native bundle --platform android --dev false --entry-file index.android.js --bundle-output android/app/src/main/assets/index.android.bundle --assets-dest android/app/src/main/res`

This is how to build and test the signed APK:
`npx react-native run-android --variant=release`

<!-- Markdown link & img dfn's -->
[hltb-image]: https://img.shields.io/badge/hltb-2.0.5-green.svg
[react-native-image]: https://img.shields.io/badge/react_native-0.57.8-blue.svg
