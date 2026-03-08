# Robot Lions Schedule - Google Sheets Integration Setup Guide

This guide will walk you through setting up the Google Sheets integration for the Robot Lions schedule.

## Overview

The schedule is now powered by Google Sheets, making it easy to update events without touching code. Team members can edit the schedule directly in Google Sheets, and changes will appear on the website within 5 minutes.

## Prerequisites

- A Google account
- Access to the Robot Lions website repository
- Basic familiarity with Google Sheets

## Part 1: Create the Google Spreadsheet

### Step 1: Create a New Spreadsheet

1. Go to [Google Sheets](https://sheets.google.com)
2. Click the **+ Blank** button to create a new spreadsheet
3. Name it **"Robot Lions Schedule"**

### Step 2: Set Up the Structure

You need to create **two sheets** within this spreadsheet:

#### Sheet 1: "Upcoming Events"

1. Rename "Sheet1" to **"Upcoming Events"**
   - Right-click the sheet tab at the bottom
   - Select "Rename"
   - Type "Upcoming Events"

2. Add the following headers in **Row 1**:
   ```
   A1: Date
   B1: Title
   C1: Location
   D1: Time
   E1: Agenda
   F1: Notes
   ```

3. Format the header row (optional but recommended):
   - Select row 1
   - Make it bold
   - Add a background color (light blue works well)

#### Sheet 2: "Past Events"

1. Click the **+** button at the bottom left to add a new sheet
2. Name it **"Past Events"**
3. Add the same headers as above:
   ```
   A1: Date
   B1: Title
   C1: Location
   D1: Time
   E1: Agenda
   F1: Notes
   ```

### Step 3: Add Your Events

Now migrate your existing events from the website to the spreadsheet.

**Example Upcoming Event:**
```
Row 2:
A2: Mar 1
B2: Team Meeting
C2: Rohen's house
D2: 2:45 PM - 5:00 PM
E2: Continue practicing with the robot
F2: (leave empty or add internal notes)
```

**Example Past Event:**
```
Row 2:
A2: Feb 22
B2: Team Meeting
C2: Rohen's house
D2: 2:45 PM - 5:00 PM
E2: Continue practice with the robot
F2: Great practice session!
```

**Important Notes:**
- **Date Format**: Use "MMM DD" format (e.g., "Mar 1", "Feb 22")
- **Title**: Event name (e.g., "Team Meeting", "Competition")
- **Location**: Full location name
- **Time**: Time range (e.g., "2:45 PM - 5:00 PM") or "All Day"
- **Agenda**: Optional - what will happen at the meeting
- **Notes**: Optional - internal notes (not displayed on website)
- **DO NOT** add ✅ checkmarks to past events - the website adds these automatically

### Step 4: Make the Spreadsheet Public (Read-Only)

1. Click the **Share** button (top right)
2. Click **"Change to anyone with the link"**
3. Make sure it's set to **"Viewer"** (not Editor)
4. Click **"Copy link"** - save this for later
5. Click **"Done"**

⚠️ **Important**: Make sure it's set to "Viewer" so people can read but not edit!

### Step 5: Get Your Spreadsheet ID

From the URL you copied, extract the Spreadsheet ID:

```
https://docs.google.com/spreadsheets/d/1ABC123_example_ID_456/edit
                                      ^^^^^^^^^^^^^^^^^^^
                                      This is your Spreadsheet ID
```

**Save this ID** - you'll need it in Part 3.

---

## Part 2: Set Up Google Sheets API

### Step 1: Go to Google Cloud Console

1. Visit [Google Cloud Console](https://console.cloud.google.com)
2. Sign in with your Google account

### Step 2: Create a New Project

1. Click the project dropdown at the top (next to "Google Cloud")
2. Click **"NEW PROJECT"**
3. Name it: **"Robot Lions Website"**
4. Click **"CREATE"**
5. Wait for the project to be created (may take a few seconds)
6. Make sure the new project is selected in the dropdown

### Step 3: Enable Google Sheets API

1. In the left sidebar, go to **"APIs & Services"** → **"Library"**
2. In the search bar, type: **"Google Sheets API"**
3. Click on **"Google Sheets API"** from the results
4. Click the blue **"ENABLE"** button
5. Wait for it to enable (may take a few seconds)

### Step 4: Create API Credentials

1. Go to **"APIs & Services"** → **"Credentials"** (in the left sidebar)
2. Click **"+ CREATE CREDENTIALS"** at the top
3. Select **"API key"**
4. A popup will appear with your API key - **copy this key immediately**
5. Click **"RESTRICT KEY"** (recommended for security)

### Step 5: Restrict the API Key (Recommended)

1. Under "API restrictions":
   - Select **"Restrict key"**
   - Check only **"Google Sheets API"**
2. Under "Application restrictions" (optional but more secure):
   - Select **"HTTP referrers (web sites)"**
   - Click **"ADD AN ITEM"**
   - Add: `https://rohenplaza.github.io/robot-lions-website/*`
   - Click **"DONE"**
3. Click **"SAVE"** at the bottom

**Save your API key** - you'll need it in Part 3.

---

## Part 3: Configure the Website

### Step 1: Create Your Config File

1. Navigate to your website's `js/` folder
2. Copy the example config file:
   ```bash
   cd /Users/rohenp/robot-lions-website/js/
   cp config.example.js config.js
   ```

### Step 2: Add Your Credentials

1. Open `js/config.js` in a text editor
2. Replace the placeholder values:

```javascript
const SCHEDULE_CONFIG = {
    // Replace with your API key from Part 2, Step 4
    apiKey: '',

    // Replace with your Spreadsheet ID from Part 1, Step 5
    spreadsheetId: '',

    // These should match your sheet names (default values shown)
    upcomingRange: 'Upcoming Events!A2:E',
    pastRange: 'Past Events!A2:E',

    // Cache settings (you can keep these as-is)
    cacheEnabled: true,
    cacheDuration: 300000 // 5 minutes
};
```

3. **Save the file**

### Step 3: Test Locally

1. Start a local web server:
   ```bash
   cd /Users/rohenp/robot-lions-website
   python3 -m http.server 3001
   ```

2. Open your browser to: `http://localhost:3001`

3. Click on the **Schedule** tab

4. You should see:
   - A loading spinner (briefly)
   - Your events loading from Google Sheets
   - Past events with ✅ checkmarks

5. **Check the browser console** (F12 or Right-click → Inspect → Console):
   - Look for: `"Loading schedule from Google Sheets..."`
   - Look for: `"Loaded X upcoming events and Y past events"`
   - If you see errors, double-check your API key and Spreadsheet ID

### Step 4: Verify It's Working

✅ **Success Checklist:**
- [ ] Schedule tab displays without errors
- [ ] Upcoming events section shows your events
- [ ] Past events section shows past events with ✅
- [ ] No errors in browser console
- [ ] Events match what's in your Google Sheet

❌ **Troubleshooting:**

| Error | Solution |
|-------|----------|
| "Schedule config not found" | Make sure `config.js` exists and is loaded before `schedule-manager.js` |
| "API request failed: 403" | Check your API key is correct and restrictions allow your domain |
| "API request failed: 404" | Check your Spreadsheet ID is correct |
| "Unable to load schedule" | Check your internet connection and that the sheet is public |
| Events don't load | Open browser console (F12) to see detailed error messages |

---

## Part 4: Deploy to GitHub Pages

### Step 1: Commit Changes (Excluding config.js)

The `.gitignore` file is already set up to exclude `config.js`, so it won't be committed.

```bash
cd /Users/rohenp/robot-lions-website

# Check what will be committed
git status

# You should see:
# - Modified files (index.html, styles.css, script.js)
# - New files (schedule-manager.js, config.example.js, .gitignore, SETUP.md)
# - config.js should NOT appear (it's gitignored)

# Add all files
git add .

# Commit
git commit -m "Add Google Sheets integration for schedule

- Create ScheduleManager class for dynamic schedule loading
- Add API configuration system with example template
- Update HTML/CSS for loading states and error handling
- Maintain existing UI/UX and animations
- Add comprehensive setup documentation

🤖 Generated with Claude Code
Co-Authored-By: Claude Sonnet 4.5 <noreply@anthropic.com>
Co-Authored-By: Rohen <rohen.p@gmail.com>"
```

### Step 2: Add config.js to Production

Since `config.js` is gitignored, you need to manually add it to GitHub Pages:

**Option A: Use GitHub Web Interface**
1. Go to your repository on GitHub
2. Navigate to `js/` folder
3. Click **"Add file"** → **"Create new file"**
4. Name it `config.js`
5. Paste your config with real API key and Spreadsheet ID
6. Commit directly to `main` branch

**Option B: Use a Separate Branch**
1. Create a `production-config` branch
2. Add `config.js` there
3. Configure GitHub Pages to deploy from that branch

### Step 3: Push to GitHub

```bash
git push origin main
```

### Step 4: Verify Live Site

1. Wait 1-2 minutes for GitHub Pages to rebuild
2. Visit your live site: `https://rohenplaza.github.io/robot-lions-website/`
3. Click the **Schedule** tab
4. Verify events load correctly
5. Check browser console for errors

---

## Usage Guide: Updating the Schedule

### For Team Members (Non-Technical)

**To Add a New Event:**

1. Open the [Robot Lions Schedule](YOUR_SPREADSHEET_URL_HERE) spreadsheet
2. Go to the **"Upcoming Events"** sheet
3. Add a new row with:
   - **Date**: e.g., "Mar 15"
   - **Title**: e.g., "Team Meeting"
   - **Location**: e.g., "Rohen's house"
   - **Time**: e.g., "2:45 PM - 5:00 PM"
   - **Agenda**: e.g., "Practice autonomous mode"
4. Save (it auto-saves)
5. Changes appear on website within 5 minutes

**To Move an Event to Past:**

1. Open the spreadsheet
2. **Right-click** the row number
3. Select **"Cut"**
4. Go to **"Past Events"** sheet
5. Right-click row 2 (first data row)
6. Select **"Insert 1 row above"**
7. Click cell A2
8. Right-click and select **"Paste"**
9. The website will automatically add the ✅ checkmark

**To Edit an Event:**

1. Open the spreadsheet
2. Find the event row
3. Click the cell you want to edit
4. Make your changes
5. Changes appear on website within 5 minutes

### For Developers

**Cache Duration:**

The default cache is 5 minutes (`cacheDuration: 300000` milliseconds). To change:

1. Edit `js/config.js`
2. Change `cacheDuration` value:
   - 1 minute: `60000`
   - 10 minutes: `600000`
   - No cache: `cacheEnabled: false`

**API Rate Limits:**

- Google Sheets API: **300 requests per minute per user**
- With 5-minute caching: ~1 request per visitor per session
- Expected usage: Well within limits for team website

**Debugging:**

Enable verbose console logging:
1. Open `js/schedule-manager.js`
2. All `console.log()` statements are already in place
3. Check browser console (F12) for detailed info

---

## Security Notes

⚠️ **Important Security Information:**

1. **API Key Visibility**: Your API key will be visible in the browser's source code. This is acceptable because:
   - The API key is restricted to Google Sheets API only
   - The spreadsheet is read-only to the public
   - No sensitive data is exposed
   - Editing is restricted to team members who have direct sheet access

2. **Recommended Restrictions**:
   - ✅ Restrict API key to Google Sheets API
   - ✅ Add HTTP referrer restriction (your domain)
   - ✅ Keep spreadsheet as "Viewer" access for public
   - ✅ Only give "Editor" access to trusted team members

3. **DO NOT**:
   - ❌ Commit `config.js` to Git (it's gitignored)
   - ❌ Share your API key publicly (except in deployed site)
   - ❌ Make spreadsheet "Public on the web" (use "Anyone with link")
   - ❌ Give public "Editor" access to spreadsheet

---

## Maintenance

### Rotating API Keys

If your API key is compromised:

1. Go to [Google Cloud Console](https://console.cloud.google.com)
2. Navigate to **"APIs & Services"** → **"Credentials"**
3. Find your API key
4. Click **"Delete"** (trash icon)
5. Create a new API key (Part 2, Step 4)
6. Update `js/config.js` with new key
7. Redeploy to production

### Spreadsheet Backup

Recommended: Create periodic backups of your spreadsheet

1. Open your spreadsheet
2. **File** → **Make a copy**
3. Name it: "Robot Lions Schedule - Backup [DATE]"
4. Store in Google Drive

### Monitoring

Check these periodically:

- [ ] API quota usage in Google Cloud Console
- [ ] Browser console for errors on live site
- [ ] Spreadsheet sharing settings haven't changed
- [ ] All events are displaying correctly

---

## Troubleshooting

### Events Not Loading

**Check:**
1. Is spreadsheet public (Anyone with link can view)?
2. Is API key correct in `config.js`?
3. Is Spreadsheet ID correct?
4. Are sheet names exactly "Upcoming Events" and "Past Events"?
5. Check browser console for error messages

### API Quota Exceeded

**Solution:**
- Increase `cacheDuration` in config
- Wait for quota to reset (per minute)
- Contact Google Cloud support for quota increase

### Events Display Wrong

**Check:**
- Column order matches: Date | Title | Location | Time | Agenda
- Data starts in row 2 (row 1 is headers)
- Date format is "MMM DD" (e.g., "Mar 1", not "3/1" or "March 1")

---

## Support

**For Technical Issues:**
- Check browser console (F12) for error messages
- Review this setup guide
- Check [Google Sheets API documentation](https://developers.google.com/sheets/api)

**For Team Questions:**
- Contact Rohen (team lead)
- Email: rohen.p@gmail.com

---

## Appendix: Complete Event Data Migration

Here's how to migrate all your current events to Google Sheets:

### Upcoming Events
```
Date    | Title                  | Location                          | Time              | Agenda
Jan 25  | Competition - CANCELED | Herbert J. Saunders Middle School | All Day           |
Mar 1   | Team Meeting           | Rohen's house                     | 2:45 PM - 5:00 PM | Continue practicing with the robot
```

### Past Events
```
Date    | Title                      | Location                      | Time              | Agenda
Feb 22  | Team Meeting               | Rohen's house                 | 2:45 PM - 5:00 PM | Continue practice with the robot
Feb 14  | Competition                | Woodbridge Senior High School | All Day           |
Feb 8   | Team Meeting               | Rohen's house                 | 2:45 PM - 5:00 PM | Practice using the robot
Feb 1   | Team Meeting               | Rohen's house                 | 2:45 PM - 5:00 PM | Continue tweaking the robot
Jan 19  | Team Meeting               | Rohen's house                 | 2:45 PM - 5:00 PM | Continue tweaking the robot
Jan 13  | Team Meeting               | Rohen's house                 | 6:00 PM - 8:00 PM | Keep tweaking the robot
Jan 11  | Team Meeting               | Rohen's house                 | 2:45 PM - 5:00 PM | Finish the robot and start tuning the robot
Jan 4   | Team Meeting               | Rohen's house                 | 2:45 PM - 5:00 PM | Finish the robot and start practicing
Dec 14  | Team Meeting               | Rohen's House                 | 2:45 PM - 5:00 PM | Continue building the robot
Dec 7   | Team Meeting               | Rohen's House                 | 2:45 PM - 5:00 PM | Find a new design for the robot
Nov 22  | First Competition          | Nysmith School                | All Day           |
Nov 16  | Team Meeting               | Rohen's House                 | 2:45 PM - 5:00 PM | Practicing for competition
Nov 11  | Team Meeting               | Rohen's House                 | 4:30 PM - 6:30 PM | Practice for the Competition
Oct 26  | Team Meeting               | Rohen's House                 | 2:45 PM - 5:00 PM | Make the bot better
Oct 19  | Team Meeting               | Rohen's House                 | 2:45 PM - 5:00 PM | Continue to improve robot
Oct 12  | Team Meeting               | Rohen House                   | 2:45 PM - 5:00 PM | Fix problems
Oct 5   | Team Meeting               | Rohen House                   | 2:45 PM - 5:00 PM | Practice driving the robot and modifying the robot
Sep 29  | Team Meeting               | Rohen House                   | 2:45 PM - 5:00 PM | Practice using the herobot
Sep 21  | Team Meeting               | Rohen House                   | 2:45 PM - 5:00 PM | Continue building the herobot and have a quick lesson on gear ratio
Sep 14  | Team Meeting               | Rohen House                   | 2:45 PM - 5:00 PM | Continue building the herobot. Please note the first 15 minutes will be for playing
Sep 7   | Team Kickoff Meeting       | Rohen House                   | 3:00 PM - 5:00 PM | Introduce the competition and start the herobot
```

Copy and paste these into your Google Sheet, then customize as needed!

---

**Setup Complete!** 🎉

Your Robot Lions schedule is now powered by Google Sheets. Team members can update events easily, and changes appear automatically on the website.
