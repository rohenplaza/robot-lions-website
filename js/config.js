/**
 * Google Sheets API Configuration
 *
 * SETUP INSTRUCTIONS:
 * 1. Copy this file to config.js: cp config.example.js config.js
 * 2. Replace the placeholder values below with your actual Google Sheets API credentials
 * 3. Never commit config.js to version control (it's in .gitignore)
 *
 * HOW TO GET YOUR CREDENTIALS:
 *
 * API Key:
 * 1. Go to Google Cloud Console (console.cloud.google.com)
 * 2. Create a new project (e.g., "Robot Lions Website")
 * 3. Enable the Google Sheets API
 * 4. Go to "Credentials" and create an API key
 * 5. (Recommended) Restrict the key to "Google Sheets API" only
 * 6. Copy the API key below
 *
 * Spreadsheet ID:
 * 1. Open your Google Sheet
 * 2. The URL will look like: https://docs.google.com/spreadsheets/d/SPREADSHEET_ID/edit
 * 3. Copy the SPREADSHEET_ID part (long string of letters/numbers)
 * 4. Paste it below
 *
 * Sharing Settings:
 * - Make sure your Google Sheet is set to "Anyone with the link can view"
 * - Do NOT use "Public on the web" unless necessary
 * - Keep edit access restricted to your team only
 */

const SCHEDULE_CONFIG = {
    // Your Google Sheets API key
    apiKey: 'AIzaSyBVK_uXY9NWf8H8SK_mq-eP4ceHLJ23sEM',

    // Your spreadsheet ID (from the URL)
    spreadsheetId: '1wJUpVLdqDfeUheN2frFhH2Y8lJeyioPePf-jaTfvmII',

    // Range for upcoming events (Sheet name + cell range)
    // A2:E means columns A through E, starting from row 2 (row 1 is headers)
    upcomingRange: 'Upcoming Events!A2:E',

    // Range for past events
    pastRange: 'Past Events!A2:E',

    // Enable caching to reduce API calls
    cacheEnabled: true,

    // Cache duration in milliseconds (300000 = 5 minutes)
    cacheDuration: 300000
};
