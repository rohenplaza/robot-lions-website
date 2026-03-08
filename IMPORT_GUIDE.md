# Quick Import Guide - Robot Lions Schedule

I've exported your current schedule into two CSV files that you can directly import into Google Sheets!

## Files Created

- **`upcoming_events.csv`** - Contains 2 upcoming events
- **`past_events.csv`** - Contains 21 past events

## How to Import into Google Sheets

### Step 1: Create Your Spreadsheet

1. Go to [Google Sheets](https://sheets.google.com)
2. Click **+ Blank** to create a new spreadsheet
3. Name it **"Robot Lions Schedule"**

### Step 2: Import Upcoming Events

1. In your new spreadsheet, rename "Sheet1" to **"Upcoming Events"**
   - Right-click the sheet tab → Rename → "Upcoming Events"

2. Go to **File** → **Import**

3. Click the **Upload** tab

4. Click **Browse** and select **`upcoming_events.csv`** from:
   ```
   /Users/rohenp/robot-lions-website/upcoming_events.csv
   ```

5. In the import dialog:
   - **Import location**: Select "Replace current sheet"
   - **Separator type**: Comma
   - **Convert text to numbers, dates, and formulas**: Yes (checked)

6. Click **Import data**

### Step 3: Import Past Events

1. Click the **+** button at the bottom to create a new sheet

2. Rename this new sheet to **"Past Events"**

3. Go to **File** → **Import**

4. Click the **Upload** tab

5. Click **Browse** and select **`past_events.csv`** from:
   ```
   /Users/rohenp/robot-lions-website/past_events.csv
   ```

6. In the import dialog:
   - **Import location**: Select "Replace current sheet"
   - **Separator type**: Comma
   - **Convert text to numbers, dates, and formulas**: Yes (checked)

7. Click **Import data**

### Step 4: Verify the Data

**Check that:**
- ✅ "Upcoming Events" sheet has 2 events (Jan 25, Mar 1)
- ✅ "Past Events" sheet has 21 events (Feb 22 back to Sep 7)
- ✅ All columns are present: Date, Title, Location, Time, Agenda, Notes
- ✅ Data looks correct (no weird formatting)

### Step 5: Make It Public

1. Click the **Share** button (top right)
2. Change to **"Anyone with the link"**
3. Set permission to **"Viewer"** (read-only)
4. Click **Copy link** and save it
5. Click **Done**

### Step 6: Get Your Spreadsheet ID

From the URL, copy the Spreadsheet ID:

```
https://docs.google.com/spreadsheets/d/COPY_THIS_PART_HERE/edit
```

You'll need this for your `config.js` file!

---

## What's Next?

After importing, continue with the **SETUP.md** guide:
- Part 2: Set Up Google Sheets API
- Part 3: Configure the Website

---

## File Locations

Your CSV files are in:
```
/Users/rohenp/robot-lions-website/upcoming_events.csv
/Users/rohenp/robot-lions-website/past_events.csv
```

You can also open them in Excel, Numbers, or any spreadsheet program if you want to review before importing.

---

## Optional: Format Your Spreadsheet

Once imported, you can make it look nicer:

1. **Format Header Row:**
   - Select row 1 in both sheets
   - Make it **bold**
   - Add a **background color** (light blue looks good)
   - Maybe **freeze** it: View → Freeze → 1 row

2. **Adjust Column Widths:**
   - Double-click the column dividers to auto-fit
   - Or manually drag to preferred width

3. **Add Borders** (optional):
   - Select all data
   - Click border icon in toolbar
   - Choose "All borders"

---

That's it! Your schedule data is now in Google Sheets and ready to use with the website. 🎉
