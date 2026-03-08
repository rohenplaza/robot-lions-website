/**
 * JournalManager - Handles dynamic journal loading from Google Sheets API
 *
 * This class fetches journal entry data from a Google Spreadsheet and renders it
 * dynamically on the page, replacing the static HTML journal entries.
 *
 * Features:
 * - Fetches data from Google Sheets API v4
 * - Caches data in sessionStorage for performance
 * - Handles loading states and errors gracefully
 * - Maintains existing CSS styling and animations
 * - Supports optional images for journal entries
 * - Displays entries in reverse chronological order (newest first)
 */

class JournalManager {
    /**
     * Initialize the Journal Manager
     * @param {Object} config - Configuration object with API credentials
     */
    constructor(config) {
        this.apiKey = config.apiKey;
        this.spreadsheetId = config.spreadsheetId;
        this.journalRange = config.journalRange || 'Journal Entries!A2:D';
        this.cacheEnabled = config.cacheEnabled !== false;
        this.cacheDuration = config.cacheDuration || 300000; // 5 minutes default

        this.container = document.querySelector('#journal .journal-container');
        this.journalEntries = [];

        if (!this.container) {
            console.error('Journal container not found');
            return;
        }

        this.init();
    }

    /**
     * Initialize the journal by loading data
     */
    async init() {
        this.showLoadingState();

        try {
            // Try to load from cache first
            if (this.cacheEnabled && this.loadFromCache()) {
                console.log('Loading journal from cache');
                this.renderJournal();
                return;
            }

            // Fetch fresh data from API
            await this.fetchJournalData();
            this.renderJournal();
        } catch (error) {
            console.error('Error loading journal:', error);
            this.handleError(error);
        }
    }

    /**
     * Display loading spinner while fetching data
     */
    showLoadingState() {
        this.container.innerHTML = `
            <div class="schedule-loading">
                <div class="spinner"></div>
                <p>Loading journal entries...</p>
            </div>
        `;
    }

    /**
     * Fetch journal data from Google Sheets API
     */
    async fetchJournalData() {
        const baseUrl = 'https://sheets.googleapis.com/v4/spreadsheets';
        const url = `${baseUrl}/${this.spreadsheetId}/values/${encodeURIComponent(this.journalRange)}?key=${this.apiKey}`;

        console.log('Fetching journal from Google Sheets...');

        const response = await fetch(url);

        if (!response.ok) {
            throw new Error(`API request failed: ${response.status} ${response.statusText}`);
        }

        const data = await response.json();

        // Parse the response data
        this.journalEntries = this.parseEntries(data.values || []);

        console.log(`Loaded ${this.journalEntries.length} journal entries`);

        // Cache the data
        if (this.cacheEnabled) {
            this.cacheData();
        }
    }

    /**
     * Parse raw spreadsheet data into journal entry objects
     * @param {Array} rows - Array of row arrays from Google Sheets
     * @returns {Array} Array of journal entry objects
     */
    parseEntries(rows) {
        return rows
            .filter(row => row.length >= 3) // Must have at least date, title, content
            .map(row => ({
                date: this.sanitize(row[0] || ''),
                title: this.sanitize(row[1] || 'Untitled Entry'),
                content: this.sanitize(row[2] || ''),
                imageUrl: this.sanitize(row[3] || '') // Optional image URL
            }))
            .filter(entry => entry.date && entry.title && entry.content) // Must have all required fields
            .reverse(); // Reverse to show newest first
    }

    /**
     * Sanitize user input to prevent XSS
     * @param {string} str - Input string
     * @returns {string} Sanitized string
     */
    sanitize(str) {
        const div = document.createElement('div');
        div.textContent = str;
        return div.innerHTML;
    }

    /**
     * Render the complete journal on the page
     */
    renderJournal() {
        if (this.journalEntries.length === 0) {
            this.container.innerHTML = '<p class="no-events">No journal entries yet.</p>';
            return;
        }

        // Generate HTML for all journal entries
        const journalHTML = this.journalEntries
            .map(entry => this.formatEntryHTML(entry))
            .join('');

        this.container.innerHTML = journalHTML;

        // Trigger animations for the newly added entries
        this.applyAnimations();
    }

