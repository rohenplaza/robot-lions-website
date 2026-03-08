# Quick Import Guide - Robot Lions Schedule & Journal

I've exported your current schedule and journal into CSV files that you can directly import into Google Sheets!

## Files Created

**Schedule:**
- **`upcoming_events.csv`** - Contains 2 upcoming events
- **`past_events.csv`** - Contains 21 past events

**Journal:**
- **`journal_entries.csv`** - Contains 19 journal entries

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

### Step 4: Import Journal Entries

1. Click the **+** button at the bottom to create another new sheet

2. Rename this new sheet to **"Journal Entries"**

3. Go to **File** → **Import**

4. Click the **Upload** tab

5. Click **Browse** and select **`journal_entries.csv`** from:
   ```
   /Users/rohenp/robot-lions-website/journal_entries.csv
   ```

6. In the import dialog:
   - **Import location**: Select "Replace current sheet"
   - **Separator type**: Comma
   - **Convert text to numbers, dates, and formulas**: Yes (checked)

7. Click **Import data**

### Step 5: Verify the Data

**Check that:**
- ✅ "Upcoming Events" sheet has 2 events (Jan 25, Mar 1)
- ✅ "Past Events" sheet has 21 events (Feb 22 back to Sep 7)
- ✅ "Journal Entries" sheet has 19 entries (Aug 31, 2024 to Feb 22, 2026)
- ✅ All columns are present in each sheet
- ✅ Data looks correct (no weird formatting)

### Step 7: Make It Public

1. Click the **Share** button (top right)
2. Change to **"Anyone with the link"**
3. Set permission to **"Viewer"** (read-only)
4. Click **Copy link** and save it
5. Click **Done**

### Step 8: Get Your Spreadsheet ID

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
/Users/rohenp/robot-lions-website/journal_entries.csv
```

You can also open them in Excel, Numbers, or any spreadsheet program if you want to review before importing.

## Spreadsheet Structure Summary

After importing all three files, your Google Sheet should have **3 sheets**:

1. **"Upcoming Events"** - Columns: Date | Title | Location | Time | Agenda | Notes
2. **"Past Events"** - Columns: Date | Title | Location | Time | Agenda | Notes
3. **"Journal Entries"** - Columns: Date | Title | Content | Image URL

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

## Adding New Journal Entries

To add new journal entries to your Google Sheet:

1. Open the **"Journal Entries"** sheet
2. Add a new row at the **top** (insert row above row 2)
3. Fill in:
   - **Date**: e.g., "March 8, 2026"
   - **Title**: e.g., "Competition Preparation"
   - **Content**: Your journal entry text
   - **Image URL**: (optional) Path to image like `images/photo.jpg` or leave blank
4. Save and wait 5 minutes for the website to update

**Note:** Journal entries are displayed in **reverse chronological order** (newest first) on the website automatically.

---

That's it! Your schedule and journal data are now in Google Sheets and ready to use with the website. 🎉