    /**
     * Format a single journal entry as HTML
     * @param {Object} entry - Journal entry object with date, title, content, imageUrl
     * @returns {string} HTML string for the entry
     */
    formatEntryHTML(entry) {
        const hasImage = entry.imageUrl && entry.imageUrl.trim() !== '';
        const imageHTML = hasImage
            ? `<img src="${entry.imageUrl}" alt="${entry.title}" class="journal-image">`
            : '';

        return `
            <article class="journal-entry">
                <header class="entry-header">
                    <h3>${entry.title}</h3>
                    <time>${entry.date}</time>
                </header>
                <div class="entry-content">
                    ${imageHTML}
                    <p>${entry.content}</p>
                </div>
            </article>
        `;
    }

    /**
     * Apply scroll animations to journal entry elements
     */
    applyAnimations() {
        // Use Intersection Observer to animate entries on scroll
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-in');
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });

        // Observe all journal entry elements
        document.querySelectorAll('.journal-entry').forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(30px)';
            el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            observer.observe(el);
        });
    }

    /**
     * Handle errors by displaying user-friendly message
     * @param {Error} error - The error that occurred
     */
    handleError(error) {
        let message = 'Error loading journal. Please try again later.';

        if (error.message.includes('Failed to fetch') || error.message.includes('NetworkError')) {
            message = 'Unable to load journal. Please check your internet connection.';
        } else if (error.message.includes('403') || error.message.includes('Forbidden')) {
            message = 'Journal temporarily unavailable. Please check API permissions.';
        } else if (error.message.includes('404') || error.message.includes('Not Found')) {
            message = 'Journal not found. Please check the spreadsheet configuration.';
        }

        // Try to load from cache as fallback
        if (this.cacheEnabled && this.loadFromCache()) {
            this.showWarning('Showing cached journal entries (may be outdated)');
            this.renderJournal();
            return;
        }

        // Show error message if no cache available
        this.showError(message);
    }

    /**
     * Display error message to user
     * @param {string} message - Error message to display
     */
    showError(message) {
        const errorHTML = `
            <div class="schedule-error">
                <h3>⚠️ Journal Unavailable</h3>
                <p>${message}</p>
                <p>For the latest journal updates, please contact the Robot Lions team.</p>
            </div>
        `;
        this.container.innerHTML = errorHTML;
    }

    /**
     * Display warning banner above journal
     * @param {string} message - Warning message to display
     */
    showWarning(message) {
        const warningHTML = `
            <div class="schedule-warning">
                <p>⚠️ ${message}</p>
            </div>
        `;
        this.container.insertAdjacentHTML('afterbegin', warningHTML);
    }

    /**
     * Cache journal data in sessionStorage
     */
    cacheData() {
        const cacheObject = {
            journalEntries: this.journalEntries,
            timestamp: Date.now()
        };

        try {
            sessionStorage.setItem('robotLionsJournalCache', JSON.stringify(cacheObject));
            console.log('Journal data cached successfully');
        } catch (e) {
            console.warn('Failed to cache journal data:', e);
        }
    }

    /**
     * Load journal data from sessionStorage cache
     * @returns {boolean} True if cache was loaded successfully
     */
    loadFromCache() {
        try {
            const cached = sessionStorage.getItem('robotLionsJournalCache');
            if (!cached) return false;

            const cacheObject = JSON.parse(cached);
            const age = Date.now() - cacheObject.timestamp;

            // Check if cache is expired
            if (age > this.cacheDuration) {
                console.log('Cache expired, removing...');
                sessionStorage.removeItem('robotLionsJournalCache');
                return false;
            }

            // Load data from cache
            this.journalEntries = cacheObject.journalEntries;

            console.log(`Cache is ${Math.round(age / 1000)}s old (max ${this.cacheDuration / 1000}s)`);
            return true;
        } catch (e) {
            console.warn('Failed to load cache:', e);
            return false;
        }
    }
}
